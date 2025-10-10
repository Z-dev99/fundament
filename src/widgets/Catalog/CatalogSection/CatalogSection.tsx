"use client";
import React, { useState, useEffect } from "react";
import { Filters } from "../Filters/Filters";
import styles from "./styles.module.scss";
import { Property, PropertyList } from "../PropertyList/PropertyList";
import { NewsSection } from "@/widgets/MainPage/NewsSection/NewsSection";
import { ReviewsSection } from "@/widgets/MainPage/ReviewsSection/ReviewsSection";
import { ContactsSection } from "@/widgets/MainPage/ContactsSection/ContactsSection";

const cities = [
    { city: "Ташкент", district: "Мирзо-Улугбекский" },
    { city: "Самарканд", district: "Регистан" },
    { city: "Бухара", district: "Исторический центр" },
    { city: "Нукус", district: "Центр" },
    { city: "Фергана", district: "Ал-Фаргони" },
];

const propertyTypes: Property["property_type"][] = [
    "APARTMENT",
    "HOUSE",
    "OFFICE",
    "OBJECT",
];

const dealTypes: Property["type"][] = ["SALE", "RENT"];
const currencies: Property["currency"][] = ["USD", "UZS"];

export const mockProperties: Property[] = Array.from({ length: 500 }, (_, i) => {
    const cityData = cities[Math.floor(Math.random() * cities.length)];
    const type = dealTypes[Math.floor(Math.random() * dealTypes.length)];
    const property_type =
        propertyTypes[Math.floor(Math.random() * propertyTypes.length)];

    const rooms = Math.ceil(Math.random() * 5);
    const area = 30 + Math.floor(Math.random() * 200);
    const floors_total = 1 + Math.floor(Math.random() * 15);
    const floor = Math.min(Math.ceil(Math.random() * floors_total), floors_total);

    const price =
        type === "SALE"
            ? 30000 + Math.floor(Math.random() * 500000)
            : 200 + Math.floor(Math.random() * 2000);

    return {
        id: (i + 1).toString(),
        title: `${rooms}-комн. ${property_type.toLowerCase()}`,
        price,
        currency: currencies[Math.floor(Math.random() * currencies.length)],
        type,
        property_type,
        rooms_count: rooms,
        area_total: area,
        floor,
        floors_total,
        city: cityData.city,
        district: cityData.district,
        street: `Улица ${i + 10}`,
        price_per_m2: Math.floor(price / area),
        published_at: new Date(
            Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30
        ).toISOString(),
        is_new: Math.random() > 0.7,
        images: [
            `https://picsum.photos/400/300?random=${i * 2 + 1}`,
            `https://picsum.photos/400/300?random=${i * 2 + 2}`,
        ],
    };
});

const ITEMS_PER_PAGE = 5;

export const CatalogSection: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const totalPages = Math.ceil(mockProperties.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = mockProperties.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 1500);

        return () => clearTimeout(timer);
    }, [currentPage]);

    return (
        <>
            <section className={styles.section}>
                <div className={styles.container}>
                    <aside className={styles.sidebar}>
                        <Filters />
                    </aside>
                    <div className={styles.content}>
                        <div className={styles.listPlaceholder}>
                            {loading ? (
                                <div className={styles.skeletonList}>
                                    {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                                        <div key={i} className={styles.skeletonCard} />
                                    ))}
                                </div>
                            ) : (
                                <PropertyList properties={currentItems} total={500} />
                            )}
                        </div>
                        {!loading && (
                            <div className={styles.pagination}>
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((p) => p - 1)}
                                >
                                    ◀ Назад
                                </button>

                                <span>
                                    Страница {currentPage} из {totalPages}
                                </span>

                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage((p) => p + 1)}
                                >
                                    Вперёд ▶
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <NewsSection />
            <ReviewsSection />
            <ContactsSection />
        </>
    );
};
