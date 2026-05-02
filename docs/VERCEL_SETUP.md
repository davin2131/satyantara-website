# Deploy ke Vercel + Webhook Sanity

Panduan setup hosting permanen untuk situs + auto-rebuild saat edit konten di Sanity Studio.

## 1. Setup Vercel (sekali)

1. Buka https://vercel.com/signup → **Continue with GitHub** → login pakai akun `davin2131`.
2. Di dashboard Vercel → **Add New → Project** → pilih repo `satyantara-website` → **Import**.
3. Di halaman **Configure Project**:
   - **Framework Preset**: biarkan default (Next.js otomatis terdeteksi).
   - **Build Command**: sudah diset otomatis lewat `vercel.json` — jangan override.
   - **Environment Variables**: klik **Add**, tambahkan 3 variabel:
     | Name | Value |
     |---|---|
     | `NEXT_PUBLIC_SANITY_PROJECT_ID` | `4tij5rov` |
     | `NEXT_PUBLIC_SANITY_DATASET` | `production` |
     | `SANITY_API_TOKEN` | *(paste token Editor dari Sanity dashboard)* |
4. Klik **Deploy**. Build ~2 menit.
5. Setelah hijau, URL situs live muncul (mis. `https://satyantara-website.vercel.app`).

## 2. Setup Deploy Hook (sekali)

Deploy Hook adalah URL khusus Vercel yang, kalau di-hit, memicu rebuild.

1. Di Vercel project → **Settings → Git → Deploy Hooks**.
2. Klik **Create Hook**:
   - Hook Name: `Sanity publish`
   - Branch: `main` (atau `devin/1777651157-add-sanity-cms` selama belum merge)
3. Copy URL hook yang muncul (bentuknya `https://api.vercel.com/v1/integrations/deploy/...`). Simpan sebentar.

## 3. Setup Sanity Webhook (sekali)

1. Buka https://www.sanity.io/manage → project Satyantara → **API → Webhooks → Create webhook**.
2. Isi:
   - **Name**: `Vercel auto deploy`
   - **URL**: paste URL Deploy Hook dari step 2
   - **Dataset**: `production`
   - **Trigger on**: centang `Create`, `Update`, `Delete`
   - **Filter**: kosongkan (rebuild untuk semua perubahan)
   - **HTTP method**: `POST`
   - **HTTP headers**: kosongkan
3. **Save**.

## 4. Selesai — Cara edit konten rutin

1. Buka Studio (local: `npm run sanity:dev` di PowerShell, atau host Sanity cloud nanti).
2. Edit field/konten, klik **Publish**.
3. Sanity otomatis trigger webhook → Vercel rebuild → ~1 menit situs live ter-update.

## Catatan

- **Branch default**: Vercel deploy dari branch yang ter-set di Project Settings → Git. Setelah PR #2 merge ke main, update branch di deploy hook ke `main`.
- **Token yang dipaste di Vercel**: JANGAN yang dipaste di chat — buat baru khusus untuk Vercel, role Editor.
- **Custom domain**: Vercel → Settings → Domains. Bisa add domain seperti `satyantara.com` kalau sudah punya.
