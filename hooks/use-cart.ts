import Product from "@/app/components/Product";
import { categoryTypes } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Product = {
  id: string;
  name: string;
  price: number;
  smallDescription: string;
  description: JsonValue;
  images: string[];
  productFile: string;
  category: categoryTypes;
  createdAt: Date;
  userId: string;
};

export type CartItem = {
  product: Product;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => ({
          items: [...state.items, { product }],
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== id),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
