# Capucine et Tournesol Website

This repository contains the source code and content for the Capucine et Tournesol bakery website.  
**All rights reserved. Unauthorized use, copying, or modification is prohibited.**

This project is built using **Astro** and **GitHub Pages**.  
It serves as a lightweight CMS where Markdown (`.md`) and JSON (`.json`) files manage the site content.

---

## Project Structure

Inside of Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

Any static assets, like images, can be placed in the `public/` directory.

## Development (for maintainers)

- `npm run dev` → start local dev server
- `npm run build` → build the production site

## Content Editing

To update site content, use the CONTENT_EDIT_GUIDE.md. This guide explains how to safely edit `.json` and `.md` files through the Content Panel.

## Deployment

Changes pushed to the `main` branch automatically redeploy the live site via GitHub Pages. This is handled through a GitHub Actions workflow (`.github/workflows/deploy.yml`).

Test commit

