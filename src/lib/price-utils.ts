export interface PriceInfo {
  current?: string;
  regular?: string;
  min?: string;
  max?: string;
  isOnSale?: boolean;
  isRange?: boolean;
}

const extractNumericValue = (
  price: string | number | null | undefined,
): number | null => {
  if (price === null || price === undefined || price === "") return null;

  const str = typeof price === "string" ? price : price.toString();
  // Remove currency symbols and spaces, convert comma to dot for parsing
  const cleaned = str.replace(/[^\d,.-]/g, "").replace(",", ".");
  const numPrice = parseFloat(cleaned);

  return isNaN(numPrice) ? null : numPrice;
};

export const formatPrice = (
  price: string | number | null | undefined,
): string | null => {
  if (price === null || price === undefined || price === "") return null;

  // If it's already formatted (contains € or comma), return as is
  if (
    typeof price === "string" &&
    (price.includes("€") || price.match(/\d,\d/))
  ) {
    return price;
  }

  const numPrice = extractNumericValue(price);
  if (numPrice === null) return null;

  // Format with comma decimal separator and € symbol
  return (
    numPrice.toLocaleString("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + "€"
  );
};

export const getSimpleProductPrice = (
  price: string | number | null,
  regularPrice: string | number | null,
  salePrice: string | number | null,
): PriceInfo => {
  const formattedSalePrice = formatPrice(salePrice);
  const formattedRegularPrice = formatPrice(regularPrice);
  const formattedBasePrice = formatPrice(price);

  const currentPrice = formattedSalePrice || formattedBasePrice;

  return {
    current: currentPrice ?? undefined,
    regular:
      formattedRegularPrice && formattedRegularPrice !== currentPrice
        ? formattedRegularPrice
        : undefined,
    isOnSale: !!formattedSalePrice,
  };
};

export const getVariableProductPriceRange = (
  variations: Array<{
    price: string | number | null;
    regularPrice: string | number | null;
    salePrice: string | number | null;
  }>,
): PriceInfo => {
  if (!variations || variations.length === 0) return {};

  const prices = variations
    .map((v) => {
      const numeric =
        extractNumericValue(v.salePrice) ?? extractNumericValue(v.price);
      return numeric;
    })
    .filter((p): p is number => p !== null)
    .sort((a, b) => a - b);

  if (prices.length === 0) return {};

  const minPrice = prices[0].toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const maxPrice = prices[prices.length - 1].toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return {
    min: minPrice + "€",
    max: maxPrice + "€",
    isRange: minPrice !== maxPrice,
  };
};

export const formatStorePrice = (
  price: string | number | null | undefined,
  minorUnit: number = 2
): string => {
  if (price === null || price === undefined || price === "") return "0,00€";

  const strVal = typeof price === "string" ? price : price.toString();
  
  // If it already has a currency symbol or has been formatted, return it
  if (strVal.includes("€") || strVal.includes(",") || (strVal.includes(".") && strVal.split(".")[1]?.length === 2 && isNaN(Number(strVal)))) {
    return strVal;
  }

  const rawValue = parseFloat(strVal.replace(/[^\d.-]/g, ""));
  if (isNaN(rawValue)) return "0,00€";

  const realValue = rawValue / Math.pow(10, minorUnit);

  return (
    realValue.toLocaleString("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + "€"
  );
};
