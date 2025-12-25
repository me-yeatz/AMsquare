# 🎁 AMsquare Project Tracker - Deployment Guide

## For the AMsquare Interior Design Team

This guide will help you deploy your custom project management application to your own hosting platform.

---

## 🚀 Quick Deployment Options

### Option 1: Deploy to Vercel (Recommended - Easiest)

**Step 1: Create Vercel Account**
1. Go to https://vercel.com
2. Sign up with your company email
3. Choose "Hobby" plan (Free forever)

**Step 2: Deploy the App**
1. Click "Add New..." → "Project"
2. Import from Git (or upload this folder)
3. Vercel auto-detects Vite
4. Click "Deploy"
5. Done! Your app will be live at: `amsquare-tracker.vercel.app`

**Optional: Add Custom Domain**
- Buy domain: `amsquare-tracker.com`
- Add to Vercel settings
- Professional branded URL!

---

### Option 2: Deploy to Cloudflare Workers

**Already configured in this project!**

**Step 1: Install Wrangler CLI**
```bash
npm install -g wrangler
```

**Step 2: Login to Cloudflare**
```bash
wrangler login
```

**Step 3: Deploy**
```bash
npm run check  # Test first
wrangler deploy  # Deploy to production
```

Your app will be live at: `amsquare-tracker.workers.dev`

---

### Option 3: Self-Host on Your Own Server

If you have your own hosting server:

**Build the app:**
```bash
npm install
npm run build
```

**Deploy:**
- Upload the `dist` folder to your web server
- Configure your web server to serve the files
- Point your domain to the server

---

## 🔐 Security Recommendations

Before going live with real data:

1. **Change Demo Credentials** - Update passwords in `src/react-app/components/Login.tsx`
2. **Add Real Authentication** - Integrate with your auth system
3. **Add Database** - Replace mock data with real database
4. **Enable HTTPS** - Ensure secure connections (Vercel/Cloudflare do this automatically)
5. **Backup System** - Set up regular data backups

---

## 📝 Post-Deployment Checklist

- [ ] Test login with all user roles
- [ ] Verify all features work correctly
- [ ] Test on mobile devices (iOS & Android)
- [ ] Install as PWA on devices
- [ ] Share URL with team members
- [ ] Train team on how to use

---

## 💝 About This Gift

This application was custom-built specifically for AMsquare Interior Design by your friend, with attention to detail and genuine care for your workflow needs.

**Developer:** M. Nor Hidayat (me.yeatz)
**Built with:** React 19, TypeScript, Vite, Tailwind CSS
**Purpose:** To support your growth and streamline your creative workflow

---

## 🆘 Need Help?

If you need assistance with deployment or customization:
- Contact: mhyeatz@outlook.com
- GitHub: github.com/me-yeatz

**May this tool elevate your business to new heights!** 🏛️

---

*"Where Vision Meets Precision"*
