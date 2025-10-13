"use client";

import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Property } from "./PropertyList";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PropertyCardProps {
    property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
    const router = useRouter();
    const [phone, setPhone] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const phoneHref = phone ? phone.replace(/[^\d+]/g, "") : "";

    const goToDetails = () => {
        router.push(`/catalog/${property.id}`);
    };

    // Имитация запроса к серверу для получения номера
    const fetchPhone = () => {
        setLoading(true);
        setTimeout(() => {
            const serverPhone = (property as any).phone ?? "+998 90 123 45 67";
            setPhone(serverPhone);
            setLoading(false);
        }, 1000); // имитация 1 секунды задержки
    };

    const handleCall = () => {
        if (!phone) return;
        window.location.href = `tel:${phoneHref}`;
    };

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
                    className={styles.swiper}
                >
                    {property.images.length > 0 ? (
                        property.images.map((img, index) => (
                            <SwiperSlide key={index}>
                                <Image
                                    src={img}
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
                    {property.street && `, ${property.street}`}
                </div>

                <div className={styles.meta}>
                    <span>{property.rooms_count}-комн.</span> ·{" "}
                    <span>{property.area_total} м²</span> ·{" "}
                    <span>
                        {property.floor}/{property.floors_total} этаж
                    </span>{" "}
                    · <span>{property.property_type}</span> ·{" "}
                    <span>{property.type === "SALE" ? "Продается" : "Сдается"}</span>
                </div>

                {property.price_per_m2 && (
                    <div className={styles.pricePerM2}>
                        {property.price_per_m2.toLocaleString()} {property.currency}/м²
                    </div>
                )}

                {property.published_at && (
                    <div className={styles.date}>
                        Опубликовано:{" "}
                        {new Date(property.published_at).toLocaleDateString("ru-RU")}
                    </div>
                )}

                {property.description && (
                    <div className={styles.description}>{property.description}</div>
                )}

                <div className={styles.footer}>
                    <div className={styles.price}>
                        {property.price.toLocaleString()} {property.currency}
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

                        <button
                            className={styles.btnDetails}
                            onClick={goToDetails}
                        >
                            Посмотреть
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
