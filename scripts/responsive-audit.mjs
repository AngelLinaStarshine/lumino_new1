/**
 * Builds are expected ready; starts vite preview, checks each route × viewport
 * for horizontal overflow (scrollWidth > clientWidth).
 */
import { spawn } from 'node:child_process';
import http from 'node:http';
import path from 'node:path';
import { chromium } from 'playwright';

const PORT = 4173;
const HOST = '127.0.0.1';
const BASE = `http://${HOST}:${PORT}`;

const ROUTES = [
  '/',
  '/our-story',
  '/learning-paths',
  '/tuition',
  '/luminopro',
  '/book',
  '/enroll',
];

const VIEWPORTS = [
  { name: 'iPhone SE', width: 320, height: 568 },
  { name: 'iPhone 12', width: 390, height: 844 },
  { name: 'Pixel 7', width: 412, height: 915 },
  { name: 'iPhone 14 Pro Max', width: 430, height: 932 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'laptop', width: 1280, height: 800 },
  { name: 'desktop', width: 1920, height: 1080 },
];

function waitForPreview(maxMs = 120000) {
  const deadline = Date.now() + maxMs;
  return new Promise((resolve, reject) => {
    const tryOnce = () => {
      const req = http.get(`${BASE}/`, { timeout: 3000 }, (res) => {
        res.resume();
        resolve();
      });
      req.on('error', () => {
        if (Date.now() > deadline) reject(new Error('Preview server did not become ready in time'));
        else setTimeout(tryOnce, 400);
      });
      req.on('timeout', () => {
        req.destroy();
        if (Date.now() > deadline) reject(new Error('Preview server did not become ready in time'));
        else setTimeout(tryOnce, 400);
      });
    };
    tryOnce();
  });
}

function startPreview() {
  const viteCli = path.join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js');
  return spawn(process.execPath, [viteCli, 'preview', '--port', String(PORT), '--host', HOST], {
    cwd: process.cwd(),
    stdio: 'ignore',
    env: { ...process.env },
  });
}

async function main() {
  const preview = startPreview();
  try {
    await waitForPreview();
    const browser = await chromium.launch();
    const failures = [];

    for (const vp of VIEWPORTS) {
      const context = await browser.newContext({ viewport: vp });
      const page = await context.newPage();
      for (const route of ROUTES) {
        const url = `${BASE}${route}`;
        try {
          await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
          await new Promise((r) => setTimeout(r, 400));
          const { scrollWidth, clientWidth, overflow } = await page.evaluate(() => {
            const doc = document.documentElement;
            const body = document.body;
            const sw = Math.max(doc.scrollWidth, body?.scrollWidth ?? 0);
            const cw = doc.clientWidth;
            return { scrollWidth: sw, clientWidth: cw, overflow: sw > cw + 1 };
          });
          if (overflow) {
            failures.push({
              viewport: vp.name,
              width: vp.width,
              route,
              scrollWidth,
              clientWidth,
            });
          }
        } catch (e) {
          failures.push({
            viewport: vp.name,
            route,
            error: String(e.message || e),
          });
        }
      }
      await context.close();
    }
    await browser.close();

    if (failures.length) {
      console.error('Responsive audit failures:\n', JSON.stringify(failures, null, 2));
      process.exitCode = 1;
      return;
    }
    console.log(
      `OK: ${ROUTES.length} routes × ${VIEWPORTS.length} viewports — no horizontal overflow detected.`
    );
  } finally {
    try {
      preview.kill('SIGTERM');
    } catch {
      /* ignore */
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
