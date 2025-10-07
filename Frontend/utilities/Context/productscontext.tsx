// src/utilities/Context/productscontext.tsx
import { createContext } from "react";
import type { ReactNode } from "react";
import useFetch from "../fetchdata";

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  // category_id may be populated (object) or raw ids (string[])
  category_id: any;
  tag_ids: any;
  size: string[];
  color: string[];
  quantity: number;
  rating: number;
  status: "Available" | "Sold Out";
  images: string[];
  createdAt: string;
  updatedAt: string;
}

type PaginatedProductsResponse = {
  message: string;
  page: number;
  totalPages: number;
  totalProducts: number;
  products: Product[];
};

interface ProductContextType {
  bestSelling: Product[];
  newSelling: Product[];
  male: Product[];
  female: Product[];
  childrenSell: Product[];
  trending: Product[];
  allProducts: Product[];
  isLoading: boolean;
  error: unknown;
  fetchProduct: (id: string) => Promise<Product | null>;
  fetchPaginatedProducts: (
    page: number,
    limit?: number,
    options?: { categoryId?: string; categorySlug?: string }
  ) => Promise<PaginatedProductsResponse | null>;
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

const ProductContextProvider = ({ children }: ProductProviderProps) => {
  const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");
  const BASE_URL = `${API_BASE_URL}/products`;

  // useFetch is generic; these endpoints can return either an array or a paginated object
  const { data: bestSelling, error: bestSellingError, isLoading: isBestSellingLoading } =
    useFetch<PaginatedProductsResponse | Product[]>(`${BASE_URL}?tag_ids=68c2f824527b3fc6d38c501f&limit=10`);
  const { data: newSelling, error: newProError, isLoading: isNewLoading } =
    useFetch<PaginatedProductsResponse | Product[]>(`${BASE_URL}?tag_ids=68c2f824527b3fc6d38c5020&limit=10`);
  const { data: male, error: maleError, isLoading: isMaleLoading } =
    useFetch<PaginatedProductsResponse | Product[]>(`${BASE_URL}?tag_ids=68c2f824527b3fc6d38c5022&limit=10`);
  const { data: female, error: femaleError, isLoading: isFemaleLoading } =
    useFetch<PaginatedProductsResponse | Product[]>(`${BASE_URL}?tag_ids=68c2f824527b3fc6d38c5023&limit=10`);
  const { data: childrenSell, error: childrenError, isLoading: isChildrenLoading } =
    useFetch<PaginatedProductsResponse | Product[]>(`${BASE_URL}?tag_ids=68c2f824527b3fc6d38c5024&limit=10`);
  const { data: trending, error: trendingError, isLoading: isTrendingLoading } =
    useFetch<PaginatedProductsResponse | Product[]>(`${BASE_URL}?tag_ids=68c2f824527b3fc6d38c5021&limit=10`);
  const { data: allProducts, error: allProductsError, isLoading: isAllProductsLoading } =
    useFetch<PaginatedProductsResponse | Product[]>(BASE_URL);

  // helper: normalize data to Product[]
  const extractProducts = (data?: PaginatedProductsResponse | Product[] | null): Product[] => {
    if (!data) return [];
    return Array.isArray(data) ? data : data.products ?? [];
  };

  // helper: try to find a category _id by slug using currently fetched allProducts (best-effort)
  const findCategoryIdBySlug = (slug?: string): string | null => {
    if (!slug) return null;
    const pool = extractProducts(allProducts);
    for (const p of pool) {
      const cats = p.category_id;
      if (!cats) continue;
      const arr = Array.isArray(cats) ? cats : [cats];
      for (const c of arr) {
        if (!c) continue;
        // populated category object
        if (typeof c === "object" && "slug" in c) {
          if (String(c.slug).toLowerCase() === slug.toLowerCase()) return c._id ?? c.id ?? null;
        }
        // if category is an id string, skip (can't compare)
      }
    }
    return null;
  };

  const fetchProduct = async (id: string): Promise<Product | null> => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`);
      if (!res.ok) throw new Error("Failed to fetch product");
      const data = await res.json();
      // API returns { product: {...} } per your earlier code
      return data.product ?? data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  // robust paginated fetch — accepts categoryId or categorySlug (best-effort)
  const fetchPaginatedProducts = async (
    page = 1,
    limit = 10,
    options?: { categoryId?: string; categorySlug?: string }
  ): Promise<PaginatedProductsResponse | null> => {
    try {
      // If categoryId provided, prefer server-side filter
      let url = `${BASE_URL}?page=${page}&limit=${limit}`;

      if (options?.categoryId) {
        url += `&category_id=${options.categoryId}`;
      } else if (options?.categorySlug) {
        // attempt to find category id from already-fetched allProducts
        const cid = findCategoryIdBySlug(options.categorySlug);
        if (cid) {
          url += `&category_id=${cid}`;
        } else {
          // fallback: do client-side filtering from the allProducts pool
          const pool = extractProducts(allProducts);
          const filtered = pool.filter((p) => {
            const cats = p.category_id;
            if (!cats) return false;
            const arr = Array.isArray(cats) ? cats : [cats];
            return arr.some((c: any) => c && typeof c === "object" && String(c.slug).toLowerCase() === options.categorySlug!.toLowerCase());
          });
          const totalProducts = filtered.length;
          const totalPages = Math.max(1, Math.ceil(totalProducts / limit));
          const slice = filtered.slice((page - 1) * limit, page * limit);
          return {
            message: "Success",
            page,
            totalPages,
            totalProducts,
            products: slice,
          };
        }
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch paginated products (${res.status})`);
      const data: PaginatedProductsResponse = await res.json();
      return data;
    } catch (err) {
      console.error("Pagination error:", err);
      return null;
    }
  };

  const isLoading =
    isBestSellingLoading ||
    isTrendingLoading ||
    isAllProductsLoading ||
    isFemaleLoading ||
    isMaleLoading ||
    isChildrenLoading ||
    isNewLoading;

  const error =
    bestSellingError ||
    trendingError ||
    allProductsError ||
    femaleError ||
    maleError ||
    childrenError ||
    newProError;

  // use extractProducts to normalize shapes
  const contextValue: ProductContextType = {
    bestSelling: extractProducts(bestSelling),
    trending: extractProducts(trending),
    allProducts: extractProducts(allProducts),
    female: extractProducts(female),
    male: extractProducts(male),
    childrenSell: extractProducts(childrenSell),
    newSelling: extractProducts(newSelling),
    isLoading,
    error,
    fetchProduct,
    fetchPaginatedProducts,
  };

  return <ProductContext.Provider value={contextValue}>{children}</ProductContext.Provider>;
};

export default ProductContextProvider;
