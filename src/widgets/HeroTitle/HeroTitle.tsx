"use client";

import { motion } from "framer-motion";
import styles from "./styles.module.scss";

export function HeroTitle() {
  return (
    <>
      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
      >
        Платформа прямого размещения. <br className="hidden md:block" />
        От владельцев. <br className="hidden md:block" />
        Без посредников.
      </motion.h1>

      <motion.div
        className={styles.subtitle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        {["Зашёл", "Выбрал", "Связался", "Купил"].map((item, idx, arr) => (
          <span key={idx}>
            {item}
            {idx < arr.length - 1 && <span className={styles.arrow}> → </span>}
          </span>
        ))}
      </motion.div>
    </>
  );
}
