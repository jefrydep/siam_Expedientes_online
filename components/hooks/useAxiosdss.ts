// import { useEffect, useState } from "react";
// import axios, { AxiosInstance, AxiosResponse } from "axios";

// type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// interface ConfigObject {
//   method: HttpMethod;
//   url: string;
//   requestConfig?: any;
// }

// const useAxios = (configObj: ConfigObject) => {
//   const { method, url, requestConfig = {} } = configObj;

//   const [response, setResponse] = useState<any>(null);
//   const [error, setError] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const controller = new AbortController();
//     const axiosInstance: AxiosInstance = axios.create();

//     const fetchData = async () => {
//       try {
//         const res: AxiosResponse = await axiosInstance[method.toLowerCase()](url, {
//           ...requestConfig,
//           signal: controller.signal,
//         });
//         setResponse(res.data);
//       } catch (err:any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();

//     return () => controller.abort();
//   }, [method, url, requestConfig]);

//   return [response, error, loading] as const;
// };

// export default useAxios;
