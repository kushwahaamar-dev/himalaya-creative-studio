# Himalaya Creative Studio Ltd

Official landing page for Himalaya Creative Studio Ltd, a London-based Business Development and Management Company (`16 Dimond Close, E7 0HZ, London, UK`).

Live production URL on Vercel: https://dai-sage.vercel.app
GitHub repository: https://github.com/kushwahaamar-dev/himalaya-creative-studio

## Services covered

- Business Development & Consultancy
- Strategic Planning
- Business Management Solutions
- Operational Improvement
- Business Growth & Development
- Creative and Professional Solutions

## Contact details

- Address: `16 Dimond Close, E7 0HZ, London, UK`
- Telephone & WhatsApp: `07467 604323` (`+44 7467 604323`)
- Email: `Himalayacreativestudio@gmail.com`

## Architecture and files

- `index.html` defines the midnight-navy and champagne-gold consultancy layout, official logo lockup, clickable contact strip, six interactive service cards with detail modal, 3-step Business Growth Diagnostic, 4-stage consulting approach tabs, mission and London office block, consultation brief form, and footer.
- `styles.css` pairs Cormorant Garamond with Satoshi in the official brand palette (`#0b111c`, `#121b2b`, `#d4af63`, `#f8f7f3`) with full responsive support down to `390px`.
- `app.js` manages the service detail modal, interactive growth diagnostic roadmap generator, approach phase tabs, copy-to-clipboard actions, mobile navigation drawer, and consultation brief validation with `mailto:` and WhatsApp dispatch.
- `assets/himalaya-crest.png`, `assets/himalaya-lockup.png`, and `assets/himalaya-logo.jpg` store the official company logo and transparent brand marks.
- `scripts/verify-deployments.mjs` runs headless Chrome checks across desktop (`1440x900`) and mobile (`390x844`) viewports to verify every interactive flow, link, image, and zero horizontal overflow.

## Run locally

```sh
	python3 -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173`.

## Verify and deploy

```sh
	node scripts/verify-deployments.mjs http://127.0.0.1:4173 https://dai-sage.vercel.app
```

```sh
	vercel deploy --prod --yes
```
