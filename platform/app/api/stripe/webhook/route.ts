import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const admin = createAdminClient();

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const paymentId = session.metadata?.payment_id;
      if (paymentId) {
        await admin
          .from('payments')
          .update({
            status: 'paid',
            paid_at: new Date().toISOString(),
            stripe_payment_id: session.payment_intent as string,
            invoice_url: session.invoice?.toString() ?? session.url,
          })
          .eq('id', paymentId);
      }
      break;
    }

    case 'payment_intent.succeeded': {
      const intent = event.data.object as Stripe.PaymentIntent;
      const paymentId = intent.metadata?.payment_id;
      if (paymentId) {
        await admin
          .from('payments')
          .update({
            status: 'paid',
            paid_at: new Date().toISOString(),
            stripe_payment_id: intent.id,
          })
          .eq('id', paymentId);
      }
      break;
    }

    case 'payment_intent.payment_failed': {
      const intent = event.data.object as Stripe.PaymentIntent;
      const paymentId = intent.metadata?.payment_id;
      if (paymentId) {
        await admin.from('payments').update({ status: 'failed' }).eq('id', paymentId);
      }
      break;
    }

    case 'charge.refunded': {
      const charge = event.data.object as Stripe.Charge;
      if (charge.payment_intent) {
        await admin
          .from('payments')
          .update({ status: 'refunded' })
          .eq('stripe_payment_id', charge.payment_intent as string);
      }
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
