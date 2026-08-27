import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Ogni lead è un file .json in src/content/leads/<slug>.json.
// Il nome del file deve coincidere con il campo "slug" al suo interno:
// è quello slug (non il nome del file) a determinare l'URL /demo/<slug>.
const leads = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/leads' }),
  schema: z.object({
    slug: z.string(),
    // Aggiungi qui il valore della nuova categoria quando la implementi
    // (vedi README.md, sezione "Aggiungere una categoria").
    category: z.enum(['ricettivo', 'artigiani', 'beauty', 'b2b-artigianato', 'gastronomia']),

    businessName: z.string(),
    tagline: z.string(),
    heroImage: z.string(),
    colors: z.object({
      primary: z.string(),
      secondary: z.string(),
      accent: z.string(),
    }),
    description: z.string(),
    aboutImage: z.string().optional(),
    aboutQuote: z
      .object({
        text: z.string(),
        author: z.string(),
      })
      .optional(),
    stats: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
        }),
      )
      .max(4)
      .optional(),
    badge: z.string().optional(),
    serviceArea: z.array(z.string()).optional(),
    hours: z
      .array(
        z.object({
          day: z.string(),
          time: z.string(),
        }),
      )
      .optional(),

    services: z
      .array(
        z.object({
          name: z.string(),
          description: z.string(),
          price: z.string().optional(),
          image: z.string().optional(),
          group: z.string().optional(),
        }),
      )
      .default([]),
    servicesTitle: z.string().optional(),
    servicesSubtitle: z.string().optional(),

    gallery: z.array(z.string()).default([]),
    galleryTitle: z.string().optional(),
    beforeAfter: z
      .array(
        z.object({
          before: z.string(),
          after: z.string(),
          label: z.string().optional(),
        }),
      )
      .optional(),

    reviews: z
      .array(
        z.object({
          text: z.string(),
          author: z.string(),
          rating: z.number().min(1).max(5).optional(),
        }),
      )
      .default([]),

    contact: z.object({
      address: z.string(),
      phone: z.string(),
      email: z.string(),
      whatsapp: z.string(),
      mapEmbed: z.string().optional(),
    }),

    ctaText: z.string(),
    formTitle: z.string().optional(),
    formSubtitle: z.string().optional(),

    seo: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = { leads };
