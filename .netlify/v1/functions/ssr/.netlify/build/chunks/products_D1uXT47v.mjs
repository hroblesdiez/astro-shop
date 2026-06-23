import { t as __exportAll } from "./chunk_BBjsoOtd.mjs";
import { T as createComponent, a as renderComponent, f as renderTemplate, g as maybeRenderHead, v as addAttribute, w as createAstro } from "./server_CK2A4uq5.mjs";
import "./compiler_Vjjohpm7.mjs";
import { t as $$Layout } from "./Layout_BXGPCtAs.mjs";
import { a as getCategories, l as getProductsFiltered, n as CATS_WITH_SIZE, r as COLORS, t as CATS_WITH_COLOR, u as getSizesForCategory } from "./products_CDyA0NmP.mjs";
import { t as $$ProductCard } from "./ProductCard_DjkkoGLB.mjs";
//#region src/pages/products.astro
var products_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Products,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro-woo.netlify.app");
var $$Products = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Products;
	const url = Astro.url;
	const category = url.searchParams.get("category") ?? void 0;
	const after = url.searchParams.get("after") ?? void 0;
	const minPrice = url.searchParams.get("minPrice") ? Number(url.searchParams.get("minPrice")) : void 0;
	const maxPrice = url.searchParams.get("maxPrice") ? Number(url.searchParams.get("maxPrice")) : void 0;
	const sortParam = url.searchParams.get("sort") ?? "";
	const size = url.searchParams.get("size") ?? void 0;
	const color = url.searchParams.get("color") ?? void 0;
	const showSizeFilter = !!category && CATS_WITH_SIZE.has(category);
	const showColorFilter = !!category && CATS_WITH_COLOR.has(category);
	const sizes = category ? getSizesForCategory(category) : [];
	const orderby = {
		"price-asc": [{
			field: "PRICE",
			order: "ASC"
		}],
		"price-desc": [{
			field: "PRICE",
			order: "DESC"
		}],
		"name-asc": [{
			field: "NAME",
			order: "ASC"
		}],
		"name-desc": [{
			field: "NAME",
			order: "DESC"
		}]
	}[sortParam] ?? void 0;
	const [{ nodes: allProducts, pageInfo }, categories] = await Promise.all([getProductsFiltered({
		first: 100,
		after,
		category,
		minPrice,
		maxPrice,
		orderby
	}), getCategories()]);
	const products = allProducts.filter((p) => {
		if (!size && !color) return true;
		const attrs = p.attributes?.nodes ?? [];
		const sizeMatch = !size || attrs.some((a) => a.name === "pa_size" && a.options.map((o) => o.toLowerCase()).includes(size.toLowerCase()));
		const colorMatch = !color || attrs.some((a) => a.name === "pa_color" && a.options.map((o) => o.toLowerCase()).includes(color.toLowerCase()));
		return sizeMatch && colorMatch;
	});
	function buildUrl(params) {
		const p = new URLSearchParams();
		Object.entries(params).forEach(([k, v]) => {
			if (v) p.set(k, v);
		});
		return `/products${p.toString() ? "?" + p.toString() : ""}`;
	}
	function filterUrl(key, value) {
		return buildUrl({
			category,
			sort: sortParam || void 0,
			minPrice: minPrice?.toString(),
			maxPrice: maxPrice?.toString(),
			size: key === "size" ? value : size,
			color: key === "color" ? value : color,
			after: void 0
		});
	}
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Shop" }, { "default": async ($$result) => renderTemplate`
  ${maybeRenderHead($$result)}<div class="max-w-7xl mx-auto px-4 py-12"><div class="mb-8 flex items-center justify-between"><h1 class="font-(--font-heading) text-4xl text-(--color-text-base)">All Products</h1><p class="text-(--color-text-muted) text-sm">${products.length} results</p></div><!-- Category filter --><div class="mb-6 flex flex-wrap gap-2 border-b border-(--color-border) pb-6"><a${addAttribute(buildUrl({
		sort: sortParam || void 0,
		minPrice: minPrice?.toString(),
		maxPrice: maxPrice?.toString()
	}), "href")}${addAttribute(`px-4 py-2 text-sm border transition-colors ${!category ? "bg-(--color-btn-cta) text-white border-(--color-btn-cta)" : "border-(--color-border) text-(--color-text-muted) hover:border-(--color-btn-cta) hover:text-(--color-btn-cta)"}`, "class")}>All</a>${categories.map((cat) => renderTemplate`<a${addAttribute(buildUrl({
		category: cat.slug,
		sort: sortParam || void 0,
		minPrice: minPrice?.toString(),
		maxPrice: maxPrice?.toString()
	}), "href")}${addAttribute(`px-4 py-2 text-sm border transition-colors ${category === cat.slug ? "bg-(--color-btn-cta) text-white border-(--color-btn-cta)" : "border-(--color-border) text-(--color-text-muted) hover:border-(--color-btn-cta) hover:text-(--color-btn-cta)"}`, "class")}>${cat.name}</a>`)}</div><!-- Size filter (contextual) -->${showSizeFilter && renderTemplate`<div class="mb-4 flex flex-wrap items-center gap-2 border-b border-(--color-border) pb-4"><span class="text-sm text-(--color-text-muted) mr-1">Size:</span><a${addAttribute(filterUrl("size", void 0), "href")}${addAttribute(`px-3 py-1 text-xs border transition-colors ${!size ? "bg-(--color-btn-cta) text-white border-(--color-btn-cta)" : "border-(--color-border) text-(--color-text-muted) hover:border-(--color-btn-cta) hover:text-(--color-btn-cta)"}`, "class")}>All</a>${sizes.map((s) => renderTemplate`<a${addAttribute(filterUrl("size", s), "href")}${addAttribute(`px-3 py-1 text-xs border transition-colors ${size === s ? "bg-(--color-btn-cta) text-white border-(--color-btn-cta)" : "border-(--color-border) text-(--color-text-muted) hover:border-(--color-btn-cta) hover:text-(--color-btn-cta)"}`, "class")}>${s}</a>`)}</div>`}<!-- Color filter (contextual) -->${showColorFilter && renderTemplate`<div class="mb-6 flex flex-wrap items-center gap-2 border-b border-(--color-border) pb-4"><span class="text-sm text-(--color-text-muted) mr-1">Color:</span><a${addAttribute(filterUrl("color", void 0), "href")}${addAttribute(`px-3 py-1 text-xs border transition-colors ${!color ? "bg-(--color-btn-cta) text-white border-(--color-btn-cta)" : "border-(--color-border) text-(--color-text-muted) hover:border-(--color-btn-cta) hover:text-(--color-btn-cta)"}`, "class")}>All</a>${COLORS.map((c) => renderTemplate`<a${addAttribute(filterUrl("color", c), "href")}${addAttribute(`px-3 py-1 text-xs border transition-colors ${color === c ? "bg-(--color-btn-cta) text-white border-(--color-btn-cta)" : "border-(--color-border) text-(--color-text-muted) hover:border-(--color-btn-cta) hover:text-(--color-btn-cta)"}`, "class")}>${c}</a>`)}</div>`}<!-- Sort + Price filters --><div class="mb-8 flex flex-wrap items-center gap-4"><!-- Sort --><div class="flex items-center gap-2"><span class="text-sm text-(--color-text-muted)">Sort:</span><div class="flex gap-2">${[
		{
			label: "Default",
			value: ""
		},
		{
			label: "Price ↑",
			value: "price-asc"
		},
		{
			label: "Price ↓",
			value: "price-desc"
		},
		{
			label: "Name A-Z",
			value: "name-asc"
		},
		{
			label: "Name Z-A",
			value: "name-desc"
		}
	].map(({ label, value }) => renderTemplate`<a${addAttribute(buildUrl({
		category,
		sort: value || void 0,
		minPrice: minPrice?.toString(),
		maxPrice: maxPrice?.toString(),
		size,
		color
	}), "href")}${addAttribute(`px-3 py-1.5 text-xs border transition-colors ${sortParam === value ? "bg-(--color-btn-cta) text-white border-(--color-btn-cta)" : "border-(--color-border) text-(--color-text-muted) hover:border-(--color-btn-cta) hover:text-(--color-btn-cta)"}`, "class")}>${label}</a>`)}</div></div><!-- Price range --><form method="get" action="/products" class="flex items-center gap-2 ml-auto">${category && renderTemplate`<input type="hidden" name="category"${addAttribute(category, "value")}>`}${sortParam && renderTemplate`<input type="hidden" name="sort"${addAttribute(sortParam, "value")}>`}${size && renderTemplate`<input type="hidden" name="size"${addAttribute(size, "value")}>`}${color && renderTemplate`<input type="hidden" name="color"${addAttribute(color, "value")}>`}<span class="text-sm text-(--color-text-muted)">Price:</span><input type="number" name="minPrice" placeholder="Min"${addAttribute(minPrice ?? "", "value")} min="0" class="w-20 px-2 py-1.5 text-xs border border-(--color-border) bg-(--color-surface) outline-none focus:border-(--color-btn-cta) transition-colors"><span class="text-xs text-(--color-text-muted)">—</span><input type="number" name="maxPrice" placeholder="Max"${addAttribute(maxPrice ?? "", "value")} min="0" class="w-20 px-2 py-1.5 text-xs border border-(--color-border) bg-(--color-surface) outline-none focus:border-(--color-btn-cta) transition-colors"><button type="submit" class="px-3 py-1.5 text-xs bg-(--color-btn-cta) text-white hover:bg-(--color-btn-cta-hover) transition-colors">Apply</button>${(minPrice || maxPrice) && renderTemplate`<a${addAttribute(buildUrl({
		category,
		sort: sortParam || void 0,
		size,
		color
	}), "href")} class="px-3 py-1.5 text-xs border border-(--color-border) text-(--color-text-muted) hover:border-(--color-btn-cta) hover:text-(--color-btn-cta) transition-colors">Clear</a>`}</form></div><!-- Grid -->${products.length > 0 ? renderTemplate`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">${products.map((p) => {
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
	})}</div>` : renderTemplate`<div class="text-center py-24"><p class="text-(--color-text-muted) text-lg">No products found.</p><a href="/products" class="mt-4 inline-block text-sm text-(--color-btn-cta) hover:underline">Clear filters</a></div>`}<!-- Pagination -->${pageInfo.hasNextPage && renderTemplate`<div class="text-center mt-12"><a${addAttribute(buildUrl({
		category,
		sort: sortParam || void 0,
		minPrice: minPrice?.toString(),
		maxPrice: maxPrice?.toString(),
		size,
		color,
		after: pageInfo.endCursor
	}), "href")} class="border border-(--color-btn-cta) text-(--color-btn-cta) px-10 py-3 text-sm font-medium tracking-wide hover:bg-(--color-btn-cta) hover:text-white transition-colors inline-block">Load More</a></div>`}</div>
` })}`;
}, "/home/humberto/projects/astro-woo/frontend/src/pages/products.astro", void 0);
var $$file = "/home/humberto/projects/astro-woo/frontend/src/pages/products.astro";
var $$url = "/products";
//#endregion
//#region \0virtual:astro:page:src/pages/products@_@astro
var page = () => products_exports;
//#endregion
export { page };
