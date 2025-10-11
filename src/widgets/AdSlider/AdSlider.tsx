"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function AdSlider() {
    const ads = [
        {
            id: 1,
            image:
                "https://images.unsplash.com/photo-1581092334607-3d4afdcdf1b1?auto=format&fit=crop&w=1200&q=80",
            title: "Лучшие предложения месяца",
            description: "Скидки и акции на популярные объекты недвижимости",
            link: "#",
        },
        {
            id: 2,
            image:
                "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
            title: "Аренда без посредников",
            description: "Находите жильё напрямую от владельцев",
            link: "#",
        },
        {
            id: 3,
            image:
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
            title: "Новые объекты в продаже",
            description: "Свежие объявления каждый день",
            link: "#",
        },
    ];

    return (
        <div className="ad-slider">
            <Swiper
                modules={[Autoplay, Pagination]}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 4500, disableOnInteraction: false }}
                loop
            >
                {ads.map((ad) => (
                    <SwiperSlide key={ad.id}>
                        <a href={ad.link} className="ad-slide">
                            <img src={ad.image} alt={ad.title} />
                            <div className="ad-overlay">
                                <div className="ad-text">
                                    <h3>{ad.title}</h3>
                                    <p>{ad.description}</p>
                                </div>
                            </div>
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>

            <style jsx>{`
                .ad-slider {
                    width: 100%;
                    max-width: 1200px;
                    margin: 3rem auto;
                    border-radius: 20px;
                    overflow: hidden;
                    position: relative;
                    padding: 0 1.5rem; 
                }

                .ad-slide {
                    display: block;
                    position: relative;
                    width: 100%;
                    height: 380px;
                    overflow: hidden;
                    border-radius: 16px;
                }

                .ad-slide img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s ease;
                }

                .ad-slide:hover img {
                    transform: scale(1.05);
                }

                .ad-overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        to top,
                        rgba(0, 0, 0, 0.6) 0%,
                        rgba(0, 0, 0, 0.05) 70%
                    );
                    display: flex;
                    align-items: flex-end;
                    justify-content: flex-start;
                    padding: 2rem;
                }

                .ad-text {
                    color: #fff;
                    max-width: 70%;
                }

                .ad-text h3 {
                    font-size: 1.75rem;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                    line-height: 1.2;
                }

                .ad-text p {
                    font-size: 1rem;
                    opacity: 0.9;
                }

                /* Pagination styling */
                :global(.swiper-pagination-bullet) {
                    background: rgba(255, 255, 255, 0.8);
                    opacity: 1;
                    transition: all 0.3s ease;
                }

                :global(.swiper-pagination-bullet-active) {
                    background: #1677ff;
                    transform: scale(1.2);
                }

                /* --- Адаптив --- */
                @media (max-width: 1024px) {
                    .ad-slider {
                        padding: 0 1rem; /* меньше отступ */
                    }
                }

                @media (max-width: 768px) {
                    .ad-slider {
                        padding: 0 1rem;
                    }

                    .ad-slide {
                        height: 260px;
                    }

                    .ad-text {
                        max-width: 100%;
                        padding-right: 1rem;
                    }

                    .ad-text h3 {
                        font-size: 1.3rem;
                    }

                    .ad-text p {
                        font-size: 0.9rem;
                    }
                }

                @media (max-width: 480px) {
                    .ad-slider {
                        padding: 0 0.75rem;
                    }

                    .ad-slide {
                        height: 220px;
                    }
                }
            `}</style>
        </div>
    );
}
