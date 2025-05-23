import {
  Cart,
  CartItem,
  Ingredient,
  Product,
  ProductItem,
} from "@prisma/client";

export type CartItemDTO = CartItem & {
  productItem: ProductItem & { product: Product };
  ingredients: Ingredient[];
};

export interface CartDTO extends Cart {
  items: CartItemDTO[];
}

export interface CreateCartItemValues {
  productItemId: number;
  ingredients?: number[];
}

// DTO расшифровывается как Data Transfer Object—это шаблон проектирования,
// который используется для передачи данных между слоями приложения.
// В контексте Next.js это может означать, что файлы или папки с dto содержат
// структуры данных, которые помогают обмену информацией между клиентом и сервером,
// API и базой данных.
