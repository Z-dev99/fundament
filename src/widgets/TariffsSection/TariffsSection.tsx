"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import styles from "./styles.module.scss";

export const TariffsSection = () => {
  const tariffs = [
    {
      id: 1,
      title: "Базовый",
      description: "Идеально для старта",
      oldPrice: "6900 ₽",
      price: "4900 ₽",
      features: ["Преимущество №1", "Преимущество №2", "Преимущество №3"],
      extra: "Подходит новичкам и небольшим проектам.",
      popular: false,
    },
    {
      id: 2,
      title: "Продвинутый",
      description: "Оптимальный выбор",
      oldPrice: "12900 ₽",
      price: "9900 ₽",
      features: [
        "Расширенные возможности",
        "Приоритетная поддержка",
        "Все функции базового тарифа",
      ],
      extra: "Лучший баланс цены и качества. Подходит для малого бизнеса.",
      popular: true,
    },
  ];

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
          {tariffs.map((tariff) => (
            <motion.div
              key={tariff.id}
              className={`${styles.card} ${tariff.popular ? styles.popular : ""}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {tariff.popular && <span className={styles.badge}>Популярный</span>}

              <div className={styles.icon}>🔥</div>

              <h3>{tariff.title}</h3>
              <p className={styles.desc}>{tariff.description}</p>

              <ul className={styles.features}>
                {tariff.features.map((feature, idx) => (
                  <li key={idx}>
                    <CheckCircle size={18} />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className={styles.priceBlock}>
                {tariff.oldPrice && (
                  <div className={styles.oldPrice}>{tariff.oldPrice}</div>
                )}
                <div className={styles.price}>{tariff.price}</div>
              </div>

              <p className={styles.extra}>{tariff.extra}</p>

              <button className={styles.cta}>Записаться и оплатить</button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
