import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';
import { INITIAL_JERSEYS } from '@/data/initialJerseys';
import { JERSEYS_QUERY } from '@/lib/sanity';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get('projectId') || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'cfa5sriy';
  const dataset = searchParams.get('dataset') || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

  if (!projectId || projectId === 'your_sanity_project_id') {
    return NextResponse.json({ jerseys: INITIAL_JERSEYS, source: 'local' });
  }

  try {
    const client = createClient({
      projectId,
      dataset,
      apiVersion: '2024-03-01',
      useCdn: true,
    });

    const data = await client.fetch(JERSEYS_QUERY);
    if (data && Array.isArray(data) && data.length > 0) {
      return NextResponse.json({
        jerseys: data.map((item: any) => ({
          ...item,
          id: item._id || item.id || `sanity-${Math.random()}`,
        })),
        source: 'sanity',
      });
    }

    // Dataset is connected but empty, return full initial inventory
    return NextResponse.json({
      jerseys: INITIAL_JERSEYS,
      source: 'sanity-empty-fallback',
      message: 'Connected to Sanity. No jerseys created in Sanity yet, showing store initial catalog.',
    });
  } catch (error: any) {
    console.error('Server Sanity fetch error:', error);
    return NextResponse.json({
      jerseys: INITIAL_JERSEYS,
      source: 'local-error-fallback',
      error: error.message,
    });
  }
}
