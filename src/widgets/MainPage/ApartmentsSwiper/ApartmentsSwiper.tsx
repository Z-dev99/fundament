"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Lock } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useGetAnnouncementsQuery } from "@/shared/api/announcementApi";
import styles from "./styles.module.scss";

export const ApartmentsSwiper = () => {
    const { data, isLoading, isError } = useGetAnnouncementsQuery({ announcement_type: 'SALE', page: 1, page_size: 10 });

    if (isLoading) {
        return (
            <section className={styles.wrapper}>
                <h2 className={styles.heading}>Лучшие предложения</h2>
                <div className={styles.skeletonGrid}>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className={styles.skeletonCard}>
                            <div className={styles.skeletonImage}></div>
                            <div className={styles.skeletonText}></div>
                            <div className={styles.skeletonTextShort}></div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    if (isError || !data?.topTen?.length) {
        return (
            <section className={styles.wrapper}>
                <h2 className={styles.heading}>Лучшие предложения</h2>
                <div className={styles.errorBox}>
                    <p>Не удалось загрузить объявления 😔</p>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.wrapper}>
            <h2 className={styles.heading}>Лучшие предложения</h2>

            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={24}
                slidesPerView={1}
                navigation
                breakpoints={{
                    768: { slidesPerView: 2 },
                    1200: { slidesPerView: 3 },
                }}
            >
                {data.topTen.map((apartment) => (
                    <SwiperSlide key={apartment.id} onClick={() => { }}>
                        <div className={`${styles.card} ${styles.blurred}`}>
                            <div className={styles.imageWrapper}>
                                <img
                                    src={
                                        apartment.images?.[0]
                                            ? 'http://147.45.68.231:9000/img/' + apartment.images[0]
                                            : "/apartments/ap1.jpg"
                                    }
                                    alt={apartment.title}
                                    className={styles.image}
                                />
                                {apartment.type === "RENT" && (
                                    <span className={styles.badge}>Аренда</span>
                                )}
                                {apartment.type === "SALE" && (
                                    <span className={`${styles.badge} ${styles.sale}`}>
                                        Продажа
                                    </span>
                                )}
                            </div>

                            <div className={styles.content}>
                                <h3 className={styles.title}>{apartment.title}</h3>
                                <p className={styles.subtitle}>
                                    {apartment.rooms_count}-комнатная · {apartment.area_total} м²
                                </p>
                                <p className={styles.address}>
                                    {apartment.city}, {apartment.district}
                                </p>

                                <div className={styles.priceBlock}>
                                    <span className={styles.price}>
                                        {apartment.price} {apartment.currency}
                                    </span>
                                </div>

                                <div className={styles.actions}>
                                    <button className={styles.btnPrimary}>Показать телефон</button>
                                    <button className={styles.btnSecondary}>Подробнее</button>
                                </div>
                            </div>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};
