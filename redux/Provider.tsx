"use client";
import { Provider } from "react-redux";
import { store } from "./store";
interface Props {
  children: React.ReactNode;
}
export function ProvidersStore({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}
