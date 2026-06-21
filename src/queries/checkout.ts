import { gql } from 'graphql-request';

export const GET_ORDER_BY_ID = gql`
  query GetOrderById($id: ID!) {
    order(id: $id, idType: DATABASE_ID) {
      databaseId
      orderNumber
      orderKey
      dateCreated
      status
      total
      totalTax
      shippingTotal
      
      lineItems {
        nodes {
          productId
          variationId
          name
          quantity
          total
          totalTax
        }
      }
      
      billing {
        firstName
        lastName
        email
        phone
        country
        address1
        address2
        city
        postcode
      }
      
      shipping {
        firstName
        lastName
        country
        address1
        address2
        city
        postcode
      }
      
      customerNote
    }
  }
`;
