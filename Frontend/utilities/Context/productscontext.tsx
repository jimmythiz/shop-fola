import { createContext } from "react";
import type { ReactNode } from "react";
import useFetch from "../fetchdata"; 

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category_id: string[];
  tag_ids: string[];
  size: string[];
  color: string[];
  quantity: number;
  rating: number;
  status: "Available" | "Sold Out";
  images: string[];
  createdAt: string;
  updatedAt: string;
}

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
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

const ProductContextProvider = ({ children }: ProductProviderProps) => {
  const API_BASE_URL:string = import.meta.env.VITE_API_BASE_URL;
  const BASE_URL = `${API_BASE_URL}/products`;

  const { 
    data: bestSelling, 
    error: bestSellingError, 
    isLoading: isBestSellingLoading 
  } = useFetch(`${BASE_URL}?tag_ids=68c2f824527b3fc6d38c501f&limit=10`); 

  const { 
    data: newSelling, 
    error: newProError, 
    isLoading: isNewLoading 
  } = useFetch(`${BASE_URL}?tag_ids=68c2f824527b3fc6d38c5020&limit=10`); 

  const { 
    data: male, 
    error: maleError, 
    isLoading: isMaleLoading 
  } = useFetch(`${BASE_URL}?tag_ids=68c2f824527b3fc6d38c5022&limit=10`); 

  const { 
    data: female, 
    error: femaleError, 
    isLoading: isFemaleLoading 
  } = useFetch(`${BASE_URL}?tag_ids=68c2f824527b3fc6d38c5023&limit=10`); 
  
  const { 
    data: childrenSell, 
    error: childrenError, 
    isLoading: ischildrenLoading 
  } = useFetch(`${BASE_URL}?tag_ids=68c2f824527b3fc6d38c5024&limit=10`); 

  const { 
    data: trending, 
    error: trendingError, 
    isLoading: isTrendingLoading 
  } = useFetch(`${BASE_URL}?tag_ids=68c2f824527b3fc6d38c5021&limit=10`); 

  const { 
    data: allProducts, 
    error: allProductsError, 
    isLoading: isAllProductsLoading 
  } = useFetch(BASE_URL);

  const fetchProduct = async (id: string): Promise<Product | null> => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch product");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};

  const isLoading = isBestSellingLoading || isTrendingLoading || isAllProductsLoading || isFemaleLoading || isMaleLoading || ischildrenLoading || isNewLoading;

  const error = bestSellingError || trendingError || allProductsError || femaleError || maleError || childrenError || newProError;

  const contextValue: ProductContextType = {
  bestSelling: bestSelling?.products || bestSelling || [],
  trending: trending?.products || trending || [],
  allProducts: allProducts?.products || allProducts || [], 
  female: female?.products || female || [], 
  male: male?.products || male || [],
  childrenSell: childrenSell?.products || childrenSell || [],
  newSelling: newSelling?.products || newSelling || [],
  isLoading,
  error,
  fetchProduct,
};

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;