# HF-6: Initial Vercel Deployment

Ship the Walking Skeleton to production and confirm the live URL can talk to MongoDB Atlas.

---

## Steps

### 1 — Push & Open a PR

```bash
git push origin HF-2-Walking-Skeleton-Core-Infrastructure-Base-Architecture
```

Open a PR on GitHub → `main`. Title: `feat: Walking Skeleton (HF-2)`.

---

### 2 — Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the `HabitFlow` GitHub repository.
3. Framework preset: **Next.js** (auto-detected).
4. Leave build & output settings as defaults.

---

### 3 — Add Environment Variables

In the Vercel project → **Settings → Environment Variables**, add:

| Key | Value | Environments |
|-----|-------|-------------|
| `MONGODB_URI` | Your Atlas connection string | Production, Preview, Development |

> [!IMPORTANT]
> Ensure the Atlas cluster **Network Access** list includes `0.0.0.0/0` (allow all IPs) for Vercel's dynamic IP pool, or use a Vercel-specific IP allowlist.

---

### 4 — Deploy & Verify

- Trigger a deploy (automatic on PR merge, or manual via Vercel dashboard).
- Open the live URL → page loads with **"HabitFlow — DB Proof"**.
- Click **+ Test DB** → task appears in the list.
- Check Vercel **Function Logs** → `✅ MongoDB connected` present, no errors.

---

## Verification Plan

| Check | Expected |
|-------|----------|
| Live URL loads | Page renders without 500 error |
| `+ Test DB` button | New task appears after click |
| Vercel Function Logs | `✅ MongoDB connected` on first cold start |
| Atlas dashboard | `habitflow.tasks` collection has documents |
