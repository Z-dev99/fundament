"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import styles from "./styles.module.scss";

interface GalleryProps {
    images: string[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

    return (
        <div className={styles.gallery}>
            <Swiper
                modules={[Navigation, Thumbs]}
                navigation
                spaceBetween={10}
                slidesPerView={1}
                thumbs={{ swiper: thumbsSwiper }}
                className={styles.mainSwiper}
            >
                {images?.length ? (
                    images.map((photo, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={`http://147.45.68.231:9000/img/${photo}`}
                                alt={`Фото ${index + 1}`}
                                className={styles.mainImage}
                            />
                        </SwiperSlide>
                    ))
                ) : (
                    <SwiperSlide>
                        <div className={styles.noImage}>Нет изображений</div>
                    </SwiperSlide>
                )}
            </Swiper>

            {images?.length > 1 && (
                <Swiper
                    onSwiper={setThumbsSwiper}
                    modules={[Thumbs, FreeMode]}
                    freeMode={true}
                    watchSlidesProgress
                    slidesPerView="auto"
                    spaceBetween={10}
                    className={styles.thumbSwiper}
                >
                    {images.map((photo, index) => (
                        <SwiperSlide key={index} className={styles.thumbSlide}>
                            <img
                                src={`http://147.45.68.231:9000/img/${photo}`}
                                alt={`Миниатюра ${index + 1}`}
                                className={styles.thumbImage}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default Gallery;
