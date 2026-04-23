# 🚀 Deployment Guide

## Portfolio Website (Netlify)

### Quick Deploy:
1. **Drag & Drop**: Go to [netlify.com](https://netlify.com), drag your `out` folder
2. **Git Deploy**: Connect your GitHub repo for automatic deployments

### Build Commands:
- **Build Command**: `npm run build`
- **Publish Directory**: `out`
- **Node Version**: 18.x

---

## Harvard-Style Resume (PDF)

### To Generate PDF:
You need LaTeX installed. Choose one:

#### Option 1: Online (Easiest)
1. Go to [Overleaf.com](https://overleaf.com)
2. Upload `cv-harvard-style.tex`
3. Compile with XeLaTeX
4. Download PDF

#### Option 2: Local Installation
```bash
# macOS (with Homebrew)
brew install --cask mactex

# Then compile:
xelatex cv-harvard-style.tex
```

#### Option 3: Docker (No Installation)
```bash
docker run --rm -v $(pwd):/data texlive/texlive:latest xelatex cv-harvard-style.tex
```

---

## What You Get:
- ✨ **Portfolio**: Modern, responsive website with quantum animations
- 📄 **Resume**: Harvard PhD-style academic CV in PDF format
- 🔗 **Both**: Perfect combo for any application!

## Pro Tips:
- **Custom Domain**: Add your own domain in Netlify settings
- **HTTPS**: Automatic with Netlify
- **Updates**: Just push to GitHub for auto-deployment
- **Resume Updates**: Re-compile LaTeX when you add new achievements

You're ready to conquer the world! 🌟
