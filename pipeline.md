# Pipeline di Prospecting — Piccole Imprese Arezzo

## Sistema operativo settimanale: categorie → template → estrazione → lista → demo → outreach

---

## 1. Categorie target (definizione precisa)

Invece di trattare "piccole imprese di Arezzo" come un blocco unico, la pipeline lavora per **5 categorie**, ciascuna con segnali di gap digitale specifici da cercare e un template dedicato. Ogni settimana si lavora su 1–2 categorie a rotazione, non su tutte insieme — questo mantiene la qualità dei template alta invece di disperdersi.

**Categoria A — Ricettivo (agriturismi, B&B, cantine con ospitalità)**
Segnali di gap: nessun sito proprio (solo scheda su agriturismo.it/Booking), sito costruito con Weebly/Wix vecchio stile, prenotazioni gestite solo via portale terzi o telefono, nessuna vendita diretta di prodotti (vino, olio).

**Categoria B — Artigiani di servizio (sartorie, tappezzerie, carrozzerie, calzolai)**
Segnali di gap: nessun form di preventivo online, gestione appuntamenti solo telefonica, email su provider generici (tiscali, libero, alice), nessuna galleria lavori online.

**Categoria C — Beauty & wellness (centri estetici, parrucchieri, saloni)**
Segnali di gap: solo pagina Facebook/Instagram, zero booking online, nessun sistema di promemoria appuntamenti.

**Categoria D — Artigianato/manifattura B2B (orafi, laboratori, semilavorati)**
Segnali di gap: sito vetrina statico senza catalogo scaricabile, WooCommerce installato ma non attivo, contatto solo via email generica senza form strutturato.

**Categoria E — Gastronomia e ristorazione**
Segnali di gap: nessun sito proprio, menu solo su piattaforme terze (TheFork, MyMenuWeb), nessuna prenotazione tavolo online, nessun QR menu.

---

## 2. Template per categoria (cosa costruire una volta, riusare sempre)

Per ciascuna categoria si costruisce **un template HTML standalone con Claude Code**, con variabili sostituibili (nome, colori, foto, contatti, testi). Struttura base comune + sezioni specifiche:

| Categoria           | Sezioni chiave del template                                                                | CTA principale                 |
| ------------------- | ------------------------------------------------------------------------------------------ | ------------------------------ |
| A — Ricettivo       | Hero con foto ambiente, camere/servizi, calendario disponibilità (mock), recensioni, mappa | "Richiedi disponibilità"       |
| B — Artigiani       | Hero, galleria lavori (prima/dopo se carrozzeria), form preventivo, zona operativa         | "Richiedi preventivo"          |
| C — Beauty          | Hero, listino servizi, calendario prenotazione (mock), bottone WhatsApp fisso              | "Prenota ora"                  |
| D — B2B artigianato | Hero, catalogo prodotti a griglia, form richiesta quotazione, badge "made in Arezzo"       | "Richiedi catalogo/preventivo" |
| E — Gastronomia     | Hero, menu con QR embed, orari, prenotazione tavolo (mock), mappa                          | "Prenota un tavolo"            |

Ogni template va costruito **una sola volta per categoria**, poi la personalizzazione per singolo lead richiede solo: nome, foto (da Facebook/Google Maps), colori (dal logo se esiste), testi dei servizi, contatti. Tempo stimato per personalizzazione: 20–30 minuti con Claude Code una volta pronto il template.

Hosting: Vercel/Netlify free tier, un progetto per demo, URL tipo `nomeazienda-demo.vercel.app` — nessun costo, nessuna scadenza da gestire prima della conversione.

---

## 3. Estrazione settimanale dei prospect

**Cadenza:** una categoria a settimana (rotazione A→B→C→D→E→A…), 8–12 nuove aziende a estrazione.

**Fonti per categoria:**

- PagineGialle/PagineBianche (filtro per categoria merceologica + comune)
- Google Maps (ricerca per categoria + "Arezzo" e comuni della provincia)
- Pagine Facebook business locali (cerca "no sito web" nel campo info)
- Confartigianato Arezzo / Camera di Commercio Arezzo (elenchi associati, utile per categoria B e D)
- Agriturismo.it, Strada del Vino Terre di Arezzo (per categoria A)

**Processo per ogni azienda candidata (checklist rapida, 3–5 minuti a lead):**

1. Ha un sito proprio? Se sì, che aspetto ha (builder datato, WooCommerce spento, ecc.)?
2. Ha un contatto pubblico verificabile (email o telefono)? Se no, escludere.
3. È già seguita da un'agenzia (sito recente, curato, con booking funzionante)? Se sì, escludere.
4. Qual è il gap più visibile e vendibile in una frase?

**Output settimanale:** stessa tabella già usata (Nome | Settore | Città | Stato digitale | Opportunità | Contatto | Idea di apertura), taggata con la categoria della settimana.

---

## 4. Lista / CRM leggero

Un unico foglio (Google Sheets o Airtable) con queste colonne, alimentato ogni settimana:

`Nome azienda | Categoria | Città | Contatto | Stato digitale | Opportunità | Data estrazione | Demo pronta (sì/no) | Link demo | Data invio mail | Data follow-up | Stato (da contattare / demo inviata / risposto / negoziazione / chiuso-vinto / chiuso-perso) | Note`

Questo evita due errori tipici: ricontattare la stessa azienda due volte, e perdere traccia di chi ha risposto ma non ha ancora ricevuto un follow-up. La colonna "Stato" è quella da controllare ogni giorno.

---

## 5. Ciclo operativo settimanale (proposta di calendario)

| Giorno            | Attività                                                                                                                               |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Lunedì            | Estrazione 8–12 lead della categoria della settimana, compilazione tabella                                                             |
| Martedì–Mercoledì | Costruzione demo per i 4–6 lead con contatto email verificato (priorità), usando il template di categoria                              |
| Giovedì           | Invio mail personalizzate con link demo ai lead pronti                                                                                 |
| Venerdì           | Chiamate ai lead solo-telefono (categoria settimana precedente) + follow-up a chi ha aperto la mail senza rispondere (dopo 3–4 giorni) |
| Continuo          | Aggiornamento colonna "Stato" sul foglio ogni volta che c'è un movimento                                                               |

Con questo ritmo, in 5 settimane si copre tutta la provincia su tutte e 5 le categorie, con un flusso costante di 4–6 demo inviate a settimana invece di un'unica ondata da 17 aziende gestita male.

---

## Prossimo passo consigliato

Costruire subito **il primo template** (consiglio: Categoria A — Ricettivo, dato che è la categoria con il maggior numero di lead già identificati e con l'argomento di vendita più forte — risparmio commissioni booking). Una volta pronto quel template, si personalizza per Fattoria di Mogginano, Agriturismo Fontandrone e Agriturismo Villalba (i tre lead con email verificata già in lista) e si parte con il primo invio.
