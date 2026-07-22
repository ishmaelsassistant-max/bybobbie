# By Bobbie — Setup & Handover

Everything here is for **Bobbie** to finish once, after which the site runs itself.
Nothing technical is required day-to-day.

---

## 1. Turn on online booking (Cal.com — free)

The site already has a booking section. Until you connect Cal.com it shows a
styled "email an enquiry" card, so the site works right now. To switch on the
live calendar:

1. Go to **https://cal.com** and create a **free** account.
   - Pick a username you're happy with, e.g. `bybobbie`. Your booking link
     becomes `cal.com/bybobbie`.
2. Connect your calendar (Google / Apple / Outlook) so Cal.com only offers times
   you're actually free.
3. Create one **Event Type** per service below. For each: set the **title**,
   the **duration**, and (optional) a price note. Turn on **"Requires
   confirmation"** if you want to approve each booking yourself.

   | Service | Suggested duration | Price |
   |---|---|---|
   | Classic — Full Set | 2 hr | £110 |
   | Hybrid — Full Set | 2 hr 15 min | £125 |
   | Volume — Full Set | 2 hr 30 min | £135 |
   | Half Set Classic | 1 hr 15 min | £80 |
   | Classic Infill | 1 hr 15 min | £65 |
   | Hybrid Infill | 1 hr 30 min | £75 |
   | Volume Infill | 1 hr 45 min | £90 |
   | Bottom Lashes (add-on) | 45 min | £45 |
   | Removal — My Work | 30 min | £15 |
   | Removal — Others | 45 min | £20 |

   (Durations are a starting point — adjust to how you actually work.)

4. Tell your developer your Cal.com username, **or** edit one line yourself in
   [`src/config/site.ts`](src/config/site.ts):

   ```ts
   calUsername: "bybobbie",   // was ""
   ```

   Save, and the booking section automatically swaps the enquiry card for your
   live calendar. Redeploy (see below) to publish the change.

> Tip: Add a "patch test required for new clients" note in each event type's
> description — the site mentions it, and Cal.com can collect it at booking.

---

## 2. Your details

Edit [`src/config/site.ts`](src/config/site.ts) to set:

- `email` — the address enquiries should go to (currently `hello@bybobbie.co.uk`).
- `instagram` — your full profile URL, e.g. `https://instagram.com/bybobbie.lashes`.
  Leave it `""` to hide the Instagram links.
- `serviceArea` — e.g. `"Mobile across Manchester & surrounding areas"`.

Prices and services also live in that one file — change a number there and it
updates everywhere on the site.

---

## 3. Swap in your own photos & video (optional but recommended)

The gallery and the two videos currently use tasteful licensed stock so the site
looks finished. To use your own work:

- **Gallery:** replace the six files in `public/gallery/` (`g1.jpg` … `g6.jpg`).
  Keep them portrait (roughly 3:4) for the nicest layout.
- **Hero video:** replace `public/video/hero.mp4` with your own clip (landscape,
  muted, ~10 seconds loops best). Keep it under ~3 MB for fast loading.
- **About video:** replace `public/video/about.mp4` (portrait/phone footage).
- **Poster:** `public/video/poster.jpg` is the still shown before the hero video
  loads — export a frame of your hero clip.

Keep the same file names and everything just works.

---

## 4. Publish the site (one-time, ~3 minutes)

The complete site is on GitHub:
**https://github.com/ishmaelsassistant-max/bybobbie**

To put it live on Vercel (free):

1. Go to **https://vercel.com** and sign in (you can sign in with GitHub).
2. Click **Add New… → Project**.
3. Under **Import Git Repository**, pick **`bybobbie`**. (If it's not listed,
   click *Adjust GitHub App Permissions* and grant Vercel access to the repo.)
4. Leave every setting at its default — Vercel auto-detects Next.js — and click
   **Deploy**.
5. After ~1 minute you'll get a live `…vercel.app` URL. That's your site.

The videos and photos are included in the repo, so they appear automatically —
nothing else to upload.

> Note: publishing had to stop here because the automated deploy didn't have
> permission to create a Vercel project on your account — importing it yourself
> once (above) is the fix, and it also gives you **auto-deploy**: any future edit
> pushed to GitHub redeploys the site on its own.

---

## 5. Connecting your domain (bybobbie.co.uk)

In the **Vercel dashboard → your project → Settings → Domains**, add both
`bybobbie.co.uk` and `www.bybobbie.co.uk`. Vercel will show you the exact records
to add — they'll be one of these at your domain registrar (where you bought
bybobbie.co.uk):

| Type | Name / Host | Value |
|---|---|---|
| `A` | `@` (root) | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

DNS changes can take anywhere from a few minutes to a few hours to go live.
Vercel adds the free HTTPS (padlock) certificate automatically once the records
resolve.

> Verify the exact values against what the Vercel dashboard shows for your
> project — Vercel occasionally updates its IPs, and its panel is always the
> source of truth.
