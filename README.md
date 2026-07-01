# Capucine et Tournesol Website

This repository contains the source code and content for the Capucine et Tournesol bakery website.  
**All rights reserved. Unauthorized use, copying, or modification is prohibited.**

This project is built with Astro and hosted on Netlify.
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

Astro uses the files in src/pages/ to generate site routes.

Static assets such as images are stored in the public/ directory.

Serverless functions used by the ordering system are located in netlify/functions/.

## Development (for maintainers)

- `npm run dev` → start local dev server
- `npm run build` → build the production site

## Content Editing

To update site content, use the CONTENT_EDIT_GUIDE.md. This guide explains how to safely edit `.json` and `.md` files through the Content Panel.

## Deployment

The production website is hosted on Netlify.

Changes pushed to the main branch automatically trigger a new production deployment through Netlify.

The production deployment includes:

- Astro static site build
- Netlify Functions deployment
- Environment variable management
- Google Sheets order integration
- Resend email integration

