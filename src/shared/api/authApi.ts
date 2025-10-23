import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface AuthResponse {
    access_token: string;
    refresh_token?: string;
    user_type?: "OWNER" | "TENANT" | "MODERATOR";
    first_name?: string;
    last_name?: string;
    phone_number?: string;
}

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://147.45.68.231:8081/api/v1/" }),
    tagTypes: ["Auth"],
    endpoints: (builder) => ({
        sendSignupCode: builder.mutation<{ success: boolean }, { phone_number: string }>({
            query: (body) => ({
                url: "auth/signup/code",
                method: "POST",
                body,
            }),
        }),

        signup: builder.mutation<AuthResponse, {
            phone_number: string;
            verification_code: string;
            first_name: string;
            middle_name: string;
            last_name: string;
            user_type: "OWNER" | "TENANT";
        }>({
            query: (body) => ({
                url: "auth/signup",
                method: "POST",
                body,
            }),
        }),

        sendOwnerSigninCode: builder.mutation<{ success: boolean }, { phone_number: string }>({
            query: (body) => ({
                url: "auth/owner/signin/code",
                method: "POST",
                body,
            }),
        }),

        ownerSignin: builder.mutation<AuthResponse, { phone_number: string; verification_code: string }>({
            query: (body) => ({
                url: "auth/owner/signin",
                method: "POST",
                body,
            }),
        }),

        sendTenantSigninCode: builder.mutation<{ success: boolean }, { phone_number: string }>({
            query: (body) => ({
                url: "auth/tenant/signin/code",
                method: "POST",
                body,
            }),
        }),

        tenantSignin: builder.mutation<AuthResponse, { phone_number: string; verification_code: string }>({
            query: (body) => ({
                url: "auth/tenant/signin",
                method: "POST",
                body,
            }),
        }),

        moderatorSignin: builder.mutation<AuthResponse, { username: string; password: string }>({
            query: (body) => ({
                url: "auth/moderator/signin",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const {
    useSendSignupCodeMutation,
    useSignupMutation,
    useSendOwnerSigninCodeMutation,
    useOwnerSigninMutation,
    useSendTenantSigninCodeMutation,
    useTenantSigninMutation,
    useModeratorSigninMutation,
} = authApi;
