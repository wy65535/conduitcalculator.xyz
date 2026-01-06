# Deployment Instructions for ConduitCalculator.xyz

## Prerequisites
- GitHub account
- Cloudflare account
- Domain: conduitcalculator.xyz

## Step 1: Push to GitHub

1. Initialize Git repository:
```bash
git init
git add .
git commit -m "Initial commit - Conduit Fill Calculator"
```

2. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Name: conduitcalculator.xyz
   - Set as Public
   - Don't initialize with README

3. Push to GitHub:
```bash
git remote add origin https://github.com/YOUR_USERNAME/conduitcalculator.xyz.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy with Cloudflare Pages

1. Log in to Cloudflare Dashboard
2. Go to "Pages" section
3. Click "Create a project"
4. Connect your GitHub account
5. Select the repository: conduitcalculator.xyz
6. Configure build settings:
   - Project name: conduitcalculator
   - Production branch: main
   - Build command: (leave empty - static site)
   - Build output directory: /
7. Click "Save and Deploy"

## Step 3: Configure Custom Domain

1. In Cloudflare Pages project settings
2. Go to "Custom domains"
3. Click "Set up a custom domain"
4. Enter: conduitcalculator.xyz
5. Follow DNS configuration instructions
6. Add both:
   - conduitcalculator.xyz
   - www.conduitcalculator.xyz (optional)
7. Enable "Automatic HTTPS Rewrites"

## Step 4: Configure DNS (if domain is on Cloudflare)

1. Go to DNS settings for conduitcalculator.xyz
2. Add CNAME record:
   - Name: @ (or conduitcalculator.xyz)
   - Target: your-project.pages.dev
   - Proxy status: Proxied (orange cloud)

## Step 5: Enable Performance Features

In Cloudflare dashboard:
1. **Speed** > Auto Minify: Enable HTML, CSS, JS
2. **Speed** > Brotli: Enable
3. **Caching** > Configuration: Set browser cache TTL
4. **SSL/TLS**: Set to "Full" or "Full (strict)"
5. **Security** > Bot Fight Mode: Enable (optional)

## Step 6: Add Google AdSense

1. Apply for Google AdSense account
2. Get AdSense code snippet
3. Add to index.html in <head> section:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
     crossorigin="anonymous"></script>
```
4. Add ad units where desired
5. Commit and push changes

## Step 7: Submit to Search Engines

### Google Search Console
1. Go to https://search.google.com/search-console
2. Add property: conduitcalculator.xyz
3. Verify ownership (DNS or HTML file)
4. Submit sitemap: https://conduitcalculator.xyz/sitemap.xml

### Bing Webmaster Tools
1. Go to https://www.bing.com/webmasters
2. Add site
3. Verify ownership
4. Submit sitemap

## Step 8: Monitor Performance

1. **Google Analytics** (optional):
   - Create GA4 property
   - Add tracking code to all pages
   
2. **Cloudflare Analytics**:
   - Built-in, check "Analytics" tab
   
3. **Google Search Console**:
   - Monitor indexing status
   - Check search performance
   - Review mobile usability

## Updates and Maintenance

To update the site:
```bash
git add .
git commit -m "Description of changes"
git push origin main
```

Cloudflare Pages will automatically rebuild and deploy.

## Performance Optimization Checklist

- ✅ HTTPS enabled
- ✅ Compression enabled (Brotli/Gzip)
- ✅ Browser caching configured
- ✅ Minification enabled
- ✅ Mobile-responsive design
- ✅ Sitemap submitted
- ✅ robots.txt configured
- ✅ Structured data added
- ✅ Meta tags optimized
- ✅ Open Graph tags added

## SEO Checklist

- ✅ Unique title tags for each page
- ✅ Meta descriptions for each page
- ✅ Semantic HTML structure
- ✅ Alt text for images (when added)
- ✅ Internal linking structure
- ✅ Mobile-friendly design
- ✅ Fast loading speed
- ✅ Sitemap.xml
- ✅ robots.txt
- ✅ Structured data (JSON-LD)
- ✅ Canonical URLs

## Troubleshooting

**Issue: Site not loading after deployment**
- Check DNS propagation (24-48 hours)
- Verify CNAME records in Cloudflare
- Check SSL/TLS settings

**Issue: AdSense not showing ads**
- Verify AdSense account is approved
- Check ad code is correctly placed
- Allow 24-48 hours for ads to appear
- Check Content Security Policy doesn't block ads

**Issue: Not appearing in search results**
- Submit sitemap to search engines
- Check robots.txt isn't blocking crawlers
- Allow 2-4 weeks for indexing
- Verify pages in Google Search Console

## Support

For questions or issues:
- Check FAQ: https://conduitcalculator.xyz/faq.html
- Cloudflare Docs: https://developers.cloudflare.com/pages/
- GitHub Issues: Create an issue in the repository

## License

This project is for educational and commercial use.

