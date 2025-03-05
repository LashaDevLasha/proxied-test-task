import { gql } from '@apollo/client';

export const CART_ITEM_UPDATE = gql`
  subscription CartItemUpdate {
    cartItemUpdate {
      event
      payload {
        _id
        cartId
        product {
          _id
          title
          availableQuantity
          cost
        }
        quantity
      }
    }
  }
`;
