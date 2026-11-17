# Himalaya Creative Studio Limited

Static web portfolio for Himalaya Creative Studio Limited (`himalayacreativestudio.com`).

Live production URL on Vercel: https://dai-sage.vercel.app
GitHub repository: https://github.com/kushwahaamar-dev/himalaya-creative-studio

## Architecture and files

The site runs as zero-dependency static HTML, CSS, and JavaScript.

- `index.html` defines the document structure, the 6-card fanned project deck, the 3D project inspector, the 2x2 work highlight grid, the service routing links, and the studio desk footer.
- `styles.css` loads Clash Display and Satoshi from Fontshare, defines the light and dark theme tokens (`--bg`, `--surface`, `--ink`, `--muted`, `--accent`, `--line`), sets the architectural grid, and handles the responsive breakpoint at `960px` and `600px`.
- `app.js` holds the `PROJECTS` lookup table and wires three functions: `initDeck()` for the fanned card hover states, 3D pointer tilt, and 3D spinning card inspector, `initThemeToggle()` for the `Aa` light and dark mode switch, and `initReveals()` for the `IntersectionObserver` scroll entrances.
- `assets/` stores the 10 raster photographs, 1 `.webm` video loop, 1 video poster frame, and `assets/credits.json`.
- `scripts/verify-deployments.mjs` launches headless Chrome over the Chrome DevTools Protocol and asserts that the initial backdrop title, card hover transitions, 3D inspector drawer, dark theme toggle, and image loads pass with zero console errors.

## Studio email routing

Each link in the services and footer sections routes to its Google Workspace alias on `himalayacreativestudio.com`:

- `hello@himalayacreativestudio.com` handles new commissions and general introductions.
- `projects@himalayacreativestudio.com` handles active client briefs and engineering inquiries.
- `design@himalayacreativestudio.com` handles brand identity, typography, and UI design systems.
- `accounts@himalayacreativestudio.com` handles invoicing and commercial onboarding.

## Run locally

Start a static HTTP server from the repository root:

```sh
	python3 -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173` in a browser.

## Verify and deploy

Run the automated Chrome verification script against the local server and the live Vercel deployment:

```sh
	node scripts/verify-deployments.mjs http://127.0.0.1:4173 https://dai-sage.vercel.app
```

Deploy to Vercel production from the repository root:

```sh
	vercel deploy --prod --yes
```
