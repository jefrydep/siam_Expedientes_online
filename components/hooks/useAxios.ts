import { useState, useEffect } from "react";
import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";

interface FetchData<T> {
  data: T | null;
  error: AxiosError | null;
  loading: boolean;
}

const useAxios = <T>(
  url: string,
  config?: AxiosRequestConfig
): FetchData<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<T> = await axios.get(url, config);

        setData(response.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, config]);

  return { data, error, loading };
};

export default useAxios;
