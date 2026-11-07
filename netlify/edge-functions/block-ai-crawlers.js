// Netlify redirect rules cannot match on User-Agent, so AI training crawlers are refused here.
// Keep this list in sync with the training-crawler block in public/robots.txt.
const BLOCKED_AGENTS = [
  'gptbot',
  'claudebot',
  'anthropic-ai',
  'google-extended',
  'applebot-extended',
  'ccbot',
  'bytespider',
  'meta-externalagent',
  'amazonbot',
  'cohere-ai',
  'diffbot',
  'omgilibot',
];

export default async (request, context) => {
  const { pathname } = new URL(request.url);
  if (pathname === '/robots.txt' || pathname === '/.well-known/tdmrep.json') {
    return context.next();
  }

  const userAgent = (request.headers.get('user-agent') || '').toLowerCase();
  if (BLOCKED_AGENTS.some((agent) => userAgent.includes(agent))) {
    return new Response('Forbidden', {
      status: 403,
      headers: { 'content-type': 'text/plain; charset=utf-8', 'tdm-reservation': '1' },
    });
  }

  return context.next();
};
