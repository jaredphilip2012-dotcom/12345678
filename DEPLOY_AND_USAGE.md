# Quorzyx.com: Public Deployment + Usage Guide

## 1) Use the website

1. Open the home page.
2. Fill in your name, tip title, market focus, experience level, and tip text.
3. Check the required legal checkbox.
4. Click **Post Tip**.
5. Read legal terms at `legal-disclaimer.html`.
6. Read community standards at `guidelines.html`.

Note: This version stores posts in each visitor's browser (`localStorage`). It does **not** share posts across different users/devices yet.

## 2) Deploy publicly (GitHub Pages)

### Create GitHub repo and push

Run these commands from terminal:

```bash
cd /Users/jaredcohen/Documents/investing-community-site
git init
git add .
git commit -m "Initial Quorzyx.com site"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO>.git
git push -u origin main
```

### Turn on GitHub Pages

1. Open your repository on GitHub.
2. Go to **Settings** -> **Pages**.
3. Under **Build and deployment**, choose:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
4. Save.

Your public URL will look like:

`https://<YOUR_USERNAME>.github.io/<YOUR_REPO>/`

### Use custom domain: `www.quorzyx.com`

1. Keep the `CNAME` file in the repo root with:
   - `www.quorzyx.com`
2. In GitHub repo **Settings** -> **Pages** -> **Custom domain**, enter:
   - `www.quorzyx.com`
3. In your domain DNS provider, create:
   - `CNAME` record for host `www` pointing to `<YOUR_USERNAME>.github.io`
4. Optional redirect for root domain (`quorzyx.com` -> `www.quorzyx.com`):
   - Add `A` records for `@` to:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Or set URL forwarding at your registrar to `https://www.quorzyx.com`
5. Wait for DNS propagation (can take from minutes up to 24-48 hours), then verify the certificate is issued in GitHub Pages.

## 3) Post-launch checklist

1. Verify `index.html`, `legal-disclaimer.html`, and `guidelines.html` all load publicly.
2. Add your support email/contact in the footer.
3. Have a licensed attorney review your disclaimer for your jurisdiction.
4. Add moderation and reporting before promoting widely.

## 4) Optional next upgrade

To make posts shared across all users, add a backend (Supabase/Firebase/Postgres + API) and replace browser-only storage.
