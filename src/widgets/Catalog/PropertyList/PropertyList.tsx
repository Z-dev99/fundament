import React from "react";
import styles from "./styles.module.scss";
import PropertyCard from "./PropertyCard";

export type PropertyType = "APARTMENT" | "HOUSE" | "OFFICE" | "OBJECT";
export type PropertyDealType = "RENT" | "SALE";
export type Currency = "USD" | "UZS";

export interface Property {
    id: string;
    title: string;
    price: number;
    currency: Currency;
    type: PropertyDealType;
    property_type: PropertyType;
    rooms_count: number;
    area_total: number;
    floor: number;
    floors_total: number;
    city: string;
    district: string;

    street?: string;
    price_per_m2?: number;
    published_at?: string;
    is_new?: boolean;
    description?: string;

    images: string[];
}

interface Props {
    properties: Property[];
}

export const PropertyList: React.FC<Props> = ({ properties }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                Найдено: <span>{properties.length}</span> объявлений
            </div>
            <div className={styles.list}>
                {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>
        </div>
    );
};
