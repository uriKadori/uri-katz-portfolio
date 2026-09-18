# Uri Katz — Games, Systems & 3D Art

Welcome to my game development portfolio. I’m Uri Katz, a CTO and Unity/backend developer who enjoys turning ideas into playable worlds and the systems that make them work.

My work spans Unity and C#, authoritative multiplayer, backend services, analytics, mobile releases, editor tools, and 3D art. I have worked on games at Lootheads and InnPlay Labs, and I also build independent experiments under the Uri Games name.

## Explore the portfolio

The portfolio has two connected experiences:

- **Classic portfolio — `index.html`**: browse company projects, personal games, 3D artwork, experience, education, and technologies. Use the top navigation to jump between Games, 3D art, and contact. Project cards include available browser, download, Google Play, or App Store links.
- **The Little Climb — `adventure.html`**: explore the projects as an interactive orthographic world. A fox climbs a ladder between eleven floating islands, one game per level. Each island has its own environment, artwork board, and project links.

On The Little Climb, navigate with:

- **Up / Down arrows** or **W / S** to climb.
- **Mouse wheel or trackpad scrolling** to move one level at a time.
- **The circular arrow buttons** near the bottom of the screen.
- **The trail dots** to jump directly to a game.

The fox steps onto each island when it stops climbing. Boards are angled into the scene, and the fox remains visible in front of them. Scroll or climb in either direction to revisit previous games.

## Run locally

This is a dependency-free static site. From the project folder, run:

```powershell
node server.cjs
```

Then open `http://127.0.0.1:4173/index.html`. The interactive page is available at `http://127.0.0.1:4173/adventure.html`.

## The interactive world

The Little Climb uses locally bundled Three.js 0.180.0, procedural geometry, and the existing project artwork. The scene includes a modeled fox with a scarf and articulated limbs, layered rock islands, trees, snow, moss, roots, lanterns, angled wooden boards, shadows, and changing environments.

Each level has its own atmosphere: constellation sky, snowy summit, rain, autumn woods, misty mountains, deep space, clouds, ocean, sunset, neon night, or sunny meadow. Weather and lighting blend as the fox moves. Reduced-motion preferences make movement and environment changes immediate.

The game order starts with **Online Ping Pong** at level 1 and ends with **Blocky Block Worlds** at level 11. Every board contains a short description and the original available store or download links.

## Update the game catalog

The classic portfolio is the source for the adventure catalog. After changing game data in `dist/index.html` or `dist/app.js`, run:

```powershell
node build-adventure-data.cjs
```

The main interactive files are `dist/adventure.html`, `dist/adventure.css`, `dist/adventure.js`, `dist/world-assets.js`, `dist/fox-motion.js`, `dist/environments.js`, and generated `dist/adventure-data.js`.

## Publish with GitHub Pages

The repository includes `.github/workflows/pages.yml`. Push the project to the `main` branch, then enable **Settings → Pages → GitHub Actions** in the GitHub repository. The workflow publishes the `dist` folder.

For a project repository named `Portfolio`, the site URLs are:

```text
https://YOUR_USERNAME.github.io/Portfolio/
https://YOUR_USERNAME.github.io/Portfolio/adventure.html
```

## Company projects and credits

`dist/CV/` contains the supplied CV project notes and images for Blocky Block Worlds, Trailz, and Animals & Coins. Store links are retained where they were provided.

The original artwork and games belong to their respective owners. `assets.json` records the original Wix image identifiers used as provenance for the local gallery assets.
