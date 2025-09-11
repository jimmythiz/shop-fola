import axios,{AxiosError} from "axios";

const API_URL = "http://localhost:8000/api/products";


export const fetchProducts = async () => {
    const controller = new AbortController();
  try {
    const response = await axios.get(API_URL, { signal: controller.signal });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Axios error:", error.message);
      if (error.response) {
        console.log("Server responded:", error.response.status);
      }
    } else {
      console.error("Unexpected error:", error);
    }
    throw error; 
  }
  return () => {
    controller.abort();
  };   
};
