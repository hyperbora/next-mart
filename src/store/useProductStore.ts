import { ProductCardProps } from "@/types/global";
import { create } from "zustand";
import data from "@/data.json";

type ProductStore = {
  products: ProductCardProps[];
  fetchProducts: () => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  fetchProducts: () => {
    set({ products: data });
  },
}));
