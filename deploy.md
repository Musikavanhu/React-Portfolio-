# Deployment Guide

## Quick Deploy Options

### 1. Vercel (Recommended - Free)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Deploy automatically!

### 2. Netlify (Free)
1. Build: `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the `out` folder
4. Your site is live!

### 3. GitHub Pages (Free)
1. Add to `package.json` scripts:
   ```json
   "export": "next export",
   "deploy": "npm run build && npm run export"
   ```
2. Run `npm run deploy`
3. Push the `out` folder to `gh-pages` branch

### 4. Custom Domain
After deployment, you can add a custom domain:
- Buy a domain (e.g., tinomusikavanhu.com)
- Point DNS to your hosting provider
- Enable HTTPS (usually automatic)

## Environment Setup
No environment variables needed - this is a static site!

## Performance Tips
- Images are optimized automatically
- CSS is minimized in production
- JavaScript is tree-shaken and compressed

Your portfolio will load lightning-fast! ⚡
