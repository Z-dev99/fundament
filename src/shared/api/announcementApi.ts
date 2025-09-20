import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Announcement {
    id: string;
    title: string;
    price: string;
    currency: string;
    type: string;
    property_type: string;
    rooms_count: number;
    area_total: string;
    floor: number;
    floors_total: number;
    city: string;
    district: string;
    images: string[];
}

export interface AnnouncementsResponse {
    total: number;
    size: number;
    announcements: Announcement[];
}

export interface AnnouncementsFilters {
    announcement_type?: string;
    property_type?: string;
    order_by?: string;
    currency?: string;
    priceFrom?: number;
    priceTo?: number;
    min_rooms?: number;
    max_rooms?: number;
    min_area_total?: number;
    max_area_total?: number;
    min_area_living?: number;
    max_area_living?: number;
    min_area_kitchen?: number;
    max_area_kitchen?: number;
    min_floor?: number;
    max_floor?: number;
    min_floors_total?: number;
    max_floors_total?: number;
    min_year_built?: number;
    max_year_built?: number;
    country?: string;
    region?: string;
    city?: string;
    district?: string;
    street?: string;
    wall_material?: string;
    bathroom_layout?: string;
    page?: number;
    page_size?: number;
}

export interface AddAnnouncementBody {
    title: string;
    description: string;
    type: "RENT" | "SALE";
    property_type: string;
    rooms_count: number;
    floor: number;
    floors_total: number;
    area_total: string;
    area_living: string;
    area_kitchen: string;
    ceiling_height: number;
    year_built: number;
    wall_material: string;
    bathroom_layout: string;
    price: string;
    currency: string;
    country: string;
    region: string;
    city: string;
    district: string;
    street: string;
    house_number: string;
    block: string;
    apartment: string;
    postal_code: string;
    latitude: string;
    longitude: string;
    cadastral_number: string;
    available_from: string;
    contact_phone: string;
    contact_email: string;
    images: string[];
    subscription_id: string;
}

export interface UpdateAnnouncementBody {
    title?: string;
    description?: string;
    type?: "RENT" | "SALE";
    property_type?: string;
    rooms_count?: number;
    floor?: number;
    floors_total?: number;
    area_total?: string;
    area_living?: string;
    area_kitchen?: string;
    ceiling_height?: number;
    year_built?: number;
    wall_material?: string;
    bathroom_layout?: string;
    price?: string;
    currency?: string;
    country?: string;
    region?: string;
    city?: string;
    district?: string;
    street?: string;
    house_number?: string;
    block?: string;
    apartment?: string;
    postal_code?: string;
    latitude?: string;
    longitude?: string;
    cadastral_number?: string;
    available_from?: string;
    contact_phone?: string;
    contact_email?: string;
    subscription_id?: string;
    images?: string[];
}

export interface AnnouncementContacts {
    phone_number: string;
    email: string;
}

export const announcementApi = createApi({
    reducerPath: "announcementApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://45.92.173.41:8000/api/v1/",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as any).auth?.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Announcement"],
    endpoints: (builder) => ({
        getAnnouncements: builder.query<AnnouncementsResponse, AnnouncementsFilters>({
            query: (filters) => {
                const params = new URLSearchParams();
                Object.entries(filters).forEach(([key, value]) => {
                    if (value !== undefined && value !== "") {
                        params.append(key, value.toString());
                    }
                });
                return `announcements?${params.toString()}`;
            },
            providesTags: ["Announcement"],
        }),

        getMyAnnouncements: builder.query<AnnouncementsResponse, { page?: number; page_size?: number }>({
            query: ({ page = 1, page_size = 12 } = {}) =>
                `announcements/me?page=${page}&page_size=${page_size}`,
            providesTags: ["Announcement"],
        }),

        getFavoriteAnnouncements: builder.query<AnnouncementsResponse, { page?: number; page_size?: number }>({
            query: ({ page = 1, page_size = 12 } = {}) =>
                `announcements/favorites?page=${page}&page_size=${page_size}`,
            providesTags: ["Announcement"],
        }),

        getAnnouncementById: builder.query<Announcement, string>({
            query: (id) => `announcements/${id}`,
            providesTags: ["Announcement"],
        }),

        addAnnouncement: builder.mutation<Announcement, AddAnnouncementBody>({
            query: (body) => ({
                url: "announcements",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Announcement"],
        }),

        updateAnnouncement: builder.mutation<Announcement, { id: string; data: UpdateAnnouncementBody }>({
            query: ({ id, data }) => ({
                url: `announcements/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Announcement"],
        }),

        deleteAnnouncement: builder.mutation<{ success: boolean; id: string }, string>({
            query: (id) => ({
                url: `announcements/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Announcement"],
        }),

        getAnnouncementContacts: builder.query<AnnouncementContacts, string>({
            query: (id) => `announcements/${id}/contacts`,
        }),

        confirmAnnouncement: builder.mutation<Announcement, string>({
            query: (id) => ({
                url: `announcements/${id}/confirm`,
                method: "PATCH",
            }),
            invalidatesTags: ["Announcement"],
        }),

        rejectAnnouncement: builder.mutation<Announcement, string>({
            query: (id) => ({
                url: `announcements/${id}/reject`,
                method: "PATCH",
            }),
            invalidatesTags: ["Announcement"],
        }),
    }),
});

export const {
    useGetAnnouncementsQuery,
    useGetMyAnnouncementsQuery,
    useGetFavoriteAnnouncementsQuery,
    useGetAnnouncementByIdQuery,
    useAddAnnouncementMutation,
    useUpdateAnnouncementMutation,
    useDeleteAnnouncementMutation,
    useGetAnnouncementContactsQuery,
    useConfirmAnnouncementMutation,
    useRejectAnnouncementMutation,
} = announcementApi;
