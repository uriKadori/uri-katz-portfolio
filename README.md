# Uri Katz — UMango Games portfolio

A responsive portfolio with the eight games and twelve 3D gallery items from https://umangogames.wixsite.com/umangogames. Built with HTML, CSS and vanilla JavaScript; no dependencies or build step.

## Preview

Run `node server.cjs`, then open http://127.0.0.1:4173.

## The Little Climb

Open `adventure.html` for a second, artistic portfolio: an orthographic Three.js woodland with a fox climbing between all 11 game projects. Use Up/Down, W/S, the on-screen arrows, or the trail dots. The original portfolio links to this page and remains available through “Classic portfolio.”

The scene uses locally bundled Three.js 0.180.0 (MIT license in `dist/vendor/THREE-LICENSE.txt`), procedural geometry, and the existing project images. No build step or external 3D service is required. Reduced-motion preferences disable ambient motion and make navigation immediate. If WebGL is unavailable, the project cards and navigation still work.

Each island carries a wooden project board with artwork, a short description, and accessible store/download links. The locally bundled CSS3DRenderer projects these boards through the same orthographic camera as the fox and islands; there is no separate sidebar card. Links on the current landing become interactive when the fox arrives.

`dist/environments.js` defines eleven island environments: sunny meadow, neon night, tropical sunset, ocean morning, clouds, deep space, misty mountains, autumn woods, rain, snowy summit, and constellations. Cached canvas scenery blends with the fox’s actual height in either direction; weather and scene lighting follow along. Reduced motion freezes weather and switches environments immediately.

`dist/world-assets.js` builds the original procedural diorama models: a sculpted fox with scarf and articulated limbs, irregular layered rock islands, pine and autumn trees, snow caps, mushrooms, grass, hanging roots, beveled ladder timbers, and emissive lanterns. The renderer uses filmic tone mapping and a shadow-casting light that follows the fox, with a smaller shadow map on mobile. No model downloads are required.

`dist/fox-motion.js` controls rung-aligned paw contacts, bending limbs, acceleration, direction changes, and the step onto each alternating island. At rest the fox stands inside the island surface with planted feet; it approaches the ladder again before climbing.

Mouse-wheel and trackpad scrolling are also supported. A small accumulated delta threshold and a short lockout make one gesture advance one level; modifier-key scrolling remains available for normal browser zoom or horizontal navigation.

The fox also renders in a transparent foreground pass above the CSS3D boards, using the same camera and viewport. This keeps it visible during climbing and at rest; the foreground layer ignores pointer events so project links remain clickable.

After changing the classic portfolio’s games, run `node build-adventure-data.cjs` to refresh the adventure catalog. Its layout and scene live in `dist/adventure.html`, `dist/adventure.css`, and `dist/adventure.js`.

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

## Company projects

`dist/CV/` contains the original `CV-Projects.md` and all six images copied from the supplied CV-Projects ZIP. The Company games section summarizes those project contributions and uses the local images. No store URLs were supplied, so the company projects do not invent store links.
