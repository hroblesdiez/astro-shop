import { t as __exportAll } from "./chunk_BBjsoOtd.mjs";
import { s as getProducts } from "./products_CDyA0NmP.mjs";
//#region src/pages/sitemap.xml.ts
var sitemap_xml_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = async ({ site }) => {
	const baseUrl = site?.origin ?? "https://astro-woo.netlify.app";
	const staticPages = [{
		loc: "/",
		priority: "1.0",
		changefreq: "weekly"
	}, {
		loc: "/products",
		priority: "0.8",
		changefreq: "daily"
	}];
	let productPages = [];
	try {
		productPages = ((await getProducts(1e3)).nodes ?? []).map((p) => ({ loc: `/products/${p.slug}` }));
	} catch {}
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticPages, ...productPages].map((u) => `  <url>
    <loc>${baseUrl}${u.loc}</loc>
    <priority>${"priority" in u ? u.priority : "0.7"}</priority>
    <changefreq>${"changefreq" in u ? u.changefreq : "weekly"}</changefreq>
  </url>`).join("\n")}
</urlset>`;
	return new Response(xml, {
		status: 200,
		headers: {
			"Content-Type": "application/xml",
			"Cache-Control": "public, max-age=3600, s-maxage=3600"
		}
	});
};
//#endregion
//#region \0virtual:astro:page:src/pages/sitemap.xml@_@ts
var page = () => sitemap_xml_exports;
//#endregion
export { page };
