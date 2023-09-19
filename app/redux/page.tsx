"use client";
import React from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { decrement, increment, reset } from "@/redux/features/counterSlice";
import { useGetUsersQuery } from "@/redux/services/userApi";
import useAxiosWithToken from "@/components/hooks/useFetch";

const API = process.env.NEXT_PUBLIC_API_URL;
const token = "dfksdlfkjdlkfjdks";
console.log(API);
const ReduxPage = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  //   const { data, error, isLoading, isFetching } = useGetUsersQuery(null);

  const { data, error, loading } = useAxiosWithToken<any>(
    "URL_DE_TU_API",
    token
  );

  if (loading) return <p>Cargando....</p>;
  if (error) return <p>some error</p>;

  const incrementCount = () => {
    dispatch(increment());
  };

  return <div></div>;
};

export default ReduxPage;
