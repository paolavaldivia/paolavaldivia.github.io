# Paola Valdivia - Portfolio

Personal academic portfolio website built with [Astro](https://astro.build).

## About

This site showcases my research work in information visualization, hypergraph analysis, and network visualization.

## Tech Stack

- **Astro** - Static Site Generator
- **TypeScript** - Type safety
- **GitHub Actions** - Automated deployment

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

The site automatically deploys to GitHub Pages via GitHub Actions when changes are pushed to the main branch.

## Structure

- `/src/pages/` - Page components (Home, Projects, Publications, CV)
- `/src/layouts/` - Layout templates
- `/src/components/` - Reusable components
- `/public/` - Static assets (images, PDFs, files)
- `/public/paoh/` - PAOHvis visualization tool (separate app)

## Previous Version

This site was previously built with React. It has been migrated to Astro for:
- 50-100x smaller bundle size (from ~15MB to ~200KB)
- Faster page loads
- Better SEO
- Easier maintenance
- Static HTML generation

## License

© 2026 Paola Valdivia. All rights reserved.
