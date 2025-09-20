import { configureStore } from "@reduxjs/toolkit";
import { reviewApi } from "@/shared/api/reviewApi";
import { subscriptionApi } from "@/shared/api/subscriptionApi";
import { contactApi } from "@/shared/api/supportApi";

export const store = configureStore({
    reducer: {
        [reviewApi.reducerPath]: reviewApi.reducer,
        [subscriptionApi.reducerPath]: subscriptionApi.reducer,
        [contactApi.reducerPath]: contactApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(reviewApi.middleware)
            .concat(subscriptionApi.middleware)
            .concat(contactApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
