import { useState, useEffect } from "react";
import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";

interface FetchData<T> {
  data: T | null;
  error: AxiosError | null;
  loading: boolean;
}

const useAxios = <T>(
  url: string,
  bearerToken?: string, // Nuevo argumento para el token Bearer
  config?: AxiosRequestConfig
): FetchData<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers: AxiosRequestConfig["headers"] = {};

        if (bearerToken) {
          headers["Authorization"] = `Bearer ${bearerToken}`;
        }

        const response: AxiosResponse<T> = await axios.post(
          url,
          null, // Cambiamos el cuerpo de la solicitud a null
          {
            ...config,
            headers,
          }
        );
        setData(response.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, bearerToken, config]);

  return { data, error, loading };
};

export default useAxios;
