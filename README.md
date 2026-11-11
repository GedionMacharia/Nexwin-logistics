# Nexwin Logistics website

A Next.js website starter for Nexwin Logistics with a premium navy / gold design, service pages, quote-request form, private file uploads, Supabase database, administrator dashboard, CSV export, WhatsApp link and optional Resend email notifications.

## Important before launch

This project is a working application foundation, not a deployed live website. You must connect your own Supabase project, configure business contact details, create an administrator account and deploy it. Email delivery requires Resend credentials. M-PESA Daraja credentials and a verified payment workflow are not included as a live checkout; the environment file contains placeholders only. Never advertise payments as active until the provider integration has been implemented and tested.

## 1. Requirements

- Node.js 20 or newer
- A Supabase account
- A hosting account such as Vercel
- Optional: Resend account for email notifications

## 2. Install and run

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## 3. Configure Supabase

1. Create a new Supabase project.
2. Open SQL Editor.
3. Run the complete `supabase/schema.sql` file.
4. Open Project Settings > API and copy the project URL and anon key.
5. Copy the service role key into `.env.local` as `SUPABASE_SERVICE_ROLE_KEY`.
6. Keep the service role key secret. It must never use a `NEXT_PUBLIC_` prefix.
7. In Authentication > Users, create the administrator user using the email you will place in `ADMIN_EMAIL`.
8. Set a strong unique password and enable multi-factor authentication if available.

The quote form stores inquiries through the server API. The `inquiry-files` bucket is private. The admin API checks the Supabase access token and requires the authenticated email to match `ADMIN_EMAIL`.

## 4. Configure business details

Update `.env.local`:

```env
ADMIN_EMAIL=your-real-admin-email@example.com
NEXT_PUBLIC_WHATSAPP_NUMBER=2547XXXXXXXX
NEXT_PUBLIC_BUSINESS_EMAIL=your-business-email@example.com
NEXT_PUBLIC_BUSINESS_PHONE=+254 7XX XXX XXX
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

Use your real business details. Replace the placeholder domain and WhatsApp number before launch.

## 5. Email notifications (optional)

1. Create a Resend account and verify a domain you control.
2. Create an API key.
3. Set `RESEND_API_KEY`, `NOTIFICATION_FROM_EMAIL` and `BUSINESS_NOTIFICATION_EMAIL`.
4. Deploy and test a real inquiry.

Without Resend credentials, inquiry submission still works and is saved in Supabase, but notification email is skipped.

## 6. Deploy

1. Push this project to a private GitHub repository.
2. Import the repository into Vercel.
3. Add all required environment variables in Vercel Project Settings.
4. Deploy.
5. Set `NEXT_PUBLIC_SITE_URL` to the production domain and redeploy.
6. Test quote submission, uploaded files, admin login, status updates, signed file links and CSV export.

## 7. M-PESA

M-PESA is not activated in this starter. A production Daraja STK Push integration needs an approved Safaricom Daraja app, callback URL over HTTPS, server-side credential handling, request signing/password generation, callback validation, transaction persistence and reconciliation. Do not collect or store customer M-PESA PINs. Do not mark an inquiry paid based only on a browser response. Implement payment only after you have your approved credentials and callback environment.

## 8. Before public launch checklist

- Replace every placeholder email, phone number and WhatsApp number.
- Review the privacy policy and terms with a qualified adviser for applicable Kenyan law and your actual operating practices.
- Add genuine testimonials only with permission. Do not publish invented reviews or performance statistics.
- Configure spam protection (for example, Cloudflare Turnstile) and server-side rate limiting before public advertising.
- Test file size/type restrictions and the private storage bucket.
- Use a strong admin password and enable MFA.
- Confirm that only the authorized admin email can access the dashboard.
- Add a verified domain and HTTPS.
- Set up backups and monitor the Supabase project.
- Add your business logo and real brand imagery if available.

## Pages

- `/` Home
- `/services` Services
- `/about` About
- `/quote` Quote request
- `/contact` Contact
- `/privacy` Privacy policy
- `/terms` Terms
- `/admin` Admin dashboard

## Academic integrity

Academic services are described as tutoring, research guidance, editing, proofreading, formatting and feedback. The business should not complete graded work for a student to submit as their own.
