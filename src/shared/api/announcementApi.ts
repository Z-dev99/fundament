import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Announcement {
    id: string;
    title: string;
    price: string | number;
    currency: string;
    type: string;
    property_type: string;
    rooms_count: number;
    area_total: string | number;
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
    topTen?: Announcement[];
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

export interface UpdateAnnouncementBody extends Partial<AddAnnouncementBody> { }

export interface AnnouncementDetail extends Announcement {
    description: string;
    area_living: string;
    area_kitchen: string;
    ceiling_height: number;
    year_built: number;
    wall_material: "BRICK" | "PANEL" | "MONOLITH" | string;
    bathroom_layout: "COMBINED" | "SEPARATE" | string;
    house_number: string;
    block: string;
    apartment: string;
    postal_code: string;
    latitude: string;
    longitude: string;
    available_from: string;
}

export interface AnnouncementContacts {
    phone_number: string;
    email: string;
}

// ✅ Улучшенный логгер для API-запросов
const baseQueryWithLogging = async (args: any, api: any, extraOptions: any) => {
    const baseUrl = "http://147.45.68.231:8081/api/v1/";
    const token = (api.getState() as any)?.auth?.token;
    const headers: Record<string, string> = {};

    if (token) headers["Authorization"] = `Bearer ${token}`;

    const url = typeof args === "string" ? args : args.url;
    const method = typeof args === "string" ? "GET" : args.method || "GET";
    const body = typeof args === "string" ? undefined : args.body;

    const start = performance.now();

    console.groupCollapsed(
        `%c📡 API Request → ${method} ${baseUrl}${url}`,
        "color:#00BFFF;font-weight:bold;"
    );
    console.log("Headers:", headers);
    if (body) console.log("Body:", body);
    console.groupEnd();

    const rawBaseQuery = fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
    });

    const result = await rawBaseQuery(args, api, extraOptions);
    const duration = (performance.now() - start).toFixed(1);

    console.groupCollapsed(
        `%c📨 API Response ← ${method} ${baseUrl}${url} (${duration} ms)`,
        "color:#32CD32;font-weight:bold;"
    );

    console.groupEnd();

    return result;
};

export const announcementApi = createApi({
    reducerPath: "announcementApi",
    baseQuery: baseQueryWithLogging,
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
            transformResponse: (response: AnnouncementsResponse) => ({
                ...response,
                topTen: response.announcements.slice(0, 10),
            }),
            providesTags: ["Announcement"],
        }),

        // 🔹 Мои объявления
        getMyAnnouncements: builder.query<AnnouncementsResponse, { page?: number; page_size?: number }>({
            query: ({ page = 1, page_size = 12 } = {}) =>
                `announcements/me?page=${page}&page_size=${page_size}`,
            providesTags: ["Announcement"],
        }),

        // 🔹 Избранные объявления
        getFavoriteAnnouncements: builder.query<AnnouncementsResponse, { page?: number; page_size?: number }>({
            query: ({ page = 1, page_size = 12 } = {}) =>
                `announcements/favorites?page=${page}&page_size=${page_size}`,
            providesTags: ["Announcement"],
        }),

        // 🔹 Получение одного объявления
        getAnnouncementById: builder.query<AnnouncementDetail, string>({
            query: (id) => `announcements/${id}`,
            providesTags: ["Announcement"],
        }),

        // 🔹 Добавление
        addAnnouncement: builder.mutation<Announcement, AddAnnouncementBody>({
            query: (body) => ({
                url: "announcements",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Announcement"],
        }),

        // 🔹 Обновление
        updateAnnouncement: builder.mutation<Announcement, { id: string; data: UpdateAnnouncementBody }>({
            query: ({ id, data }) => ({
                url: `announcements/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Announcement"],
        }),

        // 🔹 Удаление
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
