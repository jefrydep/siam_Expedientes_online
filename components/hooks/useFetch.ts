import { useState, useEffect } from "react";
import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";

interface FetchData<T> {
  data: T | null;
  error: AxiosError | null;
  loading: boolean;
}

const useAxiosWithToken = <T>(
  url: string,
  token?: string | null, // Hacemos el token opcional
  config?: AxiosRequestConfig
): FetchData<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response: AxiosResponse<T> = await axios.get(url, {
            ...config,
            headers: {
              ...config?.headers,
              Authorization: `Bearer ${token}`,
            },
          });

          setData(response.data);
        } catch (err: any) {
          setError(err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, token, config]);

  return { data, error, loading };
};

export default useAxiosWithToken;
