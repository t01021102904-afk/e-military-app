import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!stripeSecretKey || !webhookSecret || !supabaseUrl || !supabaseServiceKey) {
      console.error("[v0] Missing required environment variables")
      return NextResponse.json({ error: "Configuration error" }, { status: 500 })
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2024-11-20.acacia",
    })

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const body = await req.text()
    const headersList = await headers()
    const signature = headersList.get("stripe-signature")

    if (!signature) {
      return NextResponse.json({ error: "No signature" }, { status: 400 })
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err: any) {
      console.error("[v0] Webhook signature verification failed:", err.message)
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
    }

    // Handle successful payment
    if (event.type === "checkout.session.completed" || event.type === "payment_intent.succeeded") {
      const session = event.data.object as Stripe.Checkout.Session | Stripe.PaymentIntent

      let paymentId: string
      let amount: number
      let currency: string
      let customerEmail: string | null = null

      if (event.type === "checkout.session.completed") {
        const checkoutSession = session as Stripe.Checkout.Session
        paymentId = checkoutSession.payment_intent as string
        amount = checkoutSession.amount_total! / 100 // Convert from cents
        currency = checkoutSession.currency!
        customerEmail = checkoutSession.customer_email || checkoutSession.customer_details?.email || null
      } else {
        const paymentIntent = session as Stripe.PaymentIntent
        paymentId = paymentIntent.id
        amount = paymentIntent.amount / 100 // Convert from cents
        currency = paymentIntent.currency
        customerEmail = paymentIntent.receipt_email || null
      }

      console.log("[v0] Processing donation:", { paymentId, amount, currency, customerEmail })

      // Insert donation into database
      const { error } = await supabase.from("donations").insert({
        stripe_payment_id: paymentId,
        amount: amount,
        currency: currency,
        donor_email: customerEmail,
      })

      if (error) {
        console.error("[v0] Error inserting donation:", error)
        // Don't return error to Stripe - we don't want to retry if it's a duplicate
        if (error.code === "23505") {
          // Unique constraint violation (duplicate payment)
          console.log("[v0] Duplicate payment, ignoring:", paymentId)
          return NextResponse.json({ received: true })
        }
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      console.log("[v0] Donation recorded successfully:", paymentId)
    }

    return NextResponse.json({ received: true })
  } catch (err: any) {
    console.error("[v0] Webhook error:", err.message)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }
}
