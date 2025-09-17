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
    const [showContacts, setShowContacts] = useState(false);
    const [copied, setCopied] = useState(false);

    const rawPhone = (property as any).phone ?? "+998 90 123 45 67";
    const phoneHref = rawPhone.replace(/[^\d+]/g, "");
    const displayedPhone = rawPhone;

    const handleCall = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        window.location.href = `tel:${phoneHref}`;
    };

    const handleSms = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        window.location.href = `sms:${phoneHref}`;
    };
    const handleCopy = async (e?: React.MouseEvent) => {
        e?.stopPropagation();
        try {
            await navigator.clipboard.writeText(phoneHref);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        }
    };
    const goToDetails = () => {
        router.push(`/catalog/${property.id}`);
    };
    return (
        <>
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
                        pagination={{ clickable: true }}
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
                                        height={180}
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
                                    height={180}
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
                                onClick={() => setShowContacts(true)}
                            >
                                Показать телефон
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

            {showContacts && (
                <div
                    className={styles.modalOverlay}
                    onClick={() => setShowContacts(false)}
                    role="dialog"
                    aria-modal="true"
                >
                    <div
                        className={styles.modal}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className={styles.closeBtn}
                            onClick={() => setShowContacts(false)}
                            aria-label="Закрыть"
                        >
                            ×
                        </button>

                        <div className={styles.modalHeader}>
                            <h3 className={styles.ownerName}>Иван Иванов</h3>
                            <span className={styles.ownerRole}>Собственник</span>
                        </div>

                        <div className={styles.phoneBlock}>
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={styles.phoneIcon}
                                aria-hidden
                            >
                                <path
                                    d="M6.6 10.8a15.0 15.0 0 006.6 6.6l1.8-1.8a1 1 0 01.9-.27c1.0.25 2.0.38 3.0.38a1 1 0 011 1V20a1 1 0 01-1 1c-9.4 0-17-7.6-17-17a1 1 0 011-1h3.5a1 1 0 011 1c0 1.0.13 2.0.38 3.0.09.36-.02.74-.27.99L6.6 10.8z"
                                    fill="currentColor"
                                />
                            </svg>

                            <a
                                href={`tel:${phoneHref}`}
                                className={styles.phoneLink}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {displayedPhone}
                            </a>
                        </div>

                        <div className={styles.modalActions}>
                            <button
                                className={styles.btnCall}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCall(e);
                                }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                                    <path
                                        d="M6.6 10.8a15 15 0 006.6 6.6l1.8-1.8a1 1 0 01.9-.27c1 .25 2 .38 3 .38a1 1 0 011 1V20a1 1 0 01-1 1c-9.4 0-17-7.6-17-17a1 1 0 011-1h3.5a1 1 0 011 1c0 1 .13 2 .38 3 .09.36-.02.74-.27.99L6.6 10.8z"
                                        fill="currentColor"
                                    />
                                </svg>
                                <span>Позвонить</span>
                            </button>
                        </div>
                        <div className={styles.bottomRow}>
                            <button
                                className={styles.btnCopy}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCopy(e);
                                }}
                                aria-pressed={copied}
                            >
                                {copied ? "Скопировано" : "Копировать номер"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PropertyCard;
