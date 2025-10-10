import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
    reducerPath: "paymentApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://147.45.68.231:8081/api/v1/" }),
    tagTypes: ["Payment"],
    endpoints: (builder) => ({
        createCardToken: builder.mutation<
            {
                card_token: string;
                status: string;
            },
            {
                card_number: string;
                expire_date: string;
            }
        >({
            query: (body) => ({
                url: "payment/card_token/create",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Payment"],
        }),

        verifyCardToken: builder.mutation<
            {
                status: string;
                message?: string;
            },
            {
                id: string;
                sms_code: string;
            }
        >({
            query: ({ id, sms_code }) => ({
                url: `payment/card_token/${id}/verify`,
                method: "POST",
                body: { sms_code },
            }),
            invalidatesTags: ["Payment"],
        }),

        payTenantSubscription: builder.mutation<
            {
                status: string;
                message?: string;
                transaction_id?: string;
            },
            {
                subscription_id: string;
                owner?: string;
            }
        >({
            query: (body) => ({
                url: "payment/tenant",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Payment"],
        }),
    }),
});

export const {
    useCreateCardTokenMutation,
    useVerifyCardTokenMutation,
    usePayTenantSubscriptionMutation,
} = paymentApi;
