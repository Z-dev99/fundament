"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Lock } from "lucide-react"; // иконка замка

import styles from "./styles.module.scss";

const apartments = [
    {
        id: 1,
        image: "/apartments/ap1.jpg",
        title: "109 м² · 2-комнатная квартира",
        subtitle: "6 этаж из 6",
        address: "Ильинский, Пролетарская улица, 49/1А",
        description:
            "В продаже квартира площадью 40.00 в новом жилом комплексе. Дом расположен в престижной части города.",
        price: "120 000 $",
        pricePerM2: "1 200 $ за м²",
        date: "8 августа 2025",
        isNew: true,
        isLocked: true,
    },
    {
        id: 2,
        image: "/apartments/ap1.jpg",
        title: "109 м² · 2-комнатная квартира",
        subtitle: "6 этаж из 6",
        address: "Ильинский, Пролетарская улица, 49/1А",
        description:
            "В продаже квартира площадью 40.00 в новом жилом комплексе. Дом расположен в престижной части города.",
        price: "120 000 $",
        pricePerM2: "1 200 $ за м²",
        date: "8 августа 2025",
        isNew: true,
        isLocked: true,
    },
    {
        id: 3,
        image: "/apartments/ap1.jpg",
        title: "109 м² · 2-комнатная квартира",
        subtitle: "6 этаж из 6",
        address: "Ильинский, Пролетарская улица, 49/1А",
        description:
            "В продаже квартира площадью 40.00 в новом жилом комплексе. Дом расположен в престижной части города.",
        price: "120 000 $",
        pricePerM2: "1 200 $ за м²",
        date: "8 августа 2025",
        isNew: true,
        isLocked: true,
    },
    {
        id: 4,
        image: "/apartments/ap1.jpg",
        title: "109 м² · 2-комнатная квартира",
        subtitle: "6 этаж из 6",
        address: "Ильинский, Пролетарская улица, 49/1А",
        description:
            "В продаже квартира площадью 40.00 в новом жилом комплексе. Дом расположен в престижной части города.",
        price: "120 000 $",
        pricePerM2: "1 200 $ за м²",
        date: "8 августа 2025",
        isNew: true,
        isLocked: true,
    },

];
export const ApartmentsSwiper = () => {
    return (
        <div className={styles.wrapper}>
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
                {apartments.map((apartment) => (
                    <SwiperSlide key={apartment.id}>
                        <div className={`${styles.card} ${apartment.isLocked ? styles.blurred : ""}`}>
                            <div className={styles.imageWrapper}>
                                <img
                                    src={apartment.image}
                                    alt={apartment.title}
                                    className={styles.image}
                                />
                                {apartment.isNew && <span className={styles.badge}>new</span>}
                            </div>

                            <div className={styles.content}>
                                <h3 className={styles.title}>{apartment.title}</h3>
                                <p className={styles.subtitle}>{apartment.subtitle}</p>
                                <p className={styles.address}>{apartment.address}</p>
                                <p className={styles.description}>{apartment.description}</p>

                                <div className={styles.priceBlock}>
                                    <span className={styles.price}>{apartment.price}</span>
                                    <span className={styles.pricePerM2}>
                                        {apartment.pricePerM2}
                                    </span>
                                </div>

                                <div className={styles.actions}>
                                    <button className={styles.btnPrimary}>Показать телефон</button>
                                    <button className={styles.btnSecondary}>Написать</button>
                                </div>

                                <p className={styles.date}>{apartment.date}</p>
                            </div>

                            {apartment.isLocked && (
                                <div className={styles.lockOverlay}>
                                    <Lock size={32} />
                                    <p>Только для авторизованных пользователей</p>
                                </div>
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
