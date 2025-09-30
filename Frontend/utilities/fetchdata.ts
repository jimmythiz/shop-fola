import { useState, useEffect } from "react";
import axios from "axios";


const useFetch = (baseUrl:string) => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl);
        setData(response.data.products || response.data);
        console.log(response.data.products)
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [baseUrl]);

  return { data, error, isLoading };
};

export default useFetch;
