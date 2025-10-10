import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Contact {
    id: string;
    first_name: string;
    phone_number: string;
    details: string;
}

export const contactApi = createApi({
    reducerPath: "contactApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://147.45.68.231:8081/api/v1/" }),
    tagTypes: ["Contact"],
    endpoints: (builder) => ({
        getContacts: builder.query<Contact[], void>({
            query: () => `contacts`,
            providesTags: ["Contact"],
        }),

        addContact: builder.mutation<Contact, { first_name: string; phone_number: string; details: string }>({
            query: (body) => ({
                url: "contacts",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Contact"],
        }),

        updateContact: builder.mutation<
            Contact,
            { id: string; data: { first_name?: string; phone_number?: string; details?: string } }
        >({
            query: ({ id, data }) => ({
                url: `contacts/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Contact"],
        }),

        deleteContact: builder.mutation<{ success: boolean; id: string }, string>({
            query: (id) => ({
                url: `contacts/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Contact"],
        }),
    }),
});

export const {
    useGetContactsQuery,
    useAddContactMutation,
    useUpdateContactMutation,
    useDeleteContactMutation,
} = contactApi;
