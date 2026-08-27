# Demo generator — bozze di siti per cold outreach

Genera landing page demo personalizzate per piccole imprese locali (agriturismi, artigiani, centri estetici, orafi, ristoranti), da mandare come "bozza gratuita" prima del contatto commerciale.

Stack: [Astro](https://astro.build) (output statico, content collections) + Tailwind CSS 4.

## Regola fondamentale

**Contenuto e presentazione sono sempre separati.** Un template di categoria (`src/categories/*.astro`) non contiene mai testo o dati di un'azienda specifica: prende tutto da un file in `src/content/leads/`. Aggiungere un lead significa creare un `.json`, mai scrivere HTML.

## Struttura del progetto

```
src/
├── layouts/
│   └── BaseLayout.astro     nav implicita, footer con badge "bozza dimostrativa", WhatsApp float, meta noindex
├── components/              riusabili tra TUTTE le categorie
│   ├── Hero.astro
│   ├── Gallery.astro
│   ├── ReviewCard.astro
│   ├── ServiceGrid.astro
│   ├── ContactSection.astro
│   ├── MapEmbed.astro
│   ├── BookingForm.astro    form preventivo/prenotazione/quotazione (mock, sempre)
│   └── WhatsAppFloat.astro
├── categories/               un template per categoria: compone i componenti sopra
│   ├── Ricettivo.astro        agriturismi, B&B, cantine — Fraunces/Inter, palette terracotta
│   ├── Artigiani.astro         sartorie, tappezzerie, carrozzerie — Zilla Slab/Work Sans
│   ├── Beauty.astro            centri estetici, parrucchieri — Marcellus/Poppins
│   ├── B2BArtigianato.astro   orafi, laboratori — Cormorant Garamond/Manrope
│   └── Gastronomia.astro       ristoranti — Playfair Display/Karla
├── content/leads/            un file .json per lead — i DATI, mai il markup
├── content.config.ts         schema Zod condiviso da tutte le categorie
└── pages/
    ├── index.astro           indice interno di tutte le demo (utile in dev)
    └── demo/[slug].astro     route pubblica /demo/<slug>, dispatcha al template giusto
```

## Comandi

```bash
npm install
npm run dev          # http://localhost:4321
npm run build         # output statico in dist/, pronto per Vercel/Netlify
npm run preview       # serve la build di produzione in locale
npm run new-lead       # crea un nuovo file src/content/leads/<slug>.json
```

## Aggiungere un nuovo lead

```bash
npm run new-lead -- ricettivo agriturismo-rossi
```

Oppure lancia `npm run new-lead` senza argomenti e rispondi alle domande. Viene creato `src/content/leads/agriturismo-rossi.json` con tutti i campi già presenti: sostituisci ogni valore segnato `<-- ... -->` con il dato reale, poi:

```bash
npm run dev
# → http://localhost:4321/demo/agriturismo-rossi
```

Non serve toccare codice. Il file JSON è validato contro lo schema in `src/content.config.ts` — se manca un campo obbligatorio o un tipo non torna, `npm run dev`/`build` segnalano l'errore con il nome del file incriminato.

Note sui campi:
- `colors` sono i 3 colori del brand del lead (dal logo, se esiste). Vengono iniettati come CSS custom properties per pagina: non serve toccare Tailwind né ricompilare per lead diversi.
- `slug` nel JSON **deve coincidere** con il nome del file (senza `.json`): è quel valore a determinare l'URL `/demo/<slug>`.
- `services`, `gallery`, `reviews` accettano array di lunghezza qualsiasi (anche vuoti: la sezione semplicemente non viene renderizzata).
- Le immagini possono essere URL (Unsplash per le demo, o URL di foto reali del cliente su un CDN/Drive pubblico) oppure percorsi locali in `public/` (es. `/leads/agriturismo-rossi/hero.jpg`).

## Le 5 categorie e la loro identità visiva

Ogni categoria usa gli stessi componenti riusabili ma con font pairing e palette diversi, iniettati come CSS custom properties (nessuna variante "dark mode" dei componenti: la differenza è colore, tipografia, composizione e 1-2 sezioni su misura per categoria).

| Categoria | Font (serif / sans) | Mood | Sezione su misura |
| --- | --- | --- | --- |
| Ricettivo | Fraunces / Inter | caldo, rustico-elegante | — |
| Artigiani di servizio | Zilla Slab / Work Sans | bottega, materico | Prima/dopo, zona operativa |
| Beauty & wellness | Marcellus / Poppins | soffice, spa | Calendario prenotazione mock → WhatsApp |
| B2B artigianato | Cormorant Garamond / Manrope | luxury, scuro | Fascia scura "la lavorazione" |
| Gastronomia | Playfair Display / Karla | fine dining | Menu scuro raggruppato + orari |

## Aggiungere una nuova categoria

1. **Schema dati** — in `src/content.config.ts`, aggiungi il valore all'enum `category`. Se la categoria ha campi propri che le altre non hanno, aggiungili come opzionali allo schema condiviso: non creare uno schema separato, per non dover duplicare il dispatch.
2. **Template** — crea `src/categories/<Categoria>.astro` sul modello degli altri: importa `BaseLayout` + i componenti riusabili (`Hero`, `Gallery`, `ServiceGrid`, `BookingForm`, `ReviewCard`, `ContactSection`, ...), componili nell'ordine e con i testi giusti per quella categoria. Non inventare nuovi componenti a meno che una sezione non sia genuinamente diversa da tutto il resto.
3. **Identità visiva** — scegli un font pairing su Google Fonts non ancora usato dalle altre categorie e passalo a `BaseLayout` via `fontsHref`/`fontSerif`/`fontSans`; scegli una palette `colors` di default per i lead di quella categoria, coerente col settore.
4. **Dispatch** — registra il nuovo template in `src/pages/demo/[slug].astro`, aggiungendolo all'oggetto `templatesByCategory`.
5. **Script new-lead** — aggiungi un template precompilato per la categoria in `scripts/new-lead.mjs` (oggetto `TEMPLATES`), con gli stessi placeholder `<-- ... -->` usati dalle altre.

## Performance e qualità

- Output 100% statico: nessun JavaScript lato client tranne il piccolo script del form (mock submit) e il componente WhatsApp.
- Immagini con `loading="lazy"` tranne l'hero (`eager` + `fetchpriority="high"`).
- Font (Fraunces/Inter) caricati da Google Fonts con `display=swap`.
- Ogni pagina demo ha `<meta name="robots" content="noindex, nofollow">` e un badge in footer ("bozza dimostrativa — non ancora online"): trasparenza col prospect, e nessun rischio che una demo venga indicizzata come sito reale dell'azienda.

## Deploy

`npm run build` genera `dist/` pronta per Vercel o Netlify (static output, zero config aggiuntiva). Un progetto per demo o un unico progetto con tutte le demo sotto `/demo/*`, a seconda di come preferisci gestire gli URL da mandare ai prospect.
