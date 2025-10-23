"use client";

import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Announcement } from "@/shared/api/announcementApi";

interface PropertyCardProps {
    property: Announcement;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
    const router = useRouter();
    const [phone, setPhone] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const phoneHref = phone ? phone.replace(/[^\d+]/g, "") : "";

    const goToDetails = () => {
        router.push(`/catalog/${property.id}`);
    };

    const fetchPhone = () => {
        setLoading(true);
        setTimeout(() => {
            const mockPhone = "+998 90 123 45 67";
            setPhone(mockPhone);
            setLoading(false);
        }, 1000);
    };

    const handleCall = () => {
        if (!phone) return;
        window.location.href = `tel:${phoneHref}`;
    };

    const formattedPrice = Number(property.price).toLocaleString("ru-RU");
    const formattedArea = Number(property.area_total).toLocaleString("ru-RU");

    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <button
                    className={styles.favoriteBtn}
                    onClick={(e) => {
                        e.stopPropagation();
                        alert("Добавлено в избранное");
                    }}
                    aria-label="Добавить в избранное"
                >
                    ❤
                </button>

                <Swiper
                    modules={[Pagination]}
                    spaceBetween={8}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    className={styles.swiper}
                >
                    {property.images.length > 0 ? (
                        property.images.map((img, index) => (
                            <SwiperSlide key={index}>
                                <Image
                                    src={`http://147.45.68.231:9000/img/${img}`}
                                    alt={`${property.title} фото ${index + 1}`}
                                    width={240}
                                    height={281}
                                    className={styles.image}
                                />
                            </SwiperSlide>
                        ))
                    ) : (
                        <SwiperSlide>
                            <Image
                                src="/placeholder.jpg"
                                alt="Нет фото"
                                width={240}
                                height={281}
                                className={styles.image}
                            />
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>

            <div className={styles.content}>
                <div className={styles.title}>{property.title}</div>

                <div className={styles.location}>
                    {property.city}, {property.district}
                </div>

                <div className={styles.meta}>
                    <span>{property.rooms_count}-комн.</span> ·{" "}
                    <span>{formattedArea} м²</span> ·{" "}
                    <span>
                        {property.floor}/{property.floors_total} этаж
                    </span>{" "}
                    · <span>{property.property_type}</span> ·{" "}
                    <span>{property.type === "SALE" ? "Продается" : "Сдается"}</span>
                </div>

                <div className={styles.footer}>
                    <div className={styles.price}>
                        {formattedPrice} {property.currency}
                    </div>

                    <div className={styles.cardActions}>
                        <button
                            className={styles.btnPhone}
                            onClick={phone ? handleCall : fetchPhone}
                            disabled={loading}
                        >
                            {loading
                                ? "Загрузка..."
                                : phone
                                    ? phone
                                    : "Показать телефон"}
                        </button>

                        <button className={styles.btnDetails} onClick={goToDetails}>
                            Посмотреть
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
