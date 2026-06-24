import { gql } from "graphql-request";

export const GET_PRODUCTS = gql`
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

export const GET_PRODUCT_BY_SLUG = gql`
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

export const GET_TESTIMONIALS = gql`
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

export const GET_BESTSELLERS = gql`
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

export const GET_CATEGORIES = gql`
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

export const GET_PRODUCTS_BY_CATEGORY = gql`
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

export const GET_PRODUCTS_FILTERED = gql`
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
