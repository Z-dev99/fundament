"use client";

import { motion } from "framer-motion";
import { Star, AlertCircle, Loader2 } from "lucide-react";
import styles from "./styles.module.scss";
import { useGetReviewsQuery } from "@/shared/api/reviewApi";

export function ReviewsSection() {
  const { data, isLoading, isError } = useGetReviewsQuery({ page: 1, page_size: 6 });

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

      {isLoading && (
        <div className={styles.grid}>
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className={`${styles.card} ${styles.skeleton}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.2 }}
            >
              <div className={styles.top}>
                <div className={styles.avatarSkeleton}></div>
                <div className={styles.info}>
                  <div className={styles.lineSkeleton} style={{ width: "80px" }}></div>
                  <div className={styles.lineSkeleton} style={{ width: "50px" }}></div>
                </div>
              </div>
              <div className={styles.lineSkeleton} style={{ width: "100%", height: "40px" }}></div>
            </motion.div>
          ))}
        </div>
      )}

      {isError && (
        <motion.div
          className={styles.errorBox}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <AlertCircle size={24} />
          <p>Не удалось загрузить отзывы. Попробуйте позже.</p>
        </motion.div>
      )}

      {data && data.reviews.length === 0 && (
        <motion.div
          className={styles.emptyReviews}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.emptyIcon}>💬</div>
          <h4>Пока нет отзывов</h4>
          <p>Будьте первым, кто поделится своим мнением!</p>
        </motion.div>
      )}

      {data && data.reviews.length > 0 && (
        <div className={styles.grid}>
          {data.reviews.map((r, i) => (
            <motion.div
              key={r.id}
              className={styles.card}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={styles.top}>
                <div className={styles.info}>
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        size={16}
                        fill={j < r.grade ? "#fbbf24" : "none"}
                        stroke="#fbbf24"
                      />
                    ))}
                  </div>
                  <p className={styles.name}>
                    <span className={styles.online}></span>{" "}
                    {r.user_first_name} {r.user_last_name}
                  </p>
                </div>
              </div>
              <p className={styles.text}>{r.review}</p>
              <span className={styles.role}>{r.owner}</span>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
