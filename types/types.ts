export type ProductType = {
  _id: string;
  title: string;
  cost: number;
  availableQuantity: number;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CartItem = {
  _id: string;
  quantity: number;
  product?: ProductType;
};

export type Cart = {
  _id: string;
  hash: string;
  items: CartItem[];
};

export type CartItemUpdatePayload = {
  _id: string;
  cartId: string;
  product: ProductType;
  quantity: number;
};

export type CartItemUpdate = {
  event: string;
  payload: CartItemUpdatePayload;
};

export type SubscriptionData = {
  cartItemUpdate: CartItemUpdate;
};
