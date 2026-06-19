interface VariationData {
  id: number;
  price: string | number | null;
  regularPrice: string | number | null;
  salePrice: string | number | null;
  stockStatus: string;
  image?: string;
  attributes: Record<string, string>;
}

const extractNumericValue = (
  price: string | number | null | undefined,
): number | null => {
  if (price === null || price === undefined || price === "") return null;

  const str = typeof price === "string" ? price : price.toString();
  const cleaned = str.replace(/[^\d,.-]/g, "").replace(",", ".");
  const numPrice = parseFloat(cleaned);

  return isNaN(numPrice) ? null : numPrice;
};

const formatPriceDisplay = (price: string | number | null): string | null => {
  const numPrice = extractNumericValue(price);
  if (numPrice === null) return null;

  return (
    numPrice.toLocaleString("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + "€"
  );
};

const getPriceHtml = (variation: VariationData): string => {
  const salePrice = formatPriceDisplay(variation.salePrice);
  const regularPrice = formatPriceDisplay(variation.regularPrice);
  const basePrice = formatPriceDisplay(variation.price);
  const currentPrice = salePrice || basePrice;

  if (!currentPrice) {
    return '<span class="text-(--color-text-muted)">Price on request</span>';
  }

  if (salePrice && regularPrice) {
    return `
      <div class="flex items-center gap-3">
        <span class="text-(--color-btn-cta)">${currentPrice}</span>
        <span class="line-through text-sm text-(--color-text-muted)">${regularPrice}</span>
      </div>
    `;
  }

  return `<span class="text-(--color-btn-cta)">${currentPrice}</span>`;
};

export const initProductVariations = (variationData: VariationData[]): void => {
  const selects = document.querySelectorAll(".variation-select");
  const priceElement = document.getElementById("product-price");
  const imageElement = document.getElementById(
    "product-image",
  ) as HTMLImageElement;
  const stockElement = document.getElementById("product-stock");
  const addToCartBtn = document.getElementById(
    "add-to-cart",
  ) as HTMLButtonElement;

  if (!priceElement || !selects.length) return;

  const selectedAttributes: Record<string, string> = {};

  const updateVariation = (): void => {
    const matchingVariation = variationData.find((variation) =>
      Object.entries(selectedAttributes).every(
        ([key, value]) => variation.attributes[key] === value,
      ),
    );

    if (matchingVariation) {
      if (priceElement) {
        const priceDiv =
          priceElement.querySelector("#price-simple") || priceElement;
        priceDiv.innerHTML = getPriceHtml(matchingVariation);
      }

      if (imageElement && matchingVariation.image) {
        imageElement.src = matchingVariation.image;
        imageElement.alt = matchingVariation.attributes
          ? Object.values(matchingVariation.attributes).join(" ")
          : "";
      }

      if (stockElement) {
        stockElement.textContent = matchingVariation.stockStatus;
      }

      if (addToCartBtn) {
        addToCartBtn.dataset.variationId = matchingVariation.id.toString();
        addToCartBtn.disabled = false;
        addToCartBtn.classList.remove("opacity-50", "cursor-not-allowed");
      }

      // Get the display price
      const displayPrice =
        formatPriceDisplay(matchingVariation.salePrice) ||
        formatPriceDisplay(matchingVariation.price);

      // Dispatch event to update price summary
      window.dispatchEvent(
        new CustomEvent("variation-selected", {
          detail: {
            variationId: matchingVariation.id,
            unitPrice: displayPrice,
          },
        }),
      );
    } else {
      if (addToCartBtn) {
        addToCartBtn.disabled = true;
        addToCartBtn.classList.add("opacity-50", "cursor-not-allowed");
      }

      window.dispatchEvent(
        new CustomEvent("variation-selected", {
          detail: {
            unitPrice: null,
          },
        }),
      );
    }
  };

  selects.forEach((select) => {
    const attributeName = select.getAttribute("data-attribute");

    select.addEventListener("change", (e) => {
      const target = e.target as HTMLSelectElement;
      const value = target.value;

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
};

export const getSelectedVariationId = (): string | null => {
  const btn = document.getElementById("add-to-cart") as HTMLButtonElement;
  return btn?.dataset.variationId || null;
};
