import { configureStore } from "@reduxjs/toolkit";
import theme from "../redux/features/themeSlice";
import authReducer from "../redux/features/auth/authSlice";
import productReducer from "../redux/features/product/productSlice";
import filterReducer from "../redux/features/product/filterSlice";

export const store = configureStore({
    reducer: {
        darkMode: theme,
        auth: authReducer,
        product: productReducer,
        filter: filterReducer
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;