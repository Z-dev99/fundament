import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ownerApi = createApi({
    reducerPath: "ownerApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://147.45.68.231:8081/api/v1/",
        prepareHeaders: (headers) => {
            const token = typeof document !== "undefined"
                ? document.cookie
                    ?.split("; ")
                    .find((row) => row.startsWith("access_token="))
                    ?.split("=")[1]
                : null;

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Owner"],
    endpoints: (builder) => ({
        getOwner: builder.query<
            {
                phone_number: string;
                first_name: string;
                middle_name: string;
                last_name: string;
                created_at: string;
            },
            void
        >({
            query: () => "owner/me",
            providesTags: ["Owner"],
        }),
    }),
});

export const { useGetOwnerQuery } = ownerApi;
