"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import BaseLayout from "@/layouts/base-layout";
import ProtectedRoute from "@/widgets/ProtectedRoute";
import styles from "./styles.module.scss";
import { AddAnnouncementBody } from "@/shared/api/announcementApi";

interface ObjectDetailClientProps {
    id: string;
}

export default function ObjectDetailClient({ id }: ObjectDetailClientProps) {
    const [isLoadingPhone, setIsLoadingPhone] = useState(false);
    const [showPhone, setShowPhone] = useState(false);

    const object: AddAnnouncementBody = {
        title: "4-комнатная квартира в ЖК Достояние",
        description:
            "Сдаётся светлая, уютная квартира на долгий срок в новом ЖК 'Достояние'. Полностью укомплектована мебелью и бытовой техникой. В доме чистый, ухоженный подъезд, консьерж, помещения для хранения колясок и велосипедов, современная детская площадка и парковка.",
        type: "SALE",
        property_type: "Квартира",
        rooms_count: 4,
        floor: 4,
        floors_total: 9,
        area_total: "183.4",
        area_living: "83.4",
        area_kitchen: "39",
        ceiling_height: 2.8,
        year_built: 2006,
        wall_material: "Монолитный дом",
        bathroom_layout: "Раздельный",
        price: "53 000 000",
        currency: "₽",
        country: "Россия",
        region: "Татарстан",
        city: "Казань",
        district: "Советский",
        street: "Профсоюзная",
        house_number: "9",
        block: "",
        apartment: "43",
        postal_code: "420124",
        latitude: "55.7961",
        longitude: "49.1064",
        cadastral_number: "16:50:123456:789",
        available_from: "2025-10-01",
        contact_phone: "+7 (999) 123-45-67",
        contact_email: "alexey@example.com",
        images: [
            "https://images.unsplash.com/photo-1598928506311-c55ded91a20c",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        ],
        subscription_id: "sub_001",
    };

    const handleShowPhone = async () => {
        if (showPhone || isLoadingPhone) return;
        setIsLoadingPhone(true);

        await new Promise((resolve) => setTimeout(resolve, 1200));

        setIsLoadingPhone(false);
        setShowPhone(true);
    };

    return (
        <BaseLayout>
            <ProtectedRoute>
                <section className={styles.section}>
                    <div className={styles.container}>
                        <div className={styles.left}>
                            <Swiper
                                modules={[Navigation]}
                                navigation
                                slidesPerView={1}
                                spaceBetween={0}
                                className={styles.swiper}
                            >
                                {object.images.map((photo, index) => (
                                    <SwiperSlide key={index}>
                                        <img
                                            src={photo}
                                            alt={`Фото ${index + 1}`}
                                            className={styles.image}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <div className={styles.objectHeader}>
                                <h1 className={styles.title}>
                                    {object.area_total} м² · {object.rooms_count}-комн. {object.property_type}
                                </h1>

                                <h2 className={styles.price}>
                                    {object.price} {object.currency}
                                </h2>
                            </div>

                            <div className={styles.detailsGrid}>
                                <div className={styles.detailItem}>
                                    <span className={styles.icon}>🏢</span>
                                    <div>
                                        <strong>{object.floor} / {object.floors_total}</strong>
                                        <p>Этаж</p>
                                    </div>
                                </div>

                                <div className={styles.detailItem}>
                                    <span className={styles.icon}>📏</span>
                                    <div>
                                        <strong>{object.ceiling_height} м</strong>
                                        <p>Потолки</p>
                                    </div>
                                </div>

                                <div className={styles.detailItem}>
                                    <span className={styles.icon}>🏗️</span>
                                    <div>
                                        <strong>{object.year_built}</strong>
                                        <p>Год постройки</p>
                                    </div>
                                </div>

                                <div className={styles.detailItem}>
                                    <span className={styles.icon}>🧱</span>
                                    <div>
                                        <strong>{object.wall_material}</strong>
                                        <p>Материал стен</p>
                                    </div>
                                </div>

                                <div className={styles.detailItem}>
                                    <span className={styles.icon}>🚿</span>
                                    <div>
                                        <strong>{object.bathroom_layout}</strong>
                                        <p>Санузел</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.descriptionCard}>
                                <h3>Описание</h3>
                                <p>{object.description}</p>
                            </div>

                        </div>

                        <div className={styles.right}>
                            <div className={styles.ownerCard}>
                                <div className={styles.ownerInfo}>
                                    <div className={styles.avatar}>А</div>
                                    <div>
                                        <div className={styles.ownerName}>Алексей</div>
                                        <div className={styles.ownerStatus}>Размещено собственником</div>
                                    </div>
                                </div>

                                <button
                                    className={styles.phoneBtn}
                                    onClick={handleShowPhone}
                                    disabled={isLoadingPhone}
                                >
                                    {isLoadingPhone
                                        ? "⏳ Загрузка..."
                                        : showPhone
                                            ? object.contact_phone
                                            : "📞 Показать телефон"}
                                </button>

                                <div className={styles.ownerLocation}>
                                    <div className={styles.mapPreview}>
                                        <iframe
                                            title="Карта"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0, borderRadius: "12px" }}
                                            loading="lazy"
                                            allowFullScreen
                                            src={`https://www.google.com/maps?q=${object.city},+${object.street},+${object.house_number}&output=embed`}
                                        ></iframe>
                                    </div>
                                    <div className={styles.addressText}>
                                        <div className={styles.mapIcon}>📍</div>
                                        <div>
                                            <div className={styles.city}>{object.city}</div>
                                            <div className={styles.street}>
                                                {object.street}, {object.house_number}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </ProtectedRoute>
        </BaseLayout>
    );
}
