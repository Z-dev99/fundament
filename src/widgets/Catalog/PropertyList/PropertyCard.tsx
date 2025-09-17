import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Property } from "./PropertyList";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

interface PropertyCardProps {
    property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
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
                                <ImageWithFallback
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

                {property.is_new && <span className={styles.badge}>new</span>}
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
                    <div className={styles.actions}>
                        <button className={styles.phone}>Показать телефон</button>
                        <button className={styles.message}>Посмотреть</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ImageWithFallback: React.FC<{
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
}> = ({ src, alt, width, height, className }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    return (
        <div className={styles.imageContainer}>
            {isLoading && <div className={styles.loader}>Загрузка...</div>}

            <Image
                src={error ? "/placeholder.jpg" : src}
                alt={alt}
                width={width}
                height={height}
                className={`${className} ${isLoading ? styles.loading : styles.loaded}`}
                onLoadingComplete={() => setIsLoading(false)}
                onError={() => {
                    setError(true);
                    setIsLoading(false);
                }}
            />
        </div>
    );
};

export default PropertyCard;
