import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApi = createApi({
    reducerPath: "reviewApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://147.45.68.231:8081/api/v1/" }),
    tagTypes: ["Review"],
    endpoints: (builder) => ({
        getReviews: builder.query<
            {
                total: number;
                size: number;
                reviews: {
                    id: string;
                    review: string;
                    grade: number;
                    owner: string;
                    created_at: string;
                    user_first_name: string;
                    user_last_name: string;
                }[];
            },
            { page?: number; page_size?: number; status?: string }
        >({
            query: ({ page = 1, page_size = 6, status = "ACTIVE" }) =>
                `review?page=${page}&page_size=${page_size}&status=${status}`,
            providesTags: ["Review"],
        }),

        addReview: builder.mutation<
            any,
            { review: string; grade: number }
        >({
            query: (body) => ({
                url: "review",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Review"],
        }),

        confirmReview: builder.mutation<
            any,
            { id: string; data: Partial<{ review: string; grade: number; status: string }> }
        >({
            query: ({ id, data }) => ({
                url: `review/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Review"],
        }),

        deleteReview: builder.mutation<void, string>({
            query: (id) => ({
                url: `review/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Review"],
        }),
    }),
});

export const {
    useGetReviewsQuery,
    useAddReviewMutation,
    useConfirmReviewMutation,
    useDeleteReviewMutation,
} = reviewApi;
