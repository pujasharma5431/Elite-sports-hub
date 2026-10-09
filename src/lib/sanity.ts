import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { Jersey } from '../types/jersey';
import { INITIAL_JERSEYS } from '../data/initialJerseys';

export const SANITY_CONFIG = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-01',
  token: process.env.SANITY_API_TOKEN || '',
  useCdn: process.env.NODE_ENV === 'production',
};

export const isSanityConfigured = (projectId?: string) => {
  const pid = projectId || SANITY_CONFIG.projectId;
  return Boolean(pid && pid.trim().length > 3 && pid !== 'your_sanity_project_id');
};

export const getSanityClient = (customConfig?: { projectId?: string; dataset?: string; token?: string }) => {
  const projectId = customConfig?.projectId || SANITY_CONFIG.projectId;
  const dataset = customConfig?.dataset || SANITY_CONFIG.dataset;
  const token = customConfig?.token || SANITY_CONFIG.token;

  if (!isSanityConfigured(projectId)) {
    return null;
  }

  return createClient({
    projectId,
    dataset,
    apiVersion: SANITY_CONFIG.apiVersion,
    useCdn: !token,
    token: token || undefined,
  });
};

const imageBuilder = (client: any) => (client ? imageUrlBuilder(client) : null);

export const urlForImage = (source: any, client?: any) => {
  const cl = client || getSanityClient();
  const builder = imageBuilder(cl);
  return builder ? builder.image(source) : null;
};

// GROQ query to fetch all jerseys ordered by creation or title
export const JERSEYS_QUERY = `*[_type == "jersey"] | order(_createdAt desc) {
  _id,
  id,
  title,
  "slug": slug.current,
  category,
  sport,
  team,
  player,
  playerNumber,
  edition,
  price,
  originalPrice,
  isOnSale,
  isLimitedEdition,
  limitedEditionNumber,
  stock,
  isLowStock,
  sizes,
  gender,
  colors,
  badge,
  "image": image.asset->url,
  "gallery": gallery[].asset->url,
  rating,
  reviewsCount,
  fabric,
  description,
  nepalSpecial
}`;

export async function fetchJerseys(customConfig?: { projectId?: string; dataset?: string }): Promise<Jersey[]> {
  try {
    const pid = customConfig?.projectId || SANITY_CONFIG.projectId || 'cfa5sriy';
    const ds = customConfig?.dataset || SANITY_CONFIG.dataset || 'production';

    // In browser, use server API route to bypass CORS
    if (typeof window !== 'undefined') {
      const res = await fetch(`/api/jerseys?projectId=${encodeURIComponent(pid)}&dataset=${encodeURIComponent(ds)}`);
      if (res.ok) {
        const json = await res.json();
        if (json.jerseys && json.jerseys.length > 0) {
          return json.jerseys;
        }
      }
    }

    const client = getSanityClient(customConfig);
    if (!client) {
      return INITIAL_JERSEYS;
    }

    const data = await client.fetch(JERSEYS_QUERY);
    if (data && Array.isArray(data) && data.length > 0) {
      return data.map((item: any) => ({
        ...item,
        id: item._id || item.id || `sanity-${Math.random()}`,
      }));
    }
    return INITIAL_JERSEYS;
  } catch (error) {
    console.warn('Sanity query fallback to local jerseys:', error);
    return INITIAL_JERSEYS;
  }
}
