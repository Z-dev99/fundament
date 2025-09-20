import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Subscription {
    id: string;
    price: string;
    description: string;
    period: number;
}

export const subscriptionApi = createApi({
    reducerPath: "subscriptionApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://45.92.173.41:8000/api/v1/" }),
    tagTypes: ["Subscription"],
    endpoints: (builder) => ({
        getSubscriptions: builder.query<Subscription[], { type: "TENANT" | "OWNER" }>({
            query: ({ type }) => `subscriptions?subscription_type=${type}`,
            providesTags: ["Subscription"],
        }),

        addSubscription: builder.mutation<
            Subscription,
            { price: string; description: string; period: number; type: "TENANT" | "OWNER" }
        >({
            query: (body) => ({
                url: "subscriptions",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Subscription"],
        }),

        updateSubscription: builder.mutation<
            Subscription,
            { id: string; data: { price: string; description: string; period: number } }
        >({
            query: ({ id, data }) => ({
                url: `subscriptions/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Subscription"],
        }),

        deleteSubscription: builder.mutation<{ success: boolean; id: string }, string>({
            query: (id) => ({
                url: `subscriptions/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Subscription"],
        }),
    }),
});

export const {
    useGetSubscriptionsQuery,
    useAddSubscriptionMutation,
    useUpdateSubscriptionMutation,
    useDeleteSubscriptionMutation,
} = subscriptionApi;
