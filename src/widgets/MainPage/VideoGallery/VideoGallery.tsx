"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Play } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./styles.module.scss";

const videos = [
    {
        id: 1,
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
        title: "Обзор сервиса",
        poster: "/images/poster.png",
    },
    {
        id: 2,
        url: "https://www.w3schools.com/html/movie.mp4",
        title: "Отзывы пользователей",
        poster: "/images/poster.png",
    },
    {
        id: 3,
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
        title: "Как это работает",
        poster: "/images/poster.png",
    },
    {
        id: 4,
        url: "https://www.w3schools.com/html/movie.mp4",
        title: "Отзывы пользователей",
        poster: "/images/poster.png",
    },
    {
        id: 5,
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
        title: "Как это работает",
        poster: "/images/poster.png",
    },
];

export function VideoGallery() {
    const [activeVideo, setActiveVideo] = useState<null | typeof videos[0]>(null);

    return (
        <section className={styles.section}>
            <motion.div
                className={styles.header}
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <h2>Видео галерея</h2>
            </motion.div>

            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={24}
                slidesPerView={1}
                navigation
                breakpoints={{
                    768: { slidesPerView: 2 },
                    1200: { slidesPerView: 3 },
                }}
                className={styles.swiper}
            >
                {videos.map((video, i) => (
                    <SwiperSlide key={video.id}>
                        <motion.div
                            className={styles.card}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{
                                scale: 1.03,
                                boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                            }}
                            onClick={() => setActiveVideo(video)}
                        >
                            <div className={styles.preview}>
                                <img src={video.poster} alt={video.title} />
                                <button className={styles.playBtn}>
                                    <Play size={32} />
                                </button>
                            </div>
                            <h3>{video.title}</h3>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <AnimatePresence>
                {activeVideo && (
                    <motion.div
                        className={styles.modal}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveVideo(null)}
                    >
                        <motion.div
                            className={styles.modalContent}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <video
                                src={activeVideo.url}
                                controls
                                autoPlay
                                className={styles.modalVideo}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
