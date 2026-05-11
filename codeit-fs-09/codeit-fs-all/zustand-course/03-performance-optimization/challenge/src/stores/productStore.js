import { create } from "zustand";

export const useProductStore = create((set, get) => ({
  products: Array.from({ length: 5000 }, (_, i) => ({
    id: i,
    name: `Product ${i}`,
    price: Math.floor(Math.random() * 1000) + 10,
    category: ["Electronics", "Clothing", "Books", "Home"][
      Math.floor(Math.random() * 4)
    ],
    rating: Math.round(Math.random() * 5 * 10) / 10,
    inStock: Math.random() > 0.2,
    tags: ["popular", "sale", "new"].filter(() => Math.random() > 0.7),
  })),

  cart: [],
  filters: { category: "all", inStock: false, minRating: 0 },

  addToCart: (productId) => {
    // 구현 필요
  },

  setFilter: (key, value) => {
    // 구현 필요
  },
}));