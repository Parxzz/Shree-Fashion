import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { imagesByCategory } from "@/features/shop/staticImages";

export type Category =
  | "top"
  | "jeans"
  | "korean tops"
  | "gown"
  | "night suit"
  | "kurti"
  | "frock"
  | "jackets"
  | "accessories"
  | "baggy jeans"
  | "crop top"
  | "skirt"
  | "track pants"
  | "shirts"
  | "t-shirt";

export interface Product {
  id: string;
  title: string;
  price: number;
  category: Category;
  image: string;
  color?: string;
  size?: string;
  popularity?: number;
}

export interface Filters {
  category: Category | "all";
  size: string | "";
  color: string | "";
  priceRange: [number, number];
  search: string;
  onlyCategory: boolean;
  sort: "price" | "newest" | "popularity";
}

interface ShopState {
  products: Product[];
  categories: Category[];
  filters: Filters;
  selectedCategory: Category | null;
}

const categories: Category[] = [
  "top",
  "jeans",
  "korean tops",
  "gown",
  "night suit",
  "kurti",
  "frock",
  "jackets",
  "accessories",
  "baggy jeans",
  "crop top",
  "skirt",
  "track pants",
  "shirts",
  "t-shirt",
];

function buildProducts() {
  const items: Product[] = [];
  let id = 1;
  for (const cat of categories) {
    const imgs = imagesByCategory[cat] || imagesByCategory["top"];
    const images = imgs.length ? imgs : new Array(6).fill("/placeholder.svg");
    for (let i = 0; i < images.length; i++) {
      items.push({
        id: `${cat}-${id}`,
        title: `${cat} ${i + 1}`,
        price: Math.round(499 + Math.random() * 1500),
        category: cat,
        image: images[i],
        color: ["black", "white", "beige", "rose"][i % 4],
        size: ["S", "M", "L", "XL"][i % 4],
        popularity: Math.round(Math.random() * 1000),
      });
      id++;
    }
  }
  return items;
}

const initialState: ShopState = {
  products: buildProducts(),
  categories,
  filters: {
    category: "all",
    size: "",
    color: "",
    priceRange: [0, 5000],
    search: "",
    onlyCategory: false,
    sort: "newest",
  },
  selectedCategory: null,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<Category | "all">) {
      state.filters.category = action.payload;
      state.selectedCategory = action.payload === "all" ? null : action.payload;
    },
    setFilters(state, action: PayloadAction<Partial<Filters>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
    setOnlyCategory(state, action: PayloadAction<boolean>) {
      state.filters.onlyCategory = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.filters.search = action.payload;
    },
    setSort(state, action: PayloadAction<Filters["sort"]>) {
      state.filters.sort = action.payload;
    },
  },
});

export const { setCategory, setFilters, setOnlyCategory, setSearch, setSort } =
  shopSlice.actions;
export default shopSlice.reducer;

export const selectCategories = (state: { shop: ShopState }) =>
  state.shop.categories;
export const selectFilters = (state: { shop: ShopState }) => state.shop.filters;
export const selectSelectedCategory = (state: { shop: ShopState }) =>
  state.shop.selectedCategory;

export const selectFilteredProducts = createSelector(
  [(state: { shop: ShopState }) => state.shop.products, selectFilters],
  (products, filters) => {
    let list = products.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1],
    );
    if (filters.category !== "all")
      list = list.filter((p) => p.category === filters.category);
    if (filters.search)
      list = list.filter((p) =>
        p.title.toLowerCase().includes(filters.search.toLowerCase()),
      );
    if (filters.size) list = list.filter((p) => p.size === filters.size);
    if (filters.color) list = list.filter((p) => p.color === filters.color);
    if (filters.onlyCategory && filters.category !== "all")
      list = list.filter((p) => p.category === filters.category);

    switch (filters.sort) {
      case "price":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "popularity":
        list = [...list].sort(
          (a, b) => (b.popularity || 0) - (a.popularity || 0),
        );
        break;
      case "newest":
      default:
        list = list; // placeholder for real "createdAt" sort
    }

    return list;
  },
);
