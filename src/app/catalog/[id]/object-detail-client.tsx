"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import BaseLayout from "@/layouts/base-layout";
import styles from "./styles.module.scss";
import { AnnouncementDetail, useGetAnnouncementByIdQuery } from "@/shared/api/announcementApi";
import Gallery from "@/widgets/Gallery/Gallery";

interface ObjectDetailClientProps {
    id: string;
}

export default function ObjectDetailClient({ id }: ObjectDetailClientProps) {
    const [isLoadingPhone, setIsLoadingPhone] = useState(false);
    const [showPhone, setShowPhone] = useState(false);
    const { data: object, isLoading, isError } = useGetAnnouncementByIdQuery(id);

    const handleShowPhone = async () => {
        if (showPhone || isLoadingPhone) return;
        setIsLoadingPhone(true);
        await new Promise((resolve) => setTimeout(resolve, 1200));
        setIsLoadingPhone(false);
        setShowPhone(true);
    };

    if (isLoading) {
        return (
            <BaseLayout>
                <section className={styles.loadingSection}>
                    <div className={styles.skeletonWrapper}>
                        <div className={styles.skeletonImage}></div>

                        <div className={styles.skeletonTitle}></div>
                        <div className={styles.skeletonSubtitle}></div>

                        <div className={styles.skeletonGrid}>
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className={styles.skeletonItem}></div>
                            ))}
                        </div>

                        <div className={styles.skeletonDescription}></div>
                    </div>
                </section>
            </BaseLayout>
        );
    }


    if (isError || !object) {
        return (
            <BaseLayout>
                <section className={styles.errorSection}>
                    <div className={styles.errorCard}>
                        <div className={styles.errorIcon}>⚠️</div>
                        <h2>Ошибка загрузки объявления</h2>
                        <p>
                            Не удалось получить данные. Проверьте соединение с интернетом
                            или попробуйте позже.
                        </p>
                        <button
                            className={styles.retryButton}
                            onClick={() => window.location.reload()}
                        >
                            Повторить попытку
                        </button>
                    </div>
                </section>
            </BaseLayout>
        );
    }


    const announcement = object as AnnouncementDetail;

    return (
        <BaseLayout>
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.left}>
                        <Gallery images={announcement.images || []} />
                        <div className={styles.objectHeader}>
                            <h1 className={styles.title}>
                                {announcement.area_total} м² ·{" "}
                                {announcement.rooms_count}-комн.{" "}
                                {announcement.property_type.toLowerCase()}
                            </h1>
                            <h2 className={styles.price}>
                                {announcement.price} {announcement.currency}
                            </h2>
                        </div>

                        <div className={styles.detailsGrid}>
                            <DetailItem icon="🏢" label="Этаж">
                                {announcement.floor} / {announcement.floors_total}
                            </DetailItem>
                            <DetailItem icon="📏" label="Потолки">
                                {announcement.ceiling_height} м
                            </DetailItem>
                            <DetailItem icon="🏗️" label="Год постройки">
                                {announcement.year_built}
                            </DetailItem>
                            <DetailItem icon="🧱" label="Материал стен">
                                {announcement.wall_material}
                            </DetailItem>
                            <DetailItem icon="🚿" label="Санузел">
                                {announcement.bathroom_layout}
                            </DetailItem>
                        </div>

                        <div className={styles.descriptionCard}>
                            <h3>Описание</h3>
                            <p>{announcement.description}</p>
                        </div>
                    </div>

                    <div className={styles.right}>
                        <div className={styles.ownerCard}>
                            <div className={styles.ownerInfo}>
                                {/* <div className={styles.avatar}>
                                        {announcement.contact_email
                                            ? announcement.contact_email[0].toUpperCase()
                                            : "U"}
                                    </div> */}
                                <div>
                                    {/* <div className={styles.ownerName}>
                                            {announcement.contact_email?.split("@")[0] || "Пользователь"}
                                        </div> */}
                                    <div className={styles.ownerStatus}>
                                        Размещено собственником
                                    </div>
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
                                        ? announcement.apartment || "Нет телефона"
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
                                        src={`https://www.google.com/maps?q=${encodeURIComponent(
                                            `${announcement.city}, ${announcement.house_number}`
                                        )}&output=embed`}
                                    ></iframe>
                                </div>
                                <div className={styles.addressText}>
                                    <div className={styles.mapIcon}>📍</div>
                                    <div>
                                        <div className={styles.city}>{announcement.city}</div>
                                        <div className={styles.street}>
                                            {/* {announcement?.stree ?? ''}, {announcement.house_number} */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </BaseLayout>
    );
}

function DetailItem({ icon, label, children }: { icon: string; label: string; children: React.ReactNode }) {
    return (
        <div className={styles.detailItem}>
            <span className={styles.icon}>{icon}</span>
            <div>
                <strong>{children}</strong>
                <p>{label}</p>
            </div>
        </div>
    );
}
