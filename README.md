# Uri Katz — UMango Games portfolio

A responsive portfolio with the eight games and twelve 3D gallery items from https://umangogames.wixsite.com/umangogames. Built with HTML, CSS and vanilla JavaScript; no dependencies or build step.

## Preview

Run `node server.cjs`, then open http://127.0.0.1:4173.

## Publish on GitHub Pages

1. Create a GitHub repository and upload this project, including `dist` and `.github/workflows/pages.yml`.
2. Push to the `main` branch.
3. In the repository, choose **Settings → Pages → Source → GitHub Actions**.
4. Run the **Deploy portfolio to GitHub Pages** workflow from Actions, or push another commit. The completed workflow shows your website URL.

All site asset paths are relative, so both username.github.io and username.github.io/repository work.

## Edit

- `dist/index.html`: introduction, featured game, contact details.
- `dist/app.js`: game descriptions, original download/play links, art gallery.
- `dist/styles.css`: visual design and responsive styles.
- `dist/assets/`: local copies of the original artwork and animations.

Project/store links are retained from the original site; availability is controlled by those providers. Google Fonts are optional and fall back to local fonts. The original Wix chat widget is replaced by the existing email contact link; there is no backend or contact form.

Original artwork and games belong to their respective owner. Gallery labels describe the pictured subjects; the original gallery had no visible titles. `assets.json` records original Wix image identifiers for provenance.
