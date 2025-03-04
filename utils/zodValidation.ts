import { z } from "zod";
import validator from "validator";

export const cartAddItemSchema = z.object({
  productId: z
    .string()
    .refine(validator.isMongoId, "Invalid product ID"),
  quantity: z.number().min(1),
});

export const cartRemoveItemSchema = z.object({
  cartItemId: z
    .string()
    .refine(validator.isMongoId, "Invalid cart item ID"),
});

export const cartUpdateItemQuantitySchema = z.object({
  cartItemId: z
    .string()
    .refine(validator.isMongoId, "Invalid cart item ID"),
  quantity: z.number().min(1),
});

export type AddItemInput = z.infer<typeof cartAddItemSchema>;
export type RemoveItemInput = z.infer<typeof cartRemoveItemSchema>;
export type UpdateItemQuantityInput = z.infer<typeof cartUpdateItemQuantitySchema>;

export const validateAddItem = (data: AddItemInput) =>
  cartAddItemSchema.safeParse(data);

export const validateRemoveItem = (data: RemoveItemInput) =>
  cartRemoveItemSchema.safeParse(data);

export const validateUpdateItemQuantity = (data: UpdateItemQuantityInput) =>
  cartUpdateItemQuantitySchema.safeParse(data);
