# Stripe Webhook Setup Instructions

This guide will help you set up Stripe webhooks to automatically track donations.

## 1. Get Your Webhook Secret

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Enter your webhook URL:
   - **Development**: `https://your-vercel-preview-url.vercel.app/api/webhooks/stripe`
   - **Production**: `https://your-domain.com/api/webhooks/stripe`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
5. Click "Add endpoint"
6. Copy the **Signing secret** (starts with `whsec_...`)

## 2. Add Environment Variable

Add the webhook secret to your Vercel project:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add a new variable:
   - **Name**: `STRIPE_WEBHOOK_SECRET`
   - **Value**: `whsec_...` (paste your signing secret)
   - **Environment**: Production, Preview, Development (select all)
3. Click "Save"
4. Redeploy your application

## 3. Add Service Role Key

The webhook needs Supabase service role key to bypass RLS:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/yxlxytidyvrxifgqlwtx/settings/api)
2. Copy the **service_role** key (not the anon key!)
3. Add to Vercel environment variables:
   - **Name**: `SUPABASE_SERVICE_ROLE_KEY`
   - **Value**: Your service role key
   - **Environment**: Production, Preview, Development

## 4. Test the Webhook

1. Make a test donation using your Stripe payment link
2. Check Stripe Dashboard → Webhooks → Your endpoint
3. You should see successful webhook deliveries
4. Check your database:
   \`\`\`sql
   SELECT * FROM donations ORDER BY created_at DESC LIMIT 10;
   \`\`\`
5. Verify the total appears on your website's Impact section

## 5. Troubleshooting

**Webhook failing?**
- Check Stripe Dashboard → Webhooks → View logs
- Verify `STRIPE_WEBHOOK_SECRET` is correct
- Ensure `SUPABASE_SERVICE_ROLE_KEY` is set
- Check your app logs in Vercel

**Duplicate donations?**
- The webhook automatically handles duplicates by checking `stripe_payment_id`

**Amount not showing?**
- Clear your browser cache
- Check that donations table has data: `SELECT SUM(amount) FROM donations;`
