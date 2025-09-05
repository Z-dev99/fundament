"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./styles.module.scss";

const newsData = [
  {
    id: 1,
    title: "Запуск нового жилого комплекса",
    date: "15 августа 2025",
    image: "/images/news1.jpg",
    excerpt: "Мы открыли продажи квартир в новом ЖК с современными планировками и развитой инфраструктурой.",
  },
  {
    id: 2,
    title: "Специальные условия по ипотеке",
    date: "10 августа 2025",
    image: "/images/news2.jpg",
    excerpt: "Совместно с банками-партнёрами мы предлагаем выгодные ипотечные программы для наших клиентов.",
  },
  {
    id: 3,
    title: "Филиал в Ташкенте",
    date: "2 августа 2025",
    image: "/images/news3.jpg",
    excerpt: "Открыт новый офис в Ташкенте. Мы рады встречать клиентов в современном и удобном пространстве.",
  },
  {
    id: 4,
    title: "Акция на квартиры",
    date: "1 августа 2025",
    image: "/images/news4.jpg",
    excerpt: "Дарим скидки на квартиры в новых комплексах — только в этом месяце!",
  },
];

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
      </div>
    </section>
  );
};
