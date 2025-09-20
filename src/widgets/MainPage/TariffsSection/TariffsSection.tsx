"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import styles from "./styles.module.scss";
import { useGetSubscriptionsQuery } from "@/shared/api/subscriptionApi";

export const TariffsSection = () => {
  const { data, isLoading, isError } = useGetSubscriptionsQuery({
    type: "TENANT",
  });
  if (isLoading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <p className={styles.loading}>Загрузка тарифов...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <p className={styles.error}>Ошибка загрузки тарифов</p>
        </div>
      </section>
    );
  }

  if (!data || data.length === 0) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <p className={styles.empty}>Тарифы пока недоступны</p>
        </div>
      </section>
    );
  }

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
          Тарифы
        </motion.h2>

        <div className={styles.cards}>
          {data.map((tariff, i) => (
            <motion.div
              key={tariff.id}
              className={`${styles.card}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className={styles.icon}>🔥</div>

              <h3>{tariff.description}</h3>
              <p className={styles.desc}>Срок: {tariff.period} дней</p>

              <ul className={styles.features}>
                <li>
                  <CheckCircle size={18} /> Продолжительность {tariff.period} дней
                </li>
                <li>
                  <CheckCircle size={18} /> Стоимость {tariff.price} сум
                </li>
              </ul>

              <div className={styles.priceBlock}>
                <div className={styles.price}>{tariff.price} сум</div>
              </div>

              <button className={styles.cta}>Оформить подписку</button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
