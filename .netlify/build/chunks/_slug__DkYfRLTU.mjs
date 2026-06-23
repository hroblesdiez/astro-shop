import { t as __exportAll } from "./chunk_BBjsoOtd.mjs";
import { S as unescapeHTML, T as createComponent, a as renderComponent, f as renderTemplate, g as maybeRenderHead, n as renderScript, v as addAttribute, w as createAstro, y as defineScriptVars } from "./server_CK2A4uq5.mjs";
import "./compiler_Vjjohpm7.mjs";
import { t as $$Layout } from "./Layout_BXGPCtAs.mjs";
import { o as getProductBySlug } from "./products_CDyA0NmP.mjs";
import { t as rewriteImageUrl } from "./image_BqN4tnwi.mjs";
//#region src/components/product/ProductGallery.astro
createAstro("https://astro-woo.netlify.app");
var $$ProductGallery = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ProductGallery;
	const { image } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div><img id="product-image"${addAttribute(rewriteImageUrl(image?.sourceUrl), "src")}${addAttribute(image?.altText || "", "alt")} class="w-full border border-(--color-border)" width="800" height="800"></div>`;
}, "/home/humberto/projects/astro-woo/frontend/src/components/product/ProductGallery.astro", void 0);
//#endregion
//#region src/lib/price-utils.ts
var extractNumericValue = (price) => {
	if (price === null || price === void 0 || price === "") return null;
	const cleaned = (typeof price === "string" ? price : price.toString()).replace(/[^\d,.-]/g, "").replace(",", ".");
	const numPrice = parseFloat(cleaned);
	return isNaN(numPrice) ? null : numPrice;
};
var formatPrice = (price) => {
	if (price === null || price === void 0 || price === "") return null;
	if (typeof price === "string" && (price.includes("€") || price.match(/\d,\d/))) return price;
	const numPrice = extractNumericValue(price);
	if (numPrice === null) return null;
	return numPrice.toLocaleString("es-ES", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}) + "€";
};
var getSimpleProductPrice = (price, regularPrice, salePrice) => {
	const formattedSalePrice = formatPrice(salePrice);
	const formattedRegularPrice = formatPrice(regularPrice);
	const formattedBasePrice = formatPrice(price);
	const currentPrice = formattedSalePrice || formattedBasePrice;
	return {
		current: currentPrice ?? void 0,
		regular: formattedRegularPrice && formattedRegularPrice !== currentPrice ? formattedRegularPrice : void 0,
		isOnSale: !!formattedSalePrice
	};
};
var getVariableProductPriceRange = (variations) => {
	if (!variations || variations.length === 0) return {};
	const prices = variations.map((v) => {
		return extractNumericValue(v.salePrice) ?? extractNumericValue(v.price);
	}).filter((p) => p !== null).sort((a, b) => a - b);
	if (prices.length === 0) return {};
	const minPrice = prices[0].toLocaleString("es-ES", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});
	const maxPrice = prices[prices.length - 1].toLocaleString("es-ES", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});
	return {
		min: minPrice + "€",
		max: maxPrice + "€",
		isRange: minPrice !== maxPrice
	};
};
//#endregion
//#region src/components/product/ProductInfo.astro
createAstro("https://astro-woo.netlify.app");
var $$ProductInfo = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ProductInfo;
	const { product } = Astro.props;
	const isVariable = product.variations?.nodes && product.variations.nodes.length > 0;
	const priceDisplay = isVariable ? getVariableProductPriceRange(product.variations.nodes) : getSimpleProductPrice(product.price, product.regularPrice, product.salePrice);
	return renderTemplate`${maybeRenderHead($$result)}<div><h1 class="font-(--font-heading) text-4xl text-(--color-text-base)">${product.name}</h1><div id="product-price" class="mt-4 text-2xl font-semibold text-(--color-text-base)">${isVariable ? renderTemplate`<div id="price-range" data-type="variable">${priceDisplay.isRange ? renderTemplate`<span class="text-(--color-btn-cta)">${priceDisplay.min} - ${priceDisplay.max}</span>` : renderTemplate`<span class="text-(--color-btn-cta)">${priceDisplay.min}</span>`}</div>` : renderTemplate`<div id="price-simple" data-type="simple">${priceDisplay.current ? renderTemplate`<div class="flex items-center gap-3"><span class="text-(--color-btn-cta)">${priceDisplay.current}</span>${priceDisplay.regular && renderTemplate`<span class="line-through text-sm text-(--color-text-muted)">${priceDisplay.regular}</span>`}</div>` : renderTemplate`<span class="text-(--color-text-muted)">Price on request</span>`}</div>`}</div><div id="product-stock" class="mt-2 text-sm text-green-600">${product.stockStatus}</div></div>`;
}, "/home/humberto/projects/astro-woo/frontend/src/components/product/ProductInfo.astro", void 0);
//#endregion
//#region src/components/product/ProductVariationSelector.astro
createAstro("https://astro-woo.netlify.app");
var $$ProductVariationSelector = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ProductVariationSelector;
	const { attributes } = Astro.props;
	return renderTemplate`${attributes.length > 0 && renderTemplate`${maybeRenderHead($$result)}<div class="mt-8 flex flex-col gap-6">${attributes.map((attribute) => renderTemplate`<div><label class="block mb-2 text-sm font-medium text-(--color-text-base)">${attribute.label}</label><select class="variation-select w-full border border-(--color-border) bg-white px-4 py-3"${addAttribute(attribute.name, "data-attribute")}><option value="">Select ${attribute.label}</option>${attribute.options.map((option) => renderTemplate`<option${addAttribute(option, "value")}>${option.toUpperCase()}</option>`)}</select></div>`)}</div>`}`;
}, "/home/humberto/projects/astro-woo/frontend/src/components/product/ProductVariationSelector.astro", void 0);
//#endregion
//#region src/components/product/QuantitySelector.astro
createAstro("https://astro-woo.netlify.app");
var $$QuantitySelector = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$QuantitySelector;
	const { min = 1, max = 999, initial = 1 } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="flex items-center gap-3 mt-8"><label for="quantity" class="text-sm font-medium text-(--color-text-base)">Quantity:</label><div class="flex items-center border border-(--color-border) bg-white"><button id="quantity-minus" type="button" class="px-3 py-2 text-(--color-text-base) hover:bg-(--color-border) transition-colors" aria-label="Decrease quantity">−</button><input id="quantity-input" type="number"${addAttribute(min, "min")}${addAttribute(max, "max")}${addAttribute(initial, "value")} class="w-16 text-center border-0 text-(--color-text-base) focus:outline-none focus:ring-2 focus:ring-(--color-btn-cta)"><button id="quantity-plus" type="button" class="px-3 py-2 text-(--color-text-base) hover:bg-(--color-border) transition-colors" aria-label="Increase quantity">+</button></div></div>${renderScript($$result, "/home/humberto/projects/astro-woo/frontend/src/components/product/QuantitySelector.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/humberto/projects/astro-woo/frontend/src/components/product/QuantitySelector.astro", void 0);
//#endregion
//#region src/components/product/PriceSummary.astro
createAstro("https://astro-woo.netlify.app");
var $$PriceSummary = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PriceSummary;
	const { unitPrice } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div id="price-summary" class="mt-6 p-4 bg-(--color-surface) border border-(--color-border)"><div class="space-y-2 text-sm"><div class="flex justify-between text-(--color-text-base)"><span>Unit price:</span><span id="summary-unit-price" class="font-medium">${unitPrice || "Select attributes"}</span></div><div class="flex justify-between text-(--color-text-base)"><span>Quantity:</span><span id="summary-quantity" class="font-medium">1</span></div><div class="border-t border-(--color-border) pt-2 mt-2 flex justify-between text-base font-semibold text-(--color-btn-cta)"><span>Total:</span><span id="summary-total">${unitPrice ? unitPrice : "Select attributes"}</span></div></div></div>${renderScript($$result, "/home/humberto/projects/astro-woo/frontend/src/components/product/PriceSummary.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/humberto/projects/astro-woo/frontend/src/components/product/PriceSummary.astro", void 0);
//#endregion
//#region src/components/product/ProductDescription.astro
createAstro("https://astro-woo.netlify.app");
var $$ProductDescription = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ProductDescription;
	const { html } = Astro.props;
	return renderTemplate`${html && renderTemplate`${maybeRenderHead($$result)}<div class="prose max-w-none mt-10">${unescapeHTML(html)}</div>`}`;
}, "/home/humberto/projects/astro-woo/frontend/src/components/product/ProductDescription.astro", void 0);
//#endregion
//#region src/pages/products/[slug].astro
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
	if (!slug) return Astro.redirect("/products");
	const product = await getProductBySlug(slug);
	if (!product) return Astro.redirect("/products");
	const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "").trim();
	const canonicalURL = Astro.site ? new URL(Astro.url.pathname, Astro.site) : new URL(Astro.url.href);
	const parsePrice = (price) => {
		if (!price) return void 0;
		const cleaned = price.replace(/[^0-9.,]/g, "").replace(",", ".");
		const num = parseFloat(cleaned);
		return isNaN(num) ? void 0 : num;
	};
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Product",
		name: product.name,
		description: stripHtml(product.shortDescription),
		image: rewriteImageUrl(product.image?.sourceUrl),
		...product.sku && { sku: product.sku },
		offers: {
			"@type": "Offer",
			price: parsePrice(product.price),
			priceCurrency: "EUR",
			availability: product.stockStatus === "IN_STOCK" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
			url: canonicalURL.href
		}
	};
	const variationData = (product.variations?.nodes ?? []).map((variation) => ({
		id: variation.databaseId,
		price: variation.price,
		regularPrice: variation.regularPrice,
		salePrice: variation.salePrice,
		stockStatus: variation.stockStatus,
		is_in_stock: variation.stockStatus === "IN_STOCK",
		image: rewriteImageUrl(variation.image?.sourceUrl),
		attributes: Object.fromEntries(variation.attributes.nodes.map((attr) => [attr.name, attr.value]))
	}));
	const isVariable = product.attributes?.nodes && product.attributes.nodes.length > 0;
	const attributesWithFilteredOptions = isVariable ? product.attributes.nodes.map((attr) => {
		const usedValues = /* @__PURE__ */ new Set();
		for (const v of variationData) {
			const val = v.attributes[attr.name];
			if (val !== void 0 && val !== null && val !== "") usedValues.add(val);
		}
		const filteredOptions = usedValues.size > 0 ? attr.options.filter((o) => usedValues.has(o)) : attr.options;
		return {
			...attr,
			options: filteredOptions
		};
	}) : [];
	const productIsInStock = product.stockStatus === "IN_STOCK";
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": product.name,
		"description": stripHtml(product.shortDescription),
		"image": rewriteImageUrl(product.image?.sourceUrl),
		"type": "product"
	}, { "default": async ($$result) => renderTemplate`
  ${maybeRenderHead($$result)}<div class="max-w-7xl mx-auto px-4 py-12"><div class="grid gap-12 lg:grid-cols-2">${renderComponent($$result, "ProductGallery", $$ProductGallery, { "image": product.image })}<div>${renderComponent($$result, "ProductInfo", $$ProductInfo, { "product": product })}${isVariable && renderTemplate`${renderComponent($$result, "ProductVariationSelector", $$ProductVariationSelector, { "attributes": attributesWithFilteredOptions })}`}${renderComponent($$result, "QuantitySelector", $$QuantitySelector, {})}${renderComponent($$result, "PriceSummary", $$PriceSummary, { "unitPrice": !isVariable ? product.price : void 0 })}<button id="add-to-cart"${addAttribute(product.databaseId, "data-product-id")}${addAttribute(isVariable || !productIsInStock, "disabled")}${addAttribute(`w-full mt-8 px-8 py-3 text-white font-medium transition-opacity ${isVariable || !productIsInStock ? "opacity-50 cursor-not-allowed bg-(--color-btn-cart)" : "bg-(--color-btn-cart) hover:opacity-90"}`, "class")}>${!productIsInStock ? "Out of Stock" : "Add To Cart"}</button><a href="/products" class="w-full mt-3 px-8 py-3 font-medium border border-(--color-btn-cart) text-(--color-btn-cart) hover:bg-(--color-btn-cart) hover:text-white transition-colors flex items-center justify-center">Continue Shopping</a>${renderComponent($$result, "ProductDescription", $$ProductDescription, { "html": product.shortDescription })}</div></div></div>

  <script type="application/ld+json">${unescapeHTML(JSON.stringify(jsonLd))}<\/script>${variationData.length > 0 && renderTemplate`<script>(function(){${defineScriptVars({
		variationData,
		attributesWithFilteredOptions
	})}
      function initProductVariations(variationData, attributesWithFilteredOptions) {
        console.log('[ProductVariations] Initializing with', variationData.length, 'variations');

        const selects = document.querySelectorAll('.variation-select');
        const priceElement = document.getElementById('product-price');
        const imageElement = document.getElementById('product-image');
        const stockElement = document.getElementById('product-stock');
        const addToCartBtn = document.getElementById('add-to-cart');

        if (!priceElement || !selects.length) {
          console.warn('[ProductVariations] Product elements not found');
          return;
        }

        console.log('[ProductVariations] Found', selects.length, 'select elements');

        const selectedAttributes = {};

        function extractNumericValue(price) {
          if (price === null || price === undefined || price === "") return null;
          const str = typeof price === "string" ? price : price.toString();
          const cleaned = str.replace(/[^\\d,.-]/g, "").replace(",", ".");
          const numPrice = parseFloat(cleaned);
          return isNaN(numPrice) ? null : numPrice;
        }

        function formatPriceDisplay(price) {
          const numPrice = extractNumericValue(price);
          if (numPrice === null) return null;
          return numPrice.toLocaleString("es-ES", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }) + "€";
        }

        function getPriceHtml(variation) {
          const salePrice = formatPriceDisplay(variation.salePrice);
          const regularPrice = formatPriceDisplay(variation.regularPrice);
          const basePrice = formatPriceDisplay(variation.price);
          const currentPrice = salePrice || basePrice;

          if (!currentPrice) {
            return '<span class="text-(--color-text-muted)">Price on request</span>';
          }

          if (salePrice && regularPrice && salePrice !== regularPrice) {
            return \`
              <div class="flex items-center gap-3">
                <span class="text-(--color-btn-cta)">\${currentPrice}</span>
                <span class="line-through text-sm text-(--color-text-muted)">\${regularPrice}</span>
              </div>
            \`;
          }

          return \`<span class="text-(--color-btn-cta)">\${currentPrice}</span>\`;
        }

        function updateVariation() {
          console.log('[ProductVariations] updateVariation called. Selected attributes:', selectedAttributes);

          const matchingVariation = variationData.find((variation) => {
            return Object.entries(selectedAttributes).every(([key, value]) => {
              return variation.attributes[key] === value;
            });
          });

          if (matchingVariation) {
            console.log('[ProductVariations] Found matching variation:', matchingVariation);

            if (priceElement) {
              const priceDiv = priceElement.querySelector('#price-simple') || priceElement;
              priceDiv.innerHTML = getPriceHtml(matchingVariation);
            }

            if (imageElement && matchingVariation.image) {
              imageElement.src = matchingVariation.image;
              imageElement.alt = Object.values(matchingVariation.attributes).join(' ');
            }

            if (stockElement) {
              const isInStock = matchingVariation.is_in_stock === true;
              stockElement.textContent = isInStock ? 'In Stock' : 'Out of Stock';
              stockElement.className = isInStock ? 'text-green-600' : 'text-red-600';
            }

            if (addToCartBtn) {
              const isInStock = matchingVariation.is_in_stock === true;
              addToCartBtn.dataset.variationId = matchingVariation.id.toString();
              addToCartBtn.dataset.isInStock = isInStock ? 'true' : 'false';
              
              // Construir array de atributos seleccionados
              const selectedAttrsArray = attributesWithFilteredOptions
                .map((attr) => ({
                  attribute: attr.name,
                  value: selectedAttributes[attr.name] || ''
                }))
                .filter((item) => item.value && item.value.trim() !== '');
              
              addToCartBtn.dataset.selectedAttributes = JSON.stringify(selectedAttrsArray);
              console.log('[ProductVariations] Saved selected attributes:', selectedAttrsArray);
              
              if (isInStock) {
                addToCartBtn.disabled = false;
                addToCartBtn.textContent = 'Add To Cart';
                addToCartBtn.classList.remove('opacity-50', 'cursor-not-allowed');
              } else {
                addToCartBtn.disabled = true;
                addToCartBtn.textContent = 'Out of Stock';
                addToCartBtn.classList.add('opacity-50', 'cursor-not-allowed');
              }
            }

            const displayPrice = formatPriceDisplay(matchingVariation.salePrice) || formatPriceDisplay(matchingVariation.price);
            console.log('[ProductVariations] Dispatching variation-selected with price:', displayPrice);

            window.dispatchEvent(new CustomEvent('variation-selected', {
              detail: {
                variationId: matchingVariation.id,
                unitPrice: displayPrice,
              },
            }));
          } else {
            console.log('[ProductVariations] No matching variation found');

            if (addToCartBtn) {
              addToCartBtn.disabled = true;
              addToCartBtn.textContent = 'Select Options';
              addToCartBtn.classList.add('opacity-50', 'cursor-not-allowed');
              addToCartBtn.dataset.selectedAttributes = JSON.stringify([]);
            }

            window.dispatchEvent(new CustomEvent('variation-selected', {
              detail: {
                unitPrice: null,
              },
            }));
          }
        }

        selects.forEach((select) => {
          const attributeName = select.getAttribute('data-attribute');
          console.log('[ProductVariations] Setting up select for attribute:', attributeName);

          select.addEventListener('change', function(e) {
            const value = this.value;
            console.log('[ProductVariations] Select changed -', attributeName, ':', value);

            if (attributeName) {
              if (value) {
                selectedAttributes[attributeName] = value;
              } else {
                delete selectedAttributes[attributeName];
              }

              updateVariation();
            }
          });
        });
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
          initProductVariations(variationData, attributesWithFilteredOptions);
        });
      } else {
        initProductVariations(variationData, attributesWithFilteredOptions);
      }
    })();<\/script>`}${renderScript($$result, "/home/humberto/projects/astro-woo/frontend/src/pages/products/[slug].astro?astro&type=script&index=0&lang.ts")}` })}`;
}, "/home/humberto/projects/astro-woo/frontend/src/pages/products/[slug].astro", void 0);
var $$file = "/home/humberto/projects/astro-woo/frontend/src/pages/products/[slug].astro";
var $$url = "/products/[slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/products/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
