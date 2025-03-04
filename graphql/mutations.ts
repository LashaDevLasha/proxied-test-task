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
  mutation AddItem($input: AddItemArgs!) {
    addItem(input: $input) {
      _id
      hash
      items {
        _id
        quantity
        product {
          _id
          title
          cost
          availableQuantity
        }
      }
      createdAt
      updatedAt
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
          cost
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
          cost
        }
      }
    }
  }
`;
