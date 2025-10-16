"use client";

import React, { useState, useEffect } from "react";
import { Filters } from "../Filters/Filters";
import styles from "./styles.module.scss";
import { PropertyList } from "../PropertyList/PropertyList";
import { NewsSection } from "@/widgets/MainPage/NewsSection/NewsSection";
import { ReviewsSection } from "@/widgets/MainPage/ReviewsSection/ReviewsSection";
import { ContactsSection } from "@/widgets/MainPage/ContactsSection/ContactsSection";
import { useGetAnnouncementsQuery } from "@/shared/api/announcementApi";
import type { Announcement } from "@/shared/api/announcementApi";

type DealType = "RENT" | "SALE";

interface CatalogSectionProps {
    type: DealType;
}

const ITEMS_PER_PAGE = 5;

export const CatalogSection: React.FC<CatalogSectionProps> = ({ type }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const { data, error, isLoading, isFetching } = useGetAnnouncementsQuery({
        announcement_type: type,
        page: currentPage,
        page_size: ITEMS_PER_PAGE,
    });

    const announcements = data?.announcements ?? [];
    const total = data?.total ?? 0;
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

    useEffect(() => {
        if (!isFetching) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [currentPage, isFetching]);

    return (
        <>
            <section className={styles.section}>
                <div className={styles.container}>
                    {error ? (
                        <div className={styles.fullBlock}>
                            <div className={styles.errorBlock}>
                                <p>Ошибка при загрузке объявлений</p>
                            </div>
                        </div>
                    ) : isLoading || isFetching ? (
                        <div className={styles.skeletonList}>
                            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                                <div key={i} className={styles.skeletonCard} />
                            ))}
                        </div>
                    ) : announcements.length === 0 ? (
                        <div className={styles.fullBlock}>
                            <div className={styles.emptyBlock}>
                                <p> Объявлений не найдено</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <aside className={styles.sidebar}>
                                <Filters />
                            </aside>

                            <div className={styles.content}>
                                <PropertyList
                                    properties={announcements.map((a: Announcement) => ({
                                        id: a.id,
                                        title: a.title,
                                        price: Number(a.price),
                                        currency: a.currency,
                                        type: a.type,
                                        property_type: a.property_type,
                                        rooms_count: a.rooms_count,
                                        area_total: Number(a.area_total),
                                        floor: a.floor,
                                        floors_total: a.floors_total,
                                        city: a.city,
                                        district: a.district,
                                        images: a.images,
                                    }))}
                                    total={total}
                                />

                                {totalPages > 1 && (
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
                        </>
                    )}
                </div>
            </section>

            <NewsSection />
            <ReviewsSection />
            <ContactsSection />
        </>
    );
};
