import { createContext} from "react";
import type { ReactNode } from "react";

import useFetch from "../fetchdata";

interface ProductContextType {
  data: any[]; // Replace `any` with a specific Product type if you have it
  isLoading: boolean;
  error: any;
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);
interface ProductProviderProps {
  children: ReactNode;
}

const ProductContextProvider = ({ children }: ProductProviderProps) => {
  const { data, error, isLoading } = useFetch(`${import.meta.env.VITE_API_BASE_URL}/products`);

  const contextValue: ProductContextType = {
    data,
    isLoading,
    error
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
