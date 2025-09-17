export enum PropertyDealType {
    RENT = "RENT",
    SALE = "SALE",
}

export enum PropertyType {
    APARTMENT = "APARTMENT",
    HOUSE = "HOUSE",
    COMMERCIAL = "COMMERCIAL",
    LAND = "LAND",
}

export enum WallMaterial {
    BRICK = "BRICK",
    PANEL = "PANEL",
    MONOLITH = "MONOLITH",
}

export enum BathroomLayout {
    COMBINED = "COMBINED",
    SEPARATE = "SEPARATE",
}

export interface Announcement {
    id: string;
    title: string;
    price: string;
    currency: string;
    type: PropertyDealType;
    property_type: PropertyType;
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

export interface AddAnnouncementPayload {
    title: string;
    description: string;
    type: PropertyDealType;
    property_type: PropertyType;
    rooms_count: number;
    floor: number;
    floors_total: number;
    area_total: string;
    area_living: string;
    area_kitchen: string;
    ceiling_height: number;
    year_built: number;
    wall_material: WallMaterial;
    bathroom_layout: BathroomLayout;
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
