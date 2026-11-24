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

- `index.html` implements a minimalist architectural layout with a floating navigation dock (using the extracted transparent mountain crest), editorial statement hero, direct clickable contact bar, equal-height 2-panel alpine visual diptych, two-column hairline services grid with slide-over scope drawer, mission statement, consultation brief form, and minimal footer.
- `styles.css` uses a pure white ground (`#ffffff`), near-black ink (`#111111`), muted secondary ink (`#6e6e73`), and Satoshi typography with responsive support across mobile (`320px`, `390px`), tablet (`768px`), laptop (`1024px`), and desktop (`1440px`) viewports.
- `app.js` manages the slide-over practice scope drawer, service pre-selection into the inquiry form, copy-to-clipboard actions, mobile navigation sheet with scroll lock, and consultation brief validation with `mailto:` and WhatsApp dispatch.
- `assets/himalaya-crest.png`, `assets/himalaya-lockup.png`, and `assets/himalaya-logo.jpg` store the official company logo and transparent brand marks.
- `scripts/verify-deployments.mjs` runs headless Chrome checks across five viewports (`320px`, `390px`, `768px`, `1024px`, `1440px`) to verify every interactive flow, link, image, and zero horizontal overflow.

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
