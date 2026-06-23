import { GraphQLClient, gql } from "graphql-request";
var client = new GraphQLClient("http://138.2.172.187/graphql");
//#endregion
//#region src/queries/products.ts
var GET_PRODUCTS = gql`
  query GetProducts($first: Int = 12, $after: String) {
    products(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        databaseId
        name
        slug
        ... on SimpleProduct {
          price
          regularPrice
          salePrice
          stockStatus
          image {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;
var GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      databaseId
        name
        slug
        sku
        description
        shortDescription

      image {
        sourceUrl
        altText
      }

      galleryImages {
        nodes {
          sourceUrl
          altText
        }
      }

      ... on SimpleProduct {
        price
        regularPrice
        salePrice
        stockStatus
      }

      ... on VariableProduct {
        price
        regularPrice
        salePrice
        stockStatus

        attributes {
          nodes {
            name
            label
            variation
            options
          }
        }

        variations(first: 100) {
          nodes {
            databaseId
            name
            price
            regularPrice
            salePrice
            stockStatus

            image {
              sourceUrl
              altText
            }

            attributes {
              nodes {
                name
                value
              }
            }
          }
        }
      }

      productCategories {
        nodes {
          name
          slug
        }
      }
    }
  }
`;
var GET_TAG_ID = gql`
  query GetTagId($slug: ID!) {
    productTag(id: $slug, idType: SLUG) {
      databaseId
    }
  }
`;
var GET_TESTIMONIALS = gql`
  query GetTestimonials {
    testimonials {
      nodes {
        title
        testimonialFields {
          authorName
          text
          rating
          product
        }
      }
    }
  }
`;
var GET_BESTSELLERS = gql`
  query GetBestsellers($first: Int = 8) {
    products(where: { tagIn: ["bestseller"] }, first: $first) {
      nodes {
        databaseId
        name
        slug
        ... on SimpleProduct {
          price
          regularPrice
          salePrice
          stockStatus
          image {
            sourceUrl
            altText
          }
        }
        ... on VariableProduct {
          price
          regularPrice
          salePrice
          stockStatus
          image {
            sourceUrl
            altText
          }
          attributes {
            nodes {
              name
              options
            }
          }
        }
      }
    }
  }
`;
var GET_CATEGORIES = gql`
  query GetCategories {
    productCategories(first: 50, where: { exclude: [15] }) {
      nodes {
        databaseId
        name
        slug
      }
    }
  }
`;
var GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProductsByCategory(
    $category: String
    $first: Int = 12
    $after: String
  ) {
    products(first: $first, after: $after, where: { category: $category }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        databaseId
        name
        slug
        ... on SimpleProduct {
          price
          regularPrice
          salePrice
          stockStatus
          image {
            sourceUrl
            altText
          }
        }
        ... on VariableProduct {
          price
          regularPrice
          salePrice
          stockStatus
          image {
            sourceUrl
            altText
          }
          attributes {
            nodes {
              name
              options
            }
          }
        }
      }
    }
  }
`;
var GET_PRODUCTS_FILTERED = gql`
  query GetProductsFiltered(
    $first: Int = 12
    $after: String
    $category: String
    $minPrice: Float
    $maxPrice: Float
    $orderby: [ProductsOrderbyInput]
  ) {
    products(
      first: $first
      after: $after
      where: {
        category: $category
        minPrice: $minPrice
        maxPrice: $maxPrice
        orderby: $orderby
      }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        databaseId
        name
        slug
        ... on SimpleProduct {
          price
          regularPrice
          salePrice
          stockStatus
          image {
            sourceUrl
            altText
          }
        }
        ... on VariableProduct {
          price
          regularPrice
          salePrice
          stockStatus
          image {
            sourceUrl
            altText
          }
          attributes {
            nodes {
              name
              options
            }
          }
        }
      }
    }
  }
`;
//#endregion
//#region src/lib/products.ts
async function getProducts(first = 12, after) {
	return (await client.request(GET_PRODUCTS, {
		first,
		after
	})).products;
}
async function getProductBySlug(slug) {
	return (await client.request(GET_PRODUCT_BY_SLUG, { slug })).product;
}
async function getBestsellers(first = 8) {
	const tagId = (await client.request(GET_TAG_ID, { slug: "bestseller" }))?.productTag?.databaseId;
	if (!tagId) return [];
	return (await client.request(GET_BESTSELLERS, {
		tagIn: [tagId],
		first
	})).products.nodes;
}
async function getTestimonials() {
	return (await client.request(GET_TESTIMONIALS)).testimonials.nodes;
}
async function getCategories() {
	return (await client.request(GET_CATEGORIES)).productCategories.nodes;
}
async function getProductsByCategory(category, first = 12, after) {
	return (await client.request(GET_PRODUCTS_BY_CATEGORY, {
		category,
		first,
		after
	})).products;
}
async function getProductsFiltered({ first = 12, after, category, minPrice, maxPrice, orderby }) {
	return (await client.request(GET_PRODUCTS_FILTERED, {
		first,
		after: after ?? null,
		category: category ?? null,
		minPrice: minPrice ?? null,
		maxPrice: maxPrice ?? null,
		orderby: orderby ?? null
	})).products;
}
var CATS_WITH_SIZE = new Set([
	"mens-shirts",
	"tops",
	"womens-dresses",
	"mens-shoes",
	"womens-shoes"
]);
var CATS_WITH_COLOR = new Set(["womens-bags"]);
var SIZE_CLOTHING = [
	"XS",
	"S",
	"M",
	"L",
	"XL",
	"XXL"
];
var SIZE_FOOTWEAR = [
	"36",
	"37",
	"38",
	"39",
	"40",
	"41",
	"42",
	"43",
	"44",
	"45",
	"46"
];
var COLORS = [
	"Black",
	"White",
	"Red",
	"Blue",
	"Green"
];
var FOOTWEAR_CATS = new Set(["mens-shoes", "womens-shoes"]);
function getSizesForCategory(slug) {
	if (FOOTWEAR_CATS.has(slug)) return SIZE_FOOTWEAR;
	return SIZE_CLOTHING;
}
//#endregion
export { getCategories as a, getProductsByCategory as c, getTestimonials as d, getBestsellers as i, getProductsFiltered as l, CATS_WITH_SIZE as n, getProductBySlug as o, COLORS as r, getProducts as s, CATS_WITH_COLOR as t, getSizesForCategory as u };
