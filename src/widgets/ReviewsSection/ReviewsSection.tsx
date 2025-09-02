"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import styles from "./styles.module.scss";

const reviews = [
  {
    name: "Иван Иванов",
    role: "Продавец",
    text: "Отличный сайт для бизнеса. Спасибо за то что помогаете сдавать квартиру!",
    rating: 4,
    avatar: "/avatar1.jpg",
  },
  {
    name: "Вася Пупкин",
    role: "Продавец",
    text: "Отличный сайт для бизнеса. Спасибо за то что помогаете сдавать квартиру!",
    rating: 4,
    avatar: "/avatar2.jpg",
  },
  {
    name: "Шейх Камдан",
    role: "Продавец",
    text: "Отличный сайт для бизнеса. Спасибо за то что помогаете сдавать квартиру!",
    rating: 4,
    avatar: "/avatar3.jpg",
  },
  {
    name: "Василий",
    role: "Продавец",
    text: "Отличный сайт для бизнеса. Спасибо за то что помогаете сдавать квартиру!",
    rating: 4,
    avatar: "/avatar4.jpg",
  },
];

export function ReviewsSection() {
  return (
    <section className={styles.section}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2>Отзывы</h2>
        <button className={styles.btn}>Показать все</button>
      </motion.div>

      <div className={styles.grid}>
        {reviews.map((r, i) => (
          <motion.div
            key={i}
            className={styles.card}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <div className={styles.top}>
              <img src={r.avatar} alt={r.name} className={styles.avatar} />
              <div className={styles.info}>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      size={16}
                      fill={j < r.rating ? "#fbbf24" : "none"}
                      stroke="#fbbf24"
                    />
                  ))}
                </div>
                <p className={styles.name}>
                  <span className={styles.online}></span> {r.name}
                </p>
              </div>
            </div>
            <p className={styles.text}>{r.text}</p>
            <span className={styles.role}>{r.role}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
