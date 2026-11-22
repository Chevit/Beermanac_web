# Beermanac / Пивогляд — website

Static landing site for the iOS app Beermanac (Пивогляд on the Ukrainian App Store), hosted on GitHub Pages. Modelled on daily-rune-site.

Live (after Pages is enabled): https://chevit.github.io/Beermanac_web/

| Page | URL | Used for |
| --- | --- | --- |
| Home (en) | `/` | Marketing URL |
| Home (uk) | `/uk/` | |
| Support | `/support.html` | App Store **Support URL** |
| Privacy Policy | `/privacy-policy.html` | App Store **Privacy Policy URL** |
| Terms of Use | `/terms-of-use.html` | |

Support, privacy and terms hold both languages and switch in place. `?locale=en` or `?locale=uk` picks the language; otherwise the last choice or the browser language is used (`js/page-locale.js`).

No build step, no dependencies. All paths are relative, so the site works both under `/Beermanac_web/` and on a custom domain. Exception: `404.html` uses absolute `/Beermanac_web/...` paths; update them if a custom domain (CNAME) is added, together with the canonical URLs, `og:image` and `sitemap.xml`.

## Local preview

```sh
python3 -m http.server 8000
# open http://localhost:8000/
```

## Publishing

Settings → Pages → Source: Deploy from a branch → `main` / root.

## After the App Store release

- Replace the "Coming soon to the App Store" block in `index.html` and `uk/index.html` with the official App Store badge linking to the app.
- Uncomment `<meta name="apple-itunes-app" content="app-id=...">` in both home pages.

## Assets

Icon and graphics come from the app's design files (icon "Spectrum pint"): `assets/icon-*.png`, `assets/apple-touch-icon.png`, `favicon.ico`, `assets/pint.png`, `assets/og-image.png` (1200×630 social preview).
