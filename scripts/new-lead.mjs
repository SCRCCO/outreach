#!/usr/bin/env node
// Genera src/content/leads/<slug>.json precompilato per una categoria.
// Uso:
//   npm run new-lead -- ricettivo agriturismo-rossi
//   npm run new-lead                (chiede categoria e slug a schermo)
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const leadsDir = path.join(__dirname, '..', 'src', 'content', 'leads');

// Aggiungi qui una nuova voce quando implementi il template della categoria
// corrispondente in src/categories/. Ogni valore <-- ... --> è un placeholder:
// sostituiscilo, il resto della struttura non va toccato.
const TEMPLATES = {
  ricettivo: (slug) => ({
    slug,
    category: 'ricettivo',
    businessName: '<-- Nome esatto dell\'azienda, es. "Agriturismo Podere del Sole" -->',
    tagline: '<-- Una frase breve, max 10 parole, che riassume l\'esperienza -->',
    heroImage: '<-- URL foto ampia e orizzontale dell\'ambiente/paesaggio (min 1600px larghezza) -->',
    colors: {
      primary: '<-- colore principale del brand, es. dal logo. Formato hex: #a8542e -->',
      secondary: '<-- colore secondario, usato per accenti minori: #5f6b47 -->',
      accent: '<-- colore per dettagli/stelle recensioni: #c9973f -->',
    },
    description: '<-- 2-4 frasi: chi sono, da quanto tempo, cosa rende il posto speciale -->',
    services: [
      {
        name: '<-- Nome camera/servizio, es. "Camera Doppia Vista Colline" -->',
        description: '<-- 1-2 frasi descrittive -->',
        price: '<-- opzionale, es. "da 90€/notte". Rimuovi il campo se non vuoi mostrare prezzi -->',
        image: '<-- opzionale, URL foto specifica del servizio -->',
      },
      {
        name: '<-- Aggiungi quante voci servono: camere, degustazioni, esperienze... -->',
        description: '<-- ... -->',
      },
    ],
    servicesTitle: '<-- opzionale, default "Camere & servizi" -->',
    gallery: [
      '<-- URL foto 1 (quadrata o orizzontale) -->',
      '<-- URL foto 2 -->',
      '<-- URL foto 3, aggiungine quante vuoi -->',
    ],
    galleryTitle: '<-- opzionale, default "Un assaggio del posto" -->',
    reviews: [
      {
        text: '<-- estratto di una recensione reale (Google/Booking), 1-2 frasi -->',
        author: '<-- Nome, iniziale del cognome. Es. "Marco B." -->',
        rating: 5,
      },
      {
        text: '<-- seconda recensione, opzionale ma consigliata -->',
        author: '<-- ... -->',
        rating: 5,
      },
    ],
    contact: {
      address: '<-- Indirizzo completo, usato anche per la mappa -->',
      phone: '<-- Numero di telefono in formato leggibile, es. "+39 0575 123456" -->',
      email: '<-- Email di contatto -->',
      whatsapp: '<-- Numero WhatsApp in formato internazionale senza spazi, es. "393331234567" -->',
    },
    ctaText: '<-- Testo del bottone principale nell\'hero, es. "Scopri le camere" -->',
    formTitle: '<-- opzionale, default "Richiedi disponibilità" -->',
  }),

  artigiani: (slug) => ({
    slug,
    category: 'artigiani',
    businessName: '<-- Nome esatto dell\'azienda, es. "Sartoria Bianchi" -->',
    tagline: '<-- Una frase breve che riassume cosa fate e da quanto -->',
    heroImage: '<-- URL foto ampia della bottega/officina al lavoro -->',
    colors: {
      primary: '<-- colore principale, es. dal logo. Formato hex: #8a3324 -->',
      secondary: '<-- colore secondario: #2b2b28 -->',
      accent: '<-- colore per dettagli: #c98a3e -->',
    },
    badge: '<-- opzionale, es. "Dal 1968". Rimuovi il campo se non serve -->',
    description: '<-- 2-4 frasi: chi siete, da quanto tempo, cosa vi contraddistingue -->',
    aboutQuote: {
      text: '<-- opzionale: una frase del titolare, tra virgolette -->',
      author: '<-- opzionale: nome e ruolo -->',
    },
    stats: [
      { value: '<-- es. 1968 -->', label: '<-- es. Dal -->' },
      { value: '<-- es. 500+ -->', label: '<-- es. Pezzi restaurati -->' },
    ],
    beforeAfter: [
      {
        before: '<-- URL foto "prima". Rimuovi tutto il blocco beforeAfter se non rilevante per il tuo mestiere -->',
        after: '<-- URL foto "dopo" -->',
        label: '<-- opzionale: didascalia del lavoro -->',
      },
    ],
    services: [
      {
        name: '<-- Nome servizio, es. "Restauro poltrone" -->',
        description: '<-- 1-2 frasi descrittive -->',
        image: '<-- opzionale, URL foto -->',
      },
      {
        name: '<-- Aggiungi quanti servizi servono -->',
        description: '<-- ... -->',
      },
    ],
    gallery: ['<-- URL foto 1 della bottega/lavori -->', '<-- URL foto 2 -->', '<-- URL foto 3 -->'],
    serviceArea: ['<-- Comune 1 -->', '<-- Comune 2 -->', '<-- Rimuovi il campo se non rilevante -->'],
    reviews: [{ text: '<-- estratto recensione reale -->', author: '<-- Nome I. -->', rating: 5 }],
    contact: {
      address: '<-- Indirizzo completo -->',
      phone: '<-- Telefono, es. "+39 0575 123456" -->',
      email: '<-- Email di contatto -->',
      whatsapp: '<-- Numero WhatsApp senza spazi, es. "393331234567" -->',
    },
    ctaText: '<-- Testo del bottone principale nell\'hero, es. "Guarda i lavori" -->',
  }),

  beauty: (slug) => ({
    slug,
    category: 'beauty',
    businessName: '<-- Nome esatto del salone, es. "Atelier Rossi" -->',
    tagline: '<-- Una frase breve sull\'esperienza in salone -->',
    heroImage: '<-- URL foto ampia dell\'interno del salone -->',
    colors: {
      primary: '<-- colore principale: #b8788a -->',
      secondary: '<-- colore secondario: #8a9a7e -->',
      accent: '<-- colore per dettagli: #cba26a -->',
    },
    description: '<-- 2-4 frasi: chi siete, filosofia del salone -->',
    stats: [{ value: '<-- es. 12 -->', label: '<-- es. Anni di attività -->' }],
    services: [
      {
        name: '<-- Nome servizio, es. "Taglio & piega" -->',
        description: '<-- 1-2 frasi -->',
        price: '<-- opzionale, es. "da 35€" -->',
        image: '<-- opzionale, URL foto -->',
      },
      {
        name: '<-- Aggiungi quanti servizi servono -->',
        description: '<-- ... -->',
      },
    ],
    gallery: ['<-- URL foto 1 del salone -->', '<-- URL foto 2 -->'],
    reviews: [{ text: '<-- estratto recensione reale -->', author: '<-- Nome I. -->', rating: 5 }],
    contact: {
      address: '<-- Indirizzo completo -->',
      phone: '<-- Telefono -->',
      email: '<-- Email di contatto -->',
      whatsapp: '<-- Numero WhatsApp senza spazi, es. "393331234567" -->',
    },
    ctaText: '<-- Testo del bottone principale nell\'hero, es. "Prenota ora" -->',
  }),

  'b2b-artigianato': (slug) => ({
    slug,
    category: 'b2b-artigianato',
    businessName: '<-- Nome esatto del laboratorio, es. "Oreficeria Rossi" -->',
    tagline: '<-- Una frase breve su cosa producete e per chi -->',
    heroImage: '<-- URL foto ampia del laboratorio/lavorazione -->',
    colors: {
      primary: '<-- colore principale: #9c7a3c -->',
      secondary: '<-- colore secondario: #1c1917 -->',
      accent: '<-- colore per dettagli: #d9c48f -->',
    },
    badge: '<-- opzionale, es. "Fatto a mano ad Arezzo" -->',
    description: '<-- 2-4 frasi: chi siete, per chi lavorate (B2B), cosa vi distingue -->',
    aboutQuote: {
      text: '<-- opzionale: una frase del mastro artigiano -->',
      author: '<-- opzionale: nome e ruolo -->',
    },
    stats: [{ value: '<-- es. 1985 -->', label: '<-- es. Dal -->' }],
    services: [
      {
        name: '<-- Nome prodotto/linea, es. "Fedi e anelli" -->',
        description: '<-- 1-2 frasi -->',
        image: '<-- opzionale, URL foto prodotto -->',
      },
      {
        name: '<-- Aggiungi quante voci di catalogo servono -->',
        description: '<-- ... -->',
      },
    ],
    gallery: ['<-- URL foto 1 del processo di lavorazione -->', '<-- URL foto 2 -->'],
    contact: {
      address: '<-- Indirizzo completo -->',
      phone: '<-- Telefono -->',
      email: '<-- Email di contatto -->',
      whatsapp: '<-- Numero WhatsApp senza spazi, es. "393331234567" -->',
    },
    ctaText: '<-- Testo del bottone principale nell\'hero, es. "Scopri il catalogo" -->',
  }),

  gastronomia: (slug) => ({
    slug,
    category: 'gastronomia',
    businessName: '<-- Nome esatto del locale, es. "Osteria Rossi" -->',
    tagline: '<-- Una frase breve sulla cucina e la location -->',
    heroImage: '<-- URL foto ampia della sala/location -->',
    colors: {
      primary: '<-- colore principale: #7a2331 -->',
      secondary: '<-- colore secondario: #2b2622 -->',
      accent: '<-- colore per dettagli: #c9a15a -->',
    },
    description: '<-- 2-4 frasi: tipo di cucina, filosofia, cosa vi distingue -->',
    stats: [{ value: '<-- es. 1998 -->', label: '<-- es. Dal -->' }],
    services: [
      {
        name: '<-- Nome piatto -->',
        description: '<-- 1 frase descrittiva -->',
        price: '<-- es. "14€" -->',
        group: '<-- Antipasti / Primi / Secondi / Dolci -->',
      },
      {
        name: '<-- Aggiungi quanti piatti servono, raggruppati per "group" -->',
        description: '<-- ... -->',
        price: '<-- ... -->',
        group: '<-- ... -->',
      },
    ],
    hours: [
      { day: '<-- es. Lunedì -->', time: '<-- es. Chiuso -->' },
      { day: '<-- es. Martedì – Domenica -->', time: '<-- es. 19:30 – 22:30 -->' },
    ],
    gallery: ['<-- URL foto 1 della sala/dei piatti -->', '<-- URL foto 2 -->'],
    reviews: [{ text: '<-- estratto recensione reale -->', author: '<-- Nome I. -->', rating: 5 }],
    contact: {
      address: '<-- Indirizzo completo -->',
      phone: '<-- Telefono -->',
      email: '<-- Email di contatto -->',
      whatsapp: '<-- Numero WhatsApp senza spazi, es. "393331234567" -->',
    },
    ctaText: '<-- Testo del bottone principale nell\'hero, es. "Vedi il menu" -->',
  }),
};

const IMPLEMENTED = Object.keys(TEMPLATES);

function slugify(input) {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-+|-+$)/g, '');
}

async function main() {
  const [argCategory, argSlug] = process.argv.slice(2);
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  let category = argCategory;
  if (!category) {
    category = (await rl.question(`Categoria (${IMPLEMENTED.join(', ')}): `)).trim();
  }

  if (!IMPLEMENTED.includes(category)) {
    console.error(`\nCategoria "${category}" non riconosciuta.\nCategorie disponibili: ${IMPLEMENTED.join(', ')}.`);
    rl.close();
    process.exit(1);
  }

  let rawSlug = argSlug;
  if (!rawSlug) {
    rawSlug = (await rl.question('Nome azienda o slug (es. "Agriturismo Rossi"): ')).trim();
  }
  rl.close();

  const slug = slugify(rawSlug);
  if (!slug) {
    console.error('Slug vuoto dopo la normalizzazione, riprova con un nome valido.');
    process.exit(1);
  }

  fs.mkdirSync(leadsDir, { recursive: true });
  const filePath = path.join(leadsDir, `${slug}.json`);

  if (fs.existsSync(filePath)) {
    console.error(`Esiste già: ${path.relative(process.cwd(), filePath)}`);
    process.exit(1);
  }

  const data = TEMPLATES[category](slug);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');

  console.log(`\nCreato ${path.relative(process.cwd(), filePath)}`);
  console.log('Sostituisci tutti i valori "<-- ... -->" con i dati reali del lead, poi:');
  console.log('  npm run dev');
  console.log(`  → http://localhost:4321/demo/${slug}\n`);
}

main();
