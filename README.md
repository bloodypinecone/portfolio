# Portfolio

A single-page professional portfolio site built with HTML, CSS, and JavaScript.

## Features

- **Home** — Hero section, about summary, and skills
- **Projects** — Carousel with prev/next controls, dot navigation, swipe, and keyboard arrows
- **Contact** — Clickable contact cards (email, LinkedIn, GitHub, resume download)
- **Resume** — Downloadable PDF linked from the nav, hero, and contact section

## Project Structure

```
portfolio/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
└── assets/
    └── resume/
        └── CalliannaPriebeResume_2026.pdf
```

## Getting Started

Open `index.html` in a browser, or serve locally:

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .
```

Then visit `http://localhost:8080`.

## Customization

1. **Contact info** — Update email, LinkedIn, and GitHub URLs in `index.html` (Contact section).
2. **Projects** — Edit carousel slides in `index.html` under `#carousel-track`.
3. **About & skills** — Update copy and skill tags in the Home panel.
4. **Resume** — Replace `assets/resume/CalliannaPriebeResume_2026.pdf` with an updated file.

## License

Personal portfolio — all rights reserved.
