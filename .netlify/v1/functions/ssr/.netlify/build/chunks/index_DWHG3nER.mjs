import { t as __exportAll } from "./chunk_BBjsoOtd.mjs";
import { T as createComponent, a as renderComponent, f as renderTemplate, g as maybeRenderHead, v as addAttribute, w as createAstro } from "./server_CK2A4uq5.mjs";
import "./compiler_Vjjohpm7.mjs";
import { t as $$Layout } from "./Layout_BXGPCtAs.mjs";
import { d as getTestimonials, i as getBestsellers } from "./products_CDyA0NmP.mjs";
import { t as $$ProductCard } from "./ProductCard_DjkkoGLB.mjs";
//#region src/components/Hero.astro
var $$Hero = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="bg-(--color-primary) min-h-[600px] flex items-center"><div class="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"><div class="flex flex-col gap-6"><p class="text-sm font-medium tracking-widest uppercase text-(--color-btn-cta)">New Collection 2025</p><h1 class="font-(--font-heading) text-5xl leading-tight text-(--color-text-base)">Discover Products <br>for Every Lifestyle</h1><p class="text-(--color-text-muted) text-lg leading-relaxed max-w-md">Explore our curated selection of premium products across fashion, tech, home and more. Quality you can trust, prices you'll love.</p><div class="flex items-center gap-4 mt-2"><a href="/products" class="bg-(--color-btn-cta) text-white px-8 py-3 text-sm font-medium tracking-wide hover:bg-(--color-btn-cta-hover) transition-colors">Shop Now</a></div></div><div class="relative flex justify-center items-center"><img src="/images/categories/hero.jpg" alt="Shop our latest collection" class="w-full max-w-lg object-cover rounded-sm shadow-lg" loading="eager" width="600" height="700"></div></div></section>`;
}, "/home/humberto/projects/astro-woo/frontend/src/components/Hero.astro", void 0);
//#endregion
//#region src/components/Bestsellers.astro
createAstro("https://astro-woo.netlify.app");
var $$Bestsellers = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Bestsellers;
	const { products } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section id="bestsellers" class="py-(--spacing-section) bg-(--color-background)"><div class="max-w-7xl mx-auto px-4"><div class="text-center mb-12"><h2 class="font-(--font-heading) text-4xl text-(--color-text-base) mb-3">Bestsellers</h2><p class="text-(--color-text-muted) text-sm">Our most-loved products, handpicked for you</p></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">${products.map((product) => renderTemplate`${renderComponent($$result, "ProductCard", $$ProductCard, {
		"databaseId": product.databaseId,
		"name": product.name,
		"slug": product.slug,
		"price": product.price,
		"regularPrice": product.regularPrice,
		"salePrice": product.salePrice,
		"image": product.image,
		"isVariable": Array.isArray(product.attributes?.nodes) && product.attributes.nodes.length > 0
	})}`)}</div><div class="text-center mt-12"><a href="/products" class="border border-(--color-btn-cta) text-(--color-btn-cta) px-10 py-3 text-sm font-medium tracking-wide hover:bg-(--color-btn-cta) hover:text-white transition-colors">View All Products</a></div></div></section>`;
}, "/home/humberto/projects/astro-woo/frontend/src/components/Bestsellers.astro", void 0);
//#endregion
//#region src/components/CategoryGrid.astro
var $$CategoryGrid = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="py-(--spacing-section) bg-(--color-primary)"><div class="max-w-7xl mx-auto px-4"><div class="text-center mb-12"><h2 class="font-(--font-heading) text-4xl text-(--color-text-base) mb-3">Shop by Category</h2><p class="text-(--color-text-muted) text-sm">Find exactly what you're looking for</p></div><div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">${[
		{
			name: "Kitchen Accessories",
			slug: "kitchen-accessories",
			image: "/images/categories/kitchen.jpg"
		},
		{
			name: "Groceries",
			slug: "groceries",
			image: "/images/categories/groceries.jpg"
		},
		{
			name: "Sports Accessories",
			slug: "sports-accessories",
			image: "/images/categories/sport_accesories.jpg"
		},
		{
			name: "Smartphones",
			slug: "smartphones",
			image: "/images/categories/smartphones.jpg"
		},
		{
			name: "Mobile Accessories",
			slug: "mobile-accessories",
			image: "/images/categories/mobile_accesories.jpg"
		},
		{
			name: "Men's Watches",
			slug: "mens-watches",
			image: "/images/categories/men_watches.jpg"
		},
		{
			name: "Fragrances",
			slug: "fragrances",
			image: "/images/categories/fragances.jpg"
		},
		{
			name: "Women's Watches",
			slug: "womens-watches",
			image: "/images/categories/women_watches.jpg"
		},
		{
			name: "Women's Shoes",
			slug: "womens-shoes",
			image: "/images/categories/women_shoes.jpg"
		},
		{
			name: "Women's Dresses",
			slug: "womens-dresses",
			image: "/images/categories/women_dresses.jpg"
		},
		{
			name: "Women's Bags",
			slug: "womens-bags",
			image: "/images/categories/women_bags.jpg"
		},
		{
			name: "Vehicle",
			slug: "vehicle",
			image: "/images/categories/vehicle.jpg"
		},
		{
			name: "Tops",
			slug: "tops",
			image: "/images/categories/tops.jpg"
		},
		{
			name: "Sunglasses",
			slug: "sunglasses",
			image: "/images/categories/sunglasses.jpg"
		},
		{
			name: "Motorcycle",
			slug: "motorcycle",
			image: "/images/categories/motorcycle.jpg"
		},
		{
			name: "Men's Shoes",
			slug: "mens-shoes",
			image: "/images/categories/men_shoes.jpg"
		},
		{
			name: "Men's Shirts",
			slug: "mens-shirts",
			image: "/images/categories/men_shirts.jpg"
		},
		{
			name: "Laptops",
			slug: "laptops",
			image: "/images/categories/laptops.jpg"
		},
		{
			name: "Home Decoration",
			slug: "home-decoration",
			image: "/images/categories/home_deco.jpg"
		},
		{
			name: "Furniture",
			slug: "furniture",
			image: "/images/categories/furniture.jpg"
		},
		{
			name: "Beauty",
			slug: "beauty",
			image: "/images/categories/beauty.jpg"
		},
		{
			name: "Skin Care",
			slug: "skin-care",
			image: "/images/categories/skin-care.jpg"
		},
		{
			name: "Tablets",
			slug: "tablets",
			image: "/images/categories/tablets.jpg"
		},
		{
			name: "Women's Jewellery",
			slug: "womens-jewellery",
			image: "/images/categories/jewellery.jpg"
		}
	].map(({ name, slug, image }) => renderTemplate`<a${addAttribute(`/categories/${slug}`, "href")} class="group relative overflow-hidden aspect-square bg-(--color-surface)"><img${addAttribute(image, "src")}${addAttribute(name, "alt")} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width="300" height="300"><div class="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div><div class="absolute inset-0 flex flex-col justify-end p-3"><p class="text-white text-xs font-medium leading-tight">${name}</p></div></a>`)}</div></div></section>`;
}, "/home/humberto/projects/astro-woo/frontend/src/components/CategoryGrid.astro", void 0);
//#endregion
//#region src/components/Testimonials.astro
createAstro("https://astro-woo.netlify.app");
var $$Testimonials = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Testimonials;
	const { testimonials } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section class="py-(--spacing-section) bg-(--color-background)"><div class="max-w-7xl mx-auto px-4"><div class="text-center mb-12"><h2 class="font-(--font-heading) text-4xl text-(--color-text-base) mb-3">Loved by Our Community</h2><p class="text-(--color-text-muted) text-sm">Real reviews from real customers</p></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">${testimonials.map(({ testimonialFields }) => renderTemplate`<div class="bg-(--color-surface) border border-(--color-border) p-6 flex flex-col gap-4"><div class="flex gap-0.5">${Array.from({ length: testimonialFields.rating }).map(() => renderTemplate`<span class="text-(--color-btn-cart) text-sm">★</span>`)}</div><p class="text-(--color-text-muted) text-sm leading-relaxed">"${testimonialFields.text}"</p><div class="mt-auto"><p class="text-sm font-medium text-(--color-text-base)">${testimonialFields.authorName}</p><p class="text-xs text-(--color-text-muted)">${testimonialFields.product}</p></div></div>`)}</div></div></section>`;
}, "/home/humberto/projects/astro-woo/frontend/src/components/Testimonials.astro", void 0);
//#endregion
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const [products, testimonials] = await Promise.all([getBestsellers(4), getTestimonials()]);
	console.log("bestsellers:", JSON.stringify(products, null, 2));
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Home" }, { "default": async ($$result) => renderTemplate`
  ${renderComponent($$result, "Hero", $$Hero, {})}
  ${renderComponent($$result, "Bestsellers", $$Bestsellers, { "products": products })}
  ${renderComponent($$result, "CategoryGrid", $$CategoryGrid, {})}
  ${renderComponent($$result, "Testimonials", $$Testimonials, { "testimonials": testimonials })}
` })}`;
}, "/home/humberto/projects/astro-woo/frontend/src/pages/index.astro", void 0);
var $$file = "/home/humberto/projects/astro-woo/frontend/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
