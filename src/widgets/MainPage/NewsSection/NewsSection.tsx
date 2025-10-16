"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./styles.module.scss";

const newsData: any[] = []; 

export const NewsSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Новости компании
        </motion.h2>

        {newsData.length === 0 ? (
          <motion.div
            className={styles.emptyBlock}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p>Новостей пока нет</p>
          </motion.div>
        ) : (
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className={styles.swiper}
          >
            {newsData.map((item) => (
              <SwiperSlide key={item.id}>
                <motion.div
                  className={styles.card}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={styles.imageWrapper}>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className={styles.content}>
                    <span className={styles.date}>{item.date}</span>
                    <h3>{item.title}</h3>
                    <p>{item.excerpt}</p>
                    <a href={`/news/${item.id}`} className={styles.link}>
                      Читать далее →
                    </a>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};
