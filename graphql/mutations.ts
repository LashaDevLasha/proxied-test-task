import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation RegisterVisitor {
    register {
      _id
      token
      cartId
    }
  }
`;

export const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($productId: ID!, $quantity: Int!) {
    addItem(input: { productId: $productId, quantity: $quantity }) {
      _id
      items {
        _id
        quantity
        product {
          title
          cost
        }
      }
    }
  }
`;

export const REMOVE_ITEM_FROM_CART = gql`
  mutation RemoveItemFromCart($cartItemId: ID!) {
    removeItem(input: { cartItemId: $cartItemId }) {
      _id
      items {
        _id
        quantity
        product {
          title
        }
      }
    }
  }
`;

export const UPDATE_ITEM_QUANTITY = gql`
  mutation UpdateItemQuantity($cartItemId: ID!, $quantity: Int!) {
    updateItemQuantity(
      input: { cartItemId: $cartItemId, quantity: $quantity }
    ) {
      _id
      items {
        _id
        quantity
        product {
          title
        }
      }
    }
  }
`;
