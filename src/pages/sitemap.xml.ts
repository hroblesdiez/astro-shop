import type { APIRoute } from 'astro';
import { getProducts } from '../lib/products';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site?.origin ?? 'https://astro-woo.netlify.app';

  const staticPages = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/products', priority: '0.8', changefreq: 'daily' },
  ];

  let productPages: { loc: string }[] = [];
  try {
    const allProducts: { slug: string }[] = [];
    let hasNextPage = true;
    let after: string | undefined;
    while (hasNextPage && allProducts.length < 500) {
      const result = await getProducts(100, after);
      allProducts.push(...(result.nodes ?? []));
      hasNextPage = result.pageInfo?.hasNextPage ?? false;
      after = result.pageInfo?.endCursor;
    }
    productPages = allProducts.map(
      (p: { slug: string }) => ({ loc: `/products/${p.slug}` }),
    );
  } catch {
    // WooCommerce unavailable — serve sitemap with static pages only
  }

  const urls = [...staticPages, ...productPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${baseUrl}${u.loc}</loc>
    <priority>${'priority' in u ? (u as any).priority : '0.7'}</priority>
    <changefreq>${'changefreq' in u ? (u as any).changefreq : 'weekly'}</changefreq>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
};
