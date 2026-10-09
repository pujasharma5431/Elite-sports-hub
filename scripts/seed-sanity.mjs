/**
 * Seed initial jerseys to Sanity CMS
 * Usage: SANITY_API_TOKEN=your_token node scripts/seed-sanity.mjs
 */
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { INITIAL_JERSEYS } from '../src/data/initialJerseys.js';

dotenv.config({ path: '.env.local' });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'cfa5sriy';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.log(`
⚠️  To publish jerseys directly into Sanity project "${projectId}", 
    generate an Editor/Admin token at https://sanity.io/manage and run:
    SANITY_API_TOKEN=your_token node scripts/seed-sanity.mjs
  `);
  process.exit(0);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-03-01',
  useCdn: false,
  token,
});

async function seed() {
  console.log(`Connecting to Sanity project "${projectId}" (${dataset})...`);
  for (const j of INITIAL_JERSEYS) {
    const doc = {
      _id: `jersey-${j.id}`,
      _type: 'jersey',
      title: j.title,
      slug: { _type: 'slug', current: j.slug },
      category: j.category,
      sport: j.sport,
      team: j.team,
      player: j.player,
      playerNumber: j.playerNumber,
      edition: j.edition,
      price: j.price,
      originalPrice: j.originalPrice,
      isOnSale: j.isOnSale,
      isLimitedEdition: j.isLimitedEdition,
      limitedEditionNumber: j.limitedEditionNumber,
      stock: j.stock,
      isLowStock: j.isLowStock,
      sizes: j.sizes,
      gender: j.gender,
      colors: j.colors,
      badge: j.badge,
      rating: j.rating,
      reviewsCount: j.reviewsCount,
      fabric: j.fabric,
      description: j.description,
      nepalSpecial: j.nepalSpecial,
    };

    await client.createOrReplace(doc);
    console.log(`✓ Published: ${j.title}`);
  }
  console.log('🎉 All jerseys successfully seeded to your Sanity project!');
}

seed().catch(console.error);
