import { t as __exportAll } from "./chunk_BBjsoOtd.mjs";
import { T as createComponent, a as renderComponent, f as renderTemplate, g as maybeRenderHead, n as renderScript, v as addAttribute, w as createAstro, y as defineScriptVars } from "./server_CK2A4uq5.mjs";
import "./compiler_Vjjohpm7.mjs";
import { n as countryRequiresState, t as COUNTRY_STATES } from "./country-states__tNp6GpS.mjs";
import { t as $$Layout } from "./Layout_BXGPCtAs.mjs";
//#region src/components/checkout/BillingForm.astro
createAstro("https://astro-woo.netlify.app");
var $$BillingForm = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BillingForm;
	const { initialData = {}, errors = {} } = Astro.props;
	const countries = [
		"PL",
		"DE",
		"FR",
		"GB",
		"IT",
		"ES"
	];
	const selectedCountry = initialData.country || "PL";
	const inputClass = "w-full px-3 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-sm)] text-sm text-[var(--color-text-base)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-btn-cta)] focus:border-[var(--color-btn-cta)] transition-colors aria-invalid:border-red-500 aria-invalid:focus:ring-red-300 disabled:bg-[var(--color-primary)] disabled:text-[var(--color-text-muted)] disabled:cursor-not-allowed";
	const labelClass = "block text-sm font-medium text-[var(--color-text-base)] mb-1.5";
	const errorClass = "text-xs text-red-600 mt-1.5";
	return renderTemplate`${maybeRenderHead($$result)}<div class="billing-form bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6 sm:p-8" data-form="billing"${addAttribute(JSON.stringify(COUNTRY_STATES), "data-country-states")}><fieldset><legend class="font-heading text-xl text-[var(--color-text-base)] mb-6 pb-4 border-b border-[var(--color-border)] w-full">Billing Address</legend><label class="flex items-center gap-2 mb-6 text-sm text-[var(--color-text-base)] cursor-pointer"><input type="checkbox" id="billing-same-as-shipping" class="w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-btn-cta)] focus:ring-[var(--color-btn-cta)]">Billing address same as shipping</label><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4"><div><label for="billing-firstName"${addAttribute(labelClass, "class")}>First Name<span class="text-red-600" aria-label="required">*</span></label><input type="text" id="billing-firstName" name="billing.firstName"${addAttribute(initialData.firstName || "", "value")} required${addAttribute(!!errors["billing.firstName"], "aria-invalid")}${addAttribute(errors["billing.firstName"] ? "billing-firstName-error" : void 0, "aria-describedby")}${addAttribute(inputClass, "class")}>${errors["billing.firstName"] && renderTemplate`<p id="billing-firstName-error"${addAttribute(errorClass, "class")}>${errors["billing.firstName"]}</p>`}</div><div><label for="billing-lastName"${addAttribute(labelClass, "class")}>Last Name<span class="text-red-600" aria-label="required">*</span></label><input type="text" id="billing-lastName" name="billing.lastName"${addAttribute(initialData.lastName || "", "value")} required${addAttribute(!!errors["billing.lastName"], "aria-invalid")}${addAttribute(errors["billing.lastName"] ? "billing-lastName-error" : void 0, "aria-describedby")}${addAttribute(inputClass, "class")}>${errors["billing.lastName"] && renderTemplate`<p id="billing-lastName-error"${addAttribute(errorClass, "class")}>${errors["billing.lastName"]}</p>`}</div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4"><div><label for="billing-email"${addAttribute(labelClass, "class")}>Email<span class="text-red-600" aria-label="required">*</span></label><input type="email" id="billing-email" name="billing.email"${addAttribute(initialData.email || "", "value")} required${addAttribute(!!errors["billing.email"], "aria-invalid")}${addAttribute(errors["billing.email"] ? "billing-email-error" : void 0, "aria-describedby")}${addAttribute(inputClass, "class")}>${errors["billing.email"] && renderTemplate`<p id="billing-email-error"${addAttribute(errorClass, "class")}>${errors["billing.email"]}</p>`}</div><div><label for="billing-phone"${addAttribute(labelClass, "class")}>Phone (Optional)</label><input type="tel" id="billing-phone" name="billing.phone"${addAttribute(initialData.phone || "", "value")}${addAttribute(inputClass, "class")}></div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4"><div><label for="billing-country"${addAttribute(labelClass, "class")}>Country<span class="text-red-600" aria-label="required">*</span></label><select id="billing-country" name="billing.country" required${addAttribute(!!errors["billing.country"], "aria-invalid")}${addAttribute(errors["billing.country"] ? "billing-country-error" : void 0, "aria-describedby")}${addAttribute(inputClass, "class")}>${countries.map((code) => renderTemplate`<option${addAttribute(code, "value")}${addAttribute(selectedCountry === code, "selected")}>${code}</option>`)}</select>${errors["billing.country"] && renderTemplate`<p id="billing-country-error"${addAttribute(errorClass, "class")}>${errors["billing.country"]}</p>`}</div><div id="billing-state-wrapper"${addAttribute(countryRequiresState(selectedCountry) ? "" : "display:none", "style")}><label for="billing-state"${addAttribute(labelClass, "class")}>Province / State<span class="text-red-600" aria-label="required">*</span></label><select id="billing-state" name="billing.state"${addAttribute(!!errors["billing.state"], "aria-invalid")}${addAttribute(errors["billing.state"] ? "billing-state-error" : void 0, "aria-describedby")}${addAttribute(inputClass, "class")}><option value="">Select…</option>${(COUNTRY_STATES[selectedCountry] || []).map((s) => renderTemplate`<option${addAttribute(s.code, "value")}${addAttribute(initialData.state === s.code, "selected")}>${s.name}</option>`)}</select>${errors["billing.state"] && renderTemplate`<p id="billing-state-error"${addAttribute(errorClass, "class")}>${errors["billing.state"]}</p>`}</div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4"><div><label for="billing-address1"${addAttribute(labelClass, "class")}>Address Line 1<span class="text-red-600" aria-label="required">*</span></label><input type="text" id="billing-address1" name="billing.address1"${addAttribute(initialData.address1 || "", "value")} required${addAttribute(!!errors["billing.address1"], "aria-invalid")}${addAttribute(errors["billing.address1"] ? "billing-address1-error" : void 0, "aria-describedby")}${addAttribute(inputClass, "class")}>${errors["billing.address1"] && renderTemplate`<p id="billing-address1-error"${addAttribute(errorClass, "class")}>${errors["billing.address1"]}</p>`}</div><div><label for="billing-address2"${addAttribute(labelClass, "class")}>Address Line 2 (Optional)</label><input type="text" id="billing-address2" name="billing.address2"${addAttribute(initialData.address2 || "", "value")}${addAttribute(inputClass, "class")}></div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label for="billing-city"${addAttribute(labelClass, "class")}>City<span class="text-red-600" aria-label="required">*</span></label><input type="text" id="billing-city" name="billing.city"${addAttribute(initialData.city || "", "value")} required${addAttribute(!!errors["billing.city"], "aria-invalid")}${addAttribute(errors["billing.city"] ? "billing-city-error" : void 0, "aria-describedby")}${addAttribute(inputClass, "class")}>${errors["billing.city"] && renderTemplate`<p id="billing-city-error"${addAttribute(errorClass, "class")}>${errors["billing.city"]}</p>`}</div><div><label for="billing-postcode"${addAttribute(labelClass, "class")}>Postal Code<span class="text-red-600" aria-label="required">*</span></label><input type="text" id="billing-postcode" name="billing.postcode"${addAttribute(initialData.postcode || "", "value")} placeholder="XX-XXX" required${addAttribute(!!errors["billing.postcode"], "aria-invalid")}${addAttribute(errors["billing.postcode"] ? "billing-postcode-error" : void 0, "aria-describedby")}${addAttribute(inputClass, "class")}>${errors["billing.postcode"] && renderTemplate`<p id="billing-postcode-error"${addAttribute(errorClass, "class")}>${errors["billing.postcode"]}</p>`}</div></div></fieldset></div>${renderScript($$result, "/home/humberto/projects/astro-woo/frontend/src/components/checkout/BillingForm.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/humberto/projects/astro-woo/frontend/src/components/checkout/BillingForm.astro", void 0);
//#endregion
//#region src/components/checkout/ShippingForm.astro
createAstro("https://astro-woo.netlify.app");
var $$ShippingForm = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ShippingForm;
	const { initialData = {}, errors = {} } = Astro.props;
	const countries = [
		"PL",
		"DE",
		"FR",
		"GB",
		"IT",
		"ES"
	];
	const selectedCountry = initialData.country || "PL";
	const inputClass = "w-full px-3 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-sm)] text-sm text-[var(--color-text-base)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-btn-cta)] focus:border-[var(--color-btn-cta)] transition-colors aria-invalid:border-red-500 aria-invalid:focus:ring-red-300";
	const labelClass = "block text-sm font-medium text-[var(--color-text-base)] mb-1.5";
	const errorClass = "text-xs text-red-600 mt-1.5";
	return renderTemplate`${maybeRenderHead($$result)}<div class="shipping-form bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6 sm:p-8" data-form="shipping"${addAttribute(JSON.stringify(COUNTRY_STATES), "data-country-states")}><fieldset><legend class="font-heading text-xl text-[var(--color-text-base)] mb-6 pb-4 border-b border-[var(--color-border)] w-full">Shipping Address</legend><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4"><div><label for="shipping-firstName"${addAttribute(labelClass, "class")}>First Name<span class="text-red-600" aria-label="required">*</span></label><input type="text" id="shipping-firstName" name="shipping.firstName"${addAttribute(initialData.firstName || "", "value")} required${addAttribute(!!errors["shipping.firstName"], "aria-invalid")}${addAttribute(errors["shipping.firstName"] ? "shipping-firstName-error" : void 0, "aria-describedby")}${addAttribute(inputClass, "class")}>${errors["shipping.firstName"] && renderTemplate`<p id="shipping-firstName-error"${addAttribute(errorClass, "class")}>${errors["shipping.firstName"]}</p>`}</div><div><label for="shipping-lastName"${addAttribute(labelClass, "class")}>Last Name<span class="text-red-600" aria-label="required">*</span></label><input type="text" id="shipping-lastName" name="shipping.lastName"${addAttribute(initialData.lastName || "", "value")} required${addAttribute(!!errors["shipping.lastName"], "aria-invalid")}${addAttribute(errors["shipping.lastName"] ? "shipping-lastName-error" : void 0, "aria-describedby")}${addAttribute(inputClass, "class")}>${errors["shipping.lastName"] && renderTemplate`<p id="shipping-lastName-error"${addAttribute(errorClass, "class")}>${errors["shipping.lastName"]}</p>`}</div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4"><div><label for="shipping-country"${addAttribute(labelClass, "class")}>Country<span class="text-red-600" aria-label="required">*</span></label><select id="shipping-country" name="shipping.country" required${addAttribute(!!errors["shipping.country"], "aria-invalid")}${addAttribute(errors["shipping.country"] ? "shipping-country-error" : void 0, "aria-describedby")}${addAttribute(inputClass, "class")}>${countries.map((code) => renderTemplate`<option${addAttribute(code, "value")}${addAttribute(selectedCountry === code, "selected")}>${code}</option>`)}</select>${errors["shipping.country"] && renderTemplate`<p id="shipping-country-error"${addAttribute(errorClass, "class")}>${errors["shipping.country"]}</p>`}</div><div id="shipping-state-wrapper"${addAttribute(countryRequiresState(selectedCountry) ? "" : "display:none", "style")}><label for="shipping-state"${addAttribute(labelClass, "class")}>Province / State<span class="text-red-600" aria-label="required">*</span></label><select id="shipping-state" name="shipping.state"${addAttribute(!!errors["shipping.state"], "aria-invalid")}${addAttribute(errors["shipping.state"] ? "shipping-state-error" : void 0, "aria-describedby")}${addAttribute(inputClass, "class")}><option value="">Select…</option>${(COUNTRY_STATES[selectedCountry] || []).map((s) => renderTemplate`<option${addAttribute(s.code, "value")}${addAttribute(initialData.state === s.code, "selected")}>${s.name}</option>`)}</select>${errors["shipping.state"] && renderTemplate`<p id="shipping-state-error"${addAttribute(errorClass, "class")}>${errors["shipping.state"]}</p>`}</div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4"><div><label for="shipping-address1"${addAttribute(labelClass, "class")}>Address Line 1<span class="text-red-600" aria-label="required">*</span></label><input type="text" id="shipping-address1" name="shipping.address1"${addAttribute(initialData.address1 || "", "value")} required${addAttribute(!!errors["shipping.address1"], "aria-invalid")}${addAttribute(errors["shipping.address1"] ? "shipping-address1-error" : void 0, "aria-describedby")}${addAttribute(inputClass, "class")}>${errors["shipping.address1"] && renderTemplate`<p id="shipping-address1-error"${addAttribute(errorClass, "class")}>${errors["shipping.address1"]}</p>`}</div><div><label for="shipping-address2"${addAttribute(labelClass, "class")}>Address Line 2 (Optional)</label><input type="text" id="shipping-address2" name="shipping.address2"${addAttribute(initialData.address2 || "", "value")}${addAttribute(inputClass, "class")}></div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label for="shipping-city"${addAttribute(labelClass, "class")}>City<span class="text-red-600" aria-label="required">*</span></label><input type="text" id="shipping-city" name="shipping.city"${addAttribute(initialData.city || "", "value")} required${addAttribute(!!errors["shipping.city"], "aria-invalid")}${addAttribute(errors["shipping.city"] ? "shipping-city-error" : void 0, "aria-describedby")}${addAttribute(inputClass, "class")}>${errors["shipping.city"] && renderTemplate`<p id="shipping-city-error"${addAttribute(errorClass, "class")}>${errors["shipping.city"]}</p>`}</div><div><label for="shipping-postcode"${addAttribute(labelClass, "class")}>Postal Code<span class="text-red-600" aria-label="required">*</span></label><input type="text" id="shipping-postcode" name="shipping.postcode"${addAttribute(initialData.postcode || "", "value")} placeholder="XX-XXX" required${addAttribute(!!errors["shipping.postcode"], "aria-invalid")}${addAttribute(errors["shipping.postcode"] ? "shipping-postcode-error" : void 0, "aria-describedby")}${addAttribute(inputClass, "class")}>${errors["shipping.postcode"] && renderTemplate`<p id="shipping-postcode-error"${addAttribute(errorClass, "class")}>${errors["shipping.postcode"]}</p>`}</div></div></fieldset></div>${renderScript($$result, "/home/humberto/projects/astro-woo/frontend/src/components/checkout/ShippingForm.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/humberto/projects/astro-woo/frontend/src/components/checkout/ShippingForm.astro", void 0);
//#endregion
//#region src/components/checkout/OrderReview.astro
createAstro("https://astro-woo.netlify.app");
var $$OrderReview = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$OrderReview;
	const { cart } = Astro.props;
	const minorUnit = Number(cart.totals?.currency_minor_unit ?? 2);
	const currencyCode = cart.totals?.currency_code || "PLN";
	const formatPrice = (price) => {
		const value = (typeof price === "string" ? parseFloat(price) : price) / Math.pow(10, minorUnit);
		return new Intl.NumberFormat("pl-PL", {
			style: "currency",
			currency: currencyCode
		}).format(value);
	};
	const taxRate = cart.totals.tax_lines?.[0]?.rate?.toString().replace("%", "") || "0";
	return renderTemplate`${maybeRenderHead($$result)}<div class="order-review"><div class="bg-[var(--color-primary)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6"><h2 class="font-heading text-xl text-[var(--color-text-base)] mb-6 pb-4 border-b border-[var(--color-border)]">Order Summary</h2><div class="space-y-4 mb-6 pb-6 border-b border-[var(--color-border)]">${cart.items.map((item) => renderTemplate`<div class="flex justify-between items-start"><div class="flex-1"><p class="font-medium text-sm text-[var(--color-text-base)]">${item.name}</p><p class="text-xs text-[var(--color-text-muted)] mt-1">Qty: ${item.quantity}</p>${item.variation && item.variation.length > 0 && renderTemplate`<div class="text-xs text-[var(--color-text-muted)] mt-1">${item.variation.map((v) => renderTemplate`<p${addAttribute(v.attribute, "key")}>${v.attribute}: ${v.value}</p>`)}</div>`}</div><p class="font-medium text-sm text-[var(--color-text-base)] ml-4 whitespace-nowrap">${formatPrice(item.totals.line_total)}</p></div>`)}</div><div class="space-y-3 mb-6 pb-6 border-b border-[var(--color-border)]"><div class="flex justify-between text-sm"><span class="text-[var(--color-text-muted)]">Subtotal</span><span class="text-[var(--color-text-base)]">${formatPrice(cart.totals.total_items)}</span></div>${cart.coupons && cart.coupons.length > 0 && renderTemplate`<div class="flex justify-between text-sm text-emerald-600"><span class="font-medium">Discount (${cart.coupons.map((c) => c.code).join(", ")})</span><span>-${formatPrice(cart.totals.total_discount)}</span></div>`}${parseFloat(cart.totals.total_tax) > 0 && renderTemplate`<div class="flex justify-between text-sm"><span class="text-[var(--color-text-muted)]">Taxes (${taxRate}%)</span><span class="text-[var(--color-text-base)]">${formatPrice(cart.totals.total_tax)}</span></div>`}${cart.needs_shipping && renderTemplate`<div class="flex justify-between text-sm"><span class="text-[var(--color-text-muted)]">Shipping</span>${parseFloat(cart.totals.total_shipping) > 0 ? renderTemplate`<span class="text-[var(--color-text-base)]">${formatPrice(cart.totals.total_shipping)}</span>` : renderTemplate`<span class="text-amber-700">Not calculated yet</span>`}</div>`}</div><div class="flex justify-between items-baseline mb-4"><span class="font-heading text-lg text-[var(--color-text-base)]">Total</span><span class="font-heading text-2xl text-[var(--color-text-base)]">${formatPrice(cart.totals.total_price)}</span></div><!-- Country Info --><div id="order-country-info" class="text-xs text-[var(--color-text-muted)] text-center pt-4 border-t border-[var(--color-border)]"><!-- Populated by client-side script --></div>${cart.errors && cart.errors.length > 0 && renderTemplate`<div class="mt-6 p-4 bg-red-50 border border-red-200 rounded-[var(--radius-md)]"><p class="text-sm font-medium text-red-800 mb-2">Errors:</p><ul class="text-sm text-red-700 space-y-1">${cart.errors.map((error, idx) => renderTemplate`<li${addAttribute(idx, "key")}>• ${error.message || "An error occurred"}</li>`)}</ul></div>`}</div></div>${renderScript($$result, "/home/humberto/projects/astro-woo/frontend/src/components/checkout/OrderReview.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/humberto/projects/astro-woo/frontend/src/components/checkout/OrderReview.astro", void 0);
//#endregion
//#region src/components/checkout/StripePaymentElement.astro
var $$StripePaymentElement = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<div id="stripe-payment-element-container" class="mt-6"></div>${renderScript($$result, "/home/humberto/projects/astro-woo/frontend/src/components/checkout/StripePaymentElement.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/humberto/projects/astro-woo/frontend/src/components/checkout/StripePaymentElement.astro", void 0);
//#endregion
//#region src/components/checkout/CheckoutForm.astro
createAstro("https://astro-woo.netlify.app");
var $$CheckoutForm = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$CheckoutForm;
	const { cart, storeNonce = "" } = Astro.props;
	const amountInCents = parseInt(cart.totals.total_price, 10);
	return renderTemplate`${maybeRenderHead($$result)}<div class="checkout-form-wrapper" data-checkout-form><div class="max-w-7xl mx-auto px-4 py-12"><h1 class="text-3xl font-bold text-[var(--color-text-base)] mb-12">Checkout</h1><form id="checkout-form" class="grid gap-8 lg:grid-cols-3 lg:gap-12"><div class="lg:col-span-2 space-y-6"><div id="errors-container" role="alert" aria-live="polite"></div>${renderComponent($$result, "ShippingForm", $$ShippingForm, {})}${renderComponent($$result, "BillingForm", $$BillingForm, {})}<div class="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6 sm:p-8"><fieldset><legend class="font-heading text-xl text-[var(--color-text-base)] mb-6 pb-4 border-b border-[var(--color-border)] w-full">Payment Method</legend><div id="stripe-wrapper">${renderComponent($$result, "StripePaymentElement", $$StripePaymentElement, {})}</div></fieldset></div><div class="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6 sm:p-8"><fieldset><legend class="font-heading text-xl text-[var(--color-text-base)] mb-6 pb-4 border-b border-[var(--color-border)] w-full">Additional Information</legend><div><label for="order-notes" class="block text-sm font-medium text-[var(--color-text-base)] mb-1.5">Order Notes (Optional)</label><textarea id="order-notes" name="orderNotes" rows="4" placeholder="Special instructions..." class="w-full px-3 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-sm)] text-sm text-[var(--color-text-base)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-btn-cta)] focus:border-[var(--color-btn-cta)] transition-colors"></textarea></div></fieldset></div><div class="flex sm:justify-end"><button type="submit" id="checkout-submit" class="w-full sm:w-auto sm:min-w-[260px] px-8 py-3.5 bg-[var(--color-btn-cart)] text-white font-medium text-base rounded-[var(--radius-md)] shadow-sm hover:brightness-95 active:brightness-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">Place Order</button></div></div><div class="lg:col-span-1"><div class="sticky top-4">${renderComponent($$result, "OrderReview", $$OrderReview, { "cart": cart })}</div></div></form></div></div><script>(function(){${defineScriptVars({
		amountInCents,
		currencyCode: cart.totals.currency_code,
		storeNonce
	})}
  console.log('[CheckoutForm] Script initializing...');

  function initCheckoutForm() {
    console.log('[CheckoutForm] Form init starting...');

    const form = document.getElementById('checkout-form');
    const submitBtn = document.getElementById('checkout-submit');
    const errorsContainer = document.getElementById('errors-container');
    const sameAsShippingCheckbox = document.getElementById('billing-same-as-shipping');
    const billingWrapper = document.querySelector('[data-form="billing"]');

    console.log('[CheckoutForm] DOM elements found:', {
      form: !!form,
      submitBtn: !!submitBtn,
      errorsContainer: !!errorsContainer,
      sameAsShippingCheckbox: !!sameAsShippingCheckbox,
      billingWrapper: !!billingWrapper,
    });

    if (!form || !submitBtn) {
      console.error('[CheckoutForm] CRITICAL: Required form elements not found');
      return;
    }

    const SYNCED_FIELDS = ['firstName', 'lastName', 'country', 'state', 'address1', 'address2', 'city', 'postcode'];

    // Stripe initialization on page load
    let piId = '';
    let stripeInitialized = false;

    (async function initStripeOnLoad() {
      try {
        const piRes = await fetch('/api/stripe/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: amountInCents, currency: currencyCode }),
        });
        if (!piRes.ok) return;
        const data = await piRes.json();
        piId = data.paymentIntentId;
        const fns = window.stripePaymentFunctions;
        if (fns) {
          await fns.initStripePayment(data.clientSecret);
          stripeInitialized = true;
        }
      } catch (e) {
        console.warn('[CheckoutForm] Page-load Stripe init failed:', e);
      }
    })();

    // Get current state from page
    const getCurrentFormState = () => {
      const state = {
        billing: {},
        shipping: {},
        orderNotes: '',
      };

      SYNCED_FIELDS.forEach(field => {
        const shippingInput = form.querySelector(\`[name="shipping.\${field}"]\`);
        const billingInput = form.querySelector(\`[name="billing.\${field}"]\`);

        if (shippingInput) state.shipping[field] = shippingInput.value;
        if (billingInput) state.billing[field] = billingInput.value;
      });

      const emailInput = form.querySelector('[name="billing.email"]');
      const phoneInput = form.querySelector('[name="billing.phone"]');
      if (emailInput) state.billing.email = emailInput.value;
      if (phoneInput) state.billing.phone = phoneInput.value;

      const notesInput = form.querySelector('[name="orderNotes"]');
      if (notesInput) state.orderNotes = notesInput.value;

      return state;
    };

    const setBillingFieldsDisabled = (disabled) => {
      console.log('[CheckoutForm] Setting billing fields disabled:', disabled);
      SYNCED_FIELDS.forEach(field => {
        const el = form.querySelector(\`[name="billing.\${field}"]\`);
        if (el) {
          el.disabled = disabled;
        }
      });
    };

    const syncBillingFromShipping = () => {
      console.log('[CheckoutForm] Syncing billing from shipping...');

      SYNCED_FIELDS.forEach(field => {
        const shippingEl = form.querySelector(\`[name="shipping.\${field}"]\`);
        const billingEl = form.querySelector(\`[name="billing.\${field}"]\`);

        if (!shippingEl || !billingEl) {
          console.warn(\`[CheckoutForm] Missing element for field: \${field}\`);
          return;
        }

        if (field === 'country') {
          billingEl.value = shippingEl.value;
          console.log(\`[CheckoutForm] Synced country: \${billingEl.value}\`);

          // Trigger update for state dropdown
          const updateFn = billingWrapper?.__updateBillingStateField;
          if (typeof updateFn === 'function') {
            console.log('[CheckoutForm] Updating billing state dropdown');
            updateFn(shippingEl.value);
          }
          return;
        }

        billingEl.value = shippingEl.value;
        console.log(\`[CheckoutForm] Synced \${field}: \${billingEl.value}\`);
      });

      // Sync state field after country
      const shippingState = form.querySelector('[name="shipping.state"]');
      const billingState = form.querySelector('[name="billing.state"]');
      if (shippingState && billingState) {
        billingState.value = shippingState.value;
        console.log(\`[CheckoutForm] Synced state: \${billingState.value}\`);
      }
    };

    // Billing same as shipping checkbox
    if (sameAsShippingCheckbox) {
      console.log('[CheckoutForm] Attaching billing-same-as-shipping listener');
      sameAsShippingCheckbox.addEventListener('change', () => {
        console.log('[CheckoutForm] Checkbox changed:', sameAsShippingCheckbox.checked);
        if (sameAsShippingCheckbox.checked) {
          syncBillingFromShipping();
          setBillingFieldsDisabled(true);
        } else {
          setBillingFieldsDisabled(false);
        }
      });
    } else {
      console.warn('[CheckoutForm] billing-same-as-shipping checkbox not found');
    }

    // Form submission
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      console.log('[CheckoutForm] Form submitted');

      submitBtn.disabled = true;
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Processing Payment...';
      errorsContainer.innerHTML = '';

      try {
        const formState = getCurrentFormState();
        console.log('[CheckoutForm] Current form state:', formState);

        // Map to WooCommerce Store API format
        const checkoutPayload = {
          billing_address: {
            first_name: formState.billing.firstName,
            last_name: formState.billing.lastName,
            email: formState.billing.email,
            phone: formState.billing.phone,
            country: formState.billing.country,
            state: formState.billing.state,
            address_1: formState.billing.address1,
            address_2: formState.billing.address2 || '',
            city: formState.billing.city,
            postcode: formState.billing.postcode,
          },
          shipping_address: {
            first_name: formState.shipping.firstName,
            last_name: formState.shipping.lastName,
            country: formState.shipping.country,
            state: formState.shipping.state,
            address_1: formState.shipping.address1,
            address_2: formState.shipping.address2 || '',
            city: formState.shipping.city,
            postcode: formState.shipping.postcode,
          },
          payment_method: 'bacs',
          payment_method_title: 'Direct bank transfer',
          order_notes: formState.orderNotes || '',
        };

        console.log('[CheckoutForm] Sending checkout payload:', checkoutPayload);

        const checkoutHeaders = { 'Content-Type': 'application/json' };
        const activeNonce = storeNonce || localStorage.getItem('woo_cart_nonce') || '';
        if (activeNonce) {
          checkoutHeaders['Nonce'] = activeNonce;
          checkoutHeaders['X-WC-Store-API-Nonce'] = activeNonce;
        }
        const cartToken = localStorage.getItem('woo_cart_token') || '';
        if (cartToken) {
          checkoutHeaders['Cart-Token'] = cartToken;
        }

        const checkoutRes = await fetch('/api/checkout', {
          method: 'POST',
          headers: checkoutHeaders,
          body: JSON.stringify(checkoutPayload),
        });

        if (!checkoutRes.ok) {
          const error = await checkoutRes.json();
          throw new Error(error.message || 'Checkout failed');
        }

        const checkoutResponse = await checkoutRes.json();
        console.log('[CheckoutForm] Checkout response:', checkoutResponse);

        const orderId = checkoutResponse.order_id;
        const orderKey = checkoutResponse.order_key;

        if (!orderId) {
          errorsContainer.innerHTML = \`
            <div class="p-4 bg-red-50 border border-red-200 rounded-md">
              <p class="text-red-800 font-medium mb-2">Checkout Error</p>
              <p class="text-red-700 text-sm">Order ID not returned from checkout</p>
            </div>
          \`;
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        console.log('[CheckoutForm] Order created:', orderId);

        const stripePaymentFns = window.stripePaymentFunctions;
        if (!stripePaymentFns) {
          throw new Error('Stripe payment functions not available - please refresh the page');
        }

        if (!stripeInitialized) {
          console.log('[CheckoutForm] Creating payment intent (fallback)...');
          const piRes = await fetch('/api/stripe/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              amount: amountInCents,
              currency: currencyCode,
              orderId,
              customerEmail: formState.billing.email,
            }),
          });

          if (!piRes.ok) {
            const error = await piRes.json();
            throw new Error(error.message || 'Failed to create payment intent');
          }

          const piData = await piRes.json();
          piId = piData.paymentIntentId;

          await stripePaymentFns.initStripePayment(piData.clientSecret);
          stripeInitialized = true;
        } else {
          console.log('[CheckoutForm] Updating payment intent with order ID...');
          const updateRes = await fetch('/api/stripe/update-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentIntentId: piId, orderId }),
          });

          if (!updateRes.ok) {
            const error = await updateRes.json();
            throw new Error(error.message || 'Failed to update payment intent');
          }
        }

        console.log('[CheckoutForm] Submitting payment...');
        await stripePaymentFns.submitStripePayment();

        console.log('[CheckoutForm] Payment submitted, confirming...');
        const confirmRes = await fetch('/api/stripe/confirm-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentIntentId: piId }),
        });

        if (!confirmRes.ok) {
          const error = await confirmRes.json();
          throw new Error(error.message || 'Payment confirmation failed');
        }

        const confirmResult = await confirmRes.json();

        if (confirmResult.status !== 'succeeded') {
          throw new Error(\`Payment failed with status: \${confirmResult.status}\`);
        }

        console.log('[CheckoutForm] Payment succeeded!');

        sessionStorage.setItem('woo_order_id', orderId.toString());
        sessionStorage.setItem('woo_order_key', orderKey);
        sessionStorage.setItem('woo_order_billing_email', formState.billing.email);
        localStorage.removeItem('woo_cart_state');
        window.location.href = \`/checkout/confirmation/\${orderId}\`;
      } catch (error) {
        console.error('[CheckoutForm] Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        errorsContainer.innerHTML = \`
          <div class="p-4 bg-red-50 border border-red-200 rounded-md">
            <p class="text-red-800 font-medium">Payment Error</p>
            <p class="text-red-700 text-sm mt-2">\${errorMessage}</p>
          </div>
        \`;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });

    console.log('[CheckoutForm] Form initialization complete');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCheckoutForm);
  } else {
    initCheckoutForm();
  }
})();<\/script>`;
}, "/home/humberto/projects/astro-woo/frontend/src/components/checkout/CheckoutForm.astro", void 0);
//#endregion
//#region src/pages/checkout/index.astro
var checkout_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro-woo.netlify.app");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro2 = $$result.createAstro($$props, $$slots);
	Astro2.self = $$Index;
	let cart = null;
	let error = null;
	let storeNonce = "";
	try {
		const cartToken = Astro2.cookies.get("woo_cart_token")?.value;
		const targetUrl = `${"http://138.2.172.187/graphql".replace(/\/graphql$/, "")}/wp-json/wc/store/v1/cart`;
		const cartRes = await fetch(targetUrl, { headers: {
			Accept: "application/json",
			...cartToken ? { "Cart-Token": cartToken } : {}
		} });
		if (!cartRes.ok) throw new Error(`Cart API responded with ${cartRes.status}`);
		storeNonce = cartRes.headers.get("Nonce") || cartRes.headers.get("X-WC-Store-API-Nonce") || "";
		cart = await cartRes.json();
		if (!cart || !cart.items || cart.items.length === 0) return Astro2.redirect("/cart");
	} catch (err) {
		error = "Failed to load cart. Please try again.";
		console.error("[Checkout Page] Error:", err);
	}
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Checkout",
		"description": "Complete your order",
		"type": "website"
	}, { "default": async ($$result2) => renderTemplate`${error ? renderTemplate`${maybeRenderHead($$result2)}<div class="max-w-7xl mx-auto px-4 py-12"><div class="p-6 bg-[var(--color-surface)] border border-red-200 rounded-[var(--radius-lg)]"><h1 class="font-heading text-2xl text-red-900 mb-2">Checkout Error</h1><p class="text-red-700">${error}</p><a href="/cart" class="mt-4 inline-block px-6 py-2.5 bg-[var(--color-btn-cart)] text-white font-medium rounded-[var(--radius-md)] hover:brightness-95 active:brightness-90 transition-all duration-200">Back to Cart</a></div></div>` : cart ? renderTemplate`${renderComponent($$result2, "CheckoutForm", $$CheckoutForm, {
		"cart": cart,
		"storeNonce": storeNonce
	})}` : null}` })}`;
}, "/home/humberto/projects/astro-woo/frontend/src/pages/checkout/index.astro", void 0);
var $$file = "/home/humberto/projects/astro-woo/frontend/src/pages/checkout/index.astro";
var $$url = "/checkout";
//#endregion
//#region \0virtual:astro:page:src/pages/checkout/index@_@astro
var page = () => checkout_exports;
//#endregion
export { page };
