import { configureStore } from "@reduxjs/toolkit";
import { counterSlice, ideEjeSlice, requirementsSlice } from "./features";
import { userApi } from "./services/userApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    requirements: requirementsSlice.reducer,
    ide_eje: ideEjeSlice.reducer,
    counter: counterSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userApi.middleware]),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
