import {
  getOrderConfirmation,
  clearOrderConfirmation,
  clearCheckoutState,
} from "../lib/checkout-state";

async function initConfirmation(cleanOrderId: number) {
  const confirmation = getOrderConfirmation();
  console.log("[Confirmation] Checking:", { cleanOrderId, confirmation });

  if (
    !confirmation ||
    confirmation.orderId !== cleanOrderId ||
    !confirmation.orderKey
  ) {
    console.log("[Confirmation] Invalid confirmation");
    showError("Invalid or expired order confirmation.");
    return;
  }

  try {
    console.log("[Confirmation] Fetching order details...");
    const response = await fetch("/api/order-details", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: cleanOrderId,
        orderKey: confirmation.orderKey,
        billingEmail: confirmation.billingEmail,
      }),
    });

    console.log("[Confirmation] Response status:", response.status);
    const result = await response.json();
    console.log("[Confirmation] Result:", result);

    if (!result.success || !result.order) {
      showError(result.error?.message || "Failed to load order details.");
      return;
    }

    renderOrderDetails(result.order);
    document.getElementById("loading")?.classList.add("hidden");
    document.getElementById("confirmation-content")?.classList.remove("hidden");

    clearOrderConfirmation();
    clearCheckoutState();
  } catch (err) {
    console.error("[Confirmation] Error:", err);
    showError("An error occurred while loading your order.");
  }
}

function showError(message: string) {
  document.getElementById("loading")?.classList.add("hidden");
  document.getElementById("error-content")?.classList.remove("hidden");
  const errorMsg = document.getElementById("error-message");
  if (errorMsg) errorMsg.textContent = message;
}

function renderOrderDetails(order: any) {
  document.getElementById("order-number")!.textContent = String(order.id); // no hay order_number real en este endpoint
  document.getElementById("order-status")!.textContent = capitalizeStatus(
    order.status,
  );

  // date_created y payment_method_title no vienen en wc/store/v1/order/{id}.
  // Oculta esas tarjetas o ponles un texto fijo si siempre usas el mismo método:
  const dateEl = document.getElementById("order-date");
  if (dateEl)
    dateEl
      .closest("div.bg-\\[var\\(--color-surface\\)\\]")
      ?.classList.add("hidden");

  const paymentEl = document.getElementById("payment-method");
  if (paymentEl)
    paymentEl.textContent = order.payment_method_title || order.payment_method || "Card";

  document.getElementById("customer-email")!.textContent =
    order.billing_address.email;

  renderItems(order.items, order.totals);
  renderCoupons(order.coupons, order.totals);
  renderTotals(order.totals, order.items);
  renderBillingAddress(order.billing_address);
  renderShippingAddress(order.shipping_address);
}

function renderItems(items: any[], totals: any) {
  const container = document.getElementById("items-container");
  if (!container) return;

  container.innerHTML = items
    .map(
      (item) => `
    <div class="flex gap-4 pb-4 border-b border-[var(--color-border)] last:border-b-0">
      <div class="w-20 h-20 bg-[var(--color-background)] rounded-[var(--radius-md)] flex-shrink-0">
        ${
          item.images?.[0]?.src
            ? `<img src="${item.images[0].src}" alt="${item.name}" class="w-full h-full object-cover rounded-[var(--radius-md)]">`
            : '<div class="w-full h-full flex items-center justify-center text-[var(--color-text-muted)]">No image</div>'
        }
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="font-medium text-[var(--color-text-base)] mb-1">${item.name}</h4>
        ${
          item.variation?.length
            ? `<p class="text-sm text-[var(--color-text-muted)] mb-2">${item.variation
                .map((v: any) => `${v.attribute}: ${v.value}`)
                .join(", ")}</p>`
            : ""
        }
        <p class="text-sm text-[var(--color-text-muted)]">Qty: ${item.quantity}</p>
      </div>
      <div class="text-right flex-shrink-0">
        <p class="font-medium text-[var(--color-text-base)]">${formatCurrency(item.totals.line_total, totals)}</p>
        <p class="text-xs text-[var(--color-text-muted)]">${formatCurrency(item.prices.price, totals)} each</p>
      </div>
    </div>
  `,
    )
    .join("");
}

function renderCoupons(coupons: any[], totals: any) {
  if (!coupons || coupons.length === 0) return;

  const section = document.getElementById("coupons-section");
  const container = document.getElementById("coupons-container");
  if (!section || !container) return;

  section.classList.remove("hidden");
  container.innerHTML = coupons
    .map(
      (coupon) => `
    <div class="flex justify-between items-center">
      <span class="font-medium text-[var(--color-text-base)]">${coupon.code}</span>
      <span class="text-red-600 font-medium">-${formatCurrency(coupon.totals.total_discount, totals)}</span>
    </div>
  `,
    )
    .join("");
}

function renderTotals(totals: any, items: any[]) {
  const itemsSubtotal = items.reduce(
    (acc, item) => acc + parseFloat(item.totals.line_total),
    0,
  );

  const subtotalEl = document.getElementById("subtotal");
  if (subtotalEl)
    subtotalEl.textContent = formatCurrency(itemsSubtotal.toString(), totals);

  const shippingRow = document.getElementById("shipping-row");
  const shipping = parseFloat(totals.total_shipping || 0);
  if (shipping > 0) {
    const shippingEl = document.getElementById("shipping");
    if (shippingEl)
      shippingEl.textContent = formatCurrency(totals.total_shipping, totals);
  } else if (shippingRow) {
    shippingRow.classList.add("hidden");
  }

  const taxRow = document.getElementById("tax-row");
  const tax = parseFloat(totals.total_tax || 0);
  if (tax > 0) {
    const taxEl = document.getElementById("tax");
    if (taxEl) taxEl.textContent = formatCurrency(totals.total_tax, totals);
  } else if (taxRow) {
    taxRow.classList.add("hidden");
  }

  const discount = parseFloat(totals.total_discount || 0);
  if (discount > 0) {
    const discountRow = document.getElementById("discount-row");
    if (discountRow) discountRow.classList.remove("hidden");
    const discountEl = document.getElementById("discount");
    if (discountEl)
      discountEl.textContent = formatCurrency(totals.total_discount, totals);
  }

  const totalEl = document.getElementById("total");
  if (totalEl) totalEl.textContent = formatCurrency(totals.total_price, totals);
}

function renderBillingAddress(address: any) {
  const container = document.getElementById("billing-address");
  if (!container) return;

  container.innerHTML = `
    <div><strong>${address.first_name} ${address.last_name}</strong></div>
    <div>${address.address_1}${address.address_2 ? "<br>" + address.address_2 : ""}</div>
    <div>${address.postcode} ${address.city}</div>
    <div>${getCountryName(address.country)}</div>
    <div class="pt-2 text-sm">📧 ${address.email}</div>
    ${address.phone ? `<div class="text-sm">📞 ${address.phone}</div>` : ""}
  `;
}

function renderShippingAddress(address: any) {
  const container = document.getElementById("shipping-address");
  if (!container) return;

  container.innerHTML = `
    <div><strong>${address.first_name} ${address.last_name}</strong></div>
    <div>${address.address_1}${address.address_2 ? "<br>" + address.address_2 : ""}</div>
    <div>${address.postcode} ${address.city}</div>
    <div>${getCountryName(address.country)}</div>
  `;
}

function formatCurrency(value: string | number, totals: any = {}) {
  const num = parseFloat(String(value));
  if (isNaN(num)) return "—";

  const symbol = totals.currency_symbol || "$";
  const decimals = totals.currency_minor_unit ?? 2;
  const sep = totals.currency_decimal_separator || ".";

  const actualValue = num / Math.pow(10, decimals);

  return symbol + actualValue.toFixed(decimals).replace(".", sep);
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function capitalizeStatus(status: string) {
  return status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ");
}

function getCountryName(code: string) {
  const countries: Record<string, string> = {
    US: "United States",
    GB: "United Kingdom",
    ES: "Spain",
    FR: "France",
    DE: "Germany",
    IT: "Italy",
    PL: "Poland",
  };
  return countries[code] || code;
}

export { initConfirmation };
