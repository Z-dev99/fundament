"use client";

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

                            <h1 className={styles.title}>
                                {object.area_total} м² · {object.rooms_count}-комн.{" "}
                                {object.property_type}
                            </h1>

                            <h2 className={styles.price}>
                                {object.price} {object.currency}
                            </h2>

                            <div className={styles.details}>
                                <div>
                                    {object.floor} / {object.floors_total}
                                    <span>Этаж</span>
                                </div>
                                <div>
                                    {object.ceiling_height} м
                                    <span>Потолки</span>
                                </div>
                                <div>
                                    {object.year_built}
                                    <span>Год постройки</span>
                                </div>
                                <div>
                                    {object.wall_material}
                                    <span>Материал стен</span>
                                </div>
                                <div>
                                    {object.bathroom_layout}
                                    <span>Санузел</span>
                                </div>
                            </div>
                            <div className={styles.description}>
                                <h3>Описание</h3>
                                <p>{object.description}</p>
                            </div>
                        </div>

                        <div className={styles.right}>
                            <div className={styles.ownerCard}>
                                <div className={styles.ownerInfo}>
                                    <img
                                        src="/images/avatar.png"
                                        alt="Аватар"
                                        className={styles.avatar}
                                    />
                                    <div>
                                        <div className={styles.ownerName}>Алексей</div>
                                        <div className={styles.ownerStatus}>Размещено собственником</div>
                                    </div>
                                </div>

                                <div className={styles.ownerAddress}>
                                    <p>Казань, Профессорский переулок, 4</p>
                                </div>

                                <div className={styles.ownerActions}>
                                    <button className={styles.phoneBtn}>Показать телефон</button>
                                    <button className={styles.messageBtn}>Написать</button>
                                </div>
                            </div>

                        </div>

                    </div>
                </section>
            </ProtectedRoute>
        </BaseLayout>
    );
}
