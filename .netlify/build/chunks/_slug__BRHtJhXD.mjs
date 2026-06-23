import { t as __exportAll } from "./chunk_BBjsoOtd.mjs";
import { T as createComponent, a as renderComponent, f as renderTemplate, g as maybeRenderHead, w as createAstro } from "./server_CK2A4uq5.mjs";
import "./compiler_Vjjohpm7.mjs";
import { t as $$Layout } from "./Layout_BXGPCtAs.mjs";
import { a as getCategories, c as getProductsByCategory } from "./products_CDyA0NmP.mjs";
import { t as $$ProductCard } from "./ProductCard_DjkkoGLB.mjs";
//#region src/pages/categories/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro-woo.netlify.app");
var $$Slug = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const { slug } = Astro.params;
	const category = (await getCategories()).find((c) => c.slug === slug);
	if (!category) return Astro.redirect("/404");
	const { nodes: products, pageInfo } = await getProductsByCategory(slug, 100);
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${category.name} - Products` }, { "default": async ($$result) => renderTemplate`
  ${maybeRenderHead($$result)}<div class="max-w-7xl mx-auto px-4 py-12"><div class="mb-8 flex items-center justify-between"><h1 class="font-(--font-heading) text-4xl text-(--color-text-base)">${category.name}</h1><p class="text-(--color-text-muted) text-sm">${products.length} results</p></div>${products.length > 0 ? renderTemplate`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">${products.map((p) => {
		let isInStock = true;
		if (typeof p.is_in_stock === "boolean") isInStock = p.is_in_stock;
		else if (typeof p.stockStatus === "string") isInStock = p.stockStatus === "IN STOCK" || p.stockStatus === "IN_STOCK";
		return renderTemplate`${renderComponent($$result, "ProductCard", $$ProductCard, {
			"databaseId": p.databaseId,
			"name": p.name,
			"slug": p.slug,
			"price": p.price,
			"regularPrice": p.regularPrice,
			"salePrice": p.salePrice,
			"image": p.image,
			"isVariable": Array.isArray(p.attributes?.nodes) && p.attributes.nodes.length > 0,
			"isInStock": isInStock
		})}`;
	})}</div>` : renderTemplate`<div class="text-center py-24"><p class="text-(--color-text-muted) text-lg">No products found in this category.</p><a href="/products" class="mt-4 inline-block text-sm text-(--color-btn-cta) hover:underline">Browse all products</a></div>`}</div>
` })}`;
}, "/home/humberto/projects/astro-woo/frontend/src/pages/categories/[slug].astro", void 0);
var $$file = "/home/humberto/projects/astro-woo/frontend/src/pages/categories/[slug].astro";
var $$url = "/categories/[slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/categories/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
