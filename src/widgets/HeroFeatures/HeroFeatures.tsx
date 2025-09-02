"use client";

import { FileText, Repeat, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./styles.module.scss";

const features = [
  { icon: <FileText size={18} />, text: "Честные условия" },
  { icon: <Repeat size={18} />, text: "Прямой контакт" },
  { icon: <ShieldCheck size={18} />, text: "Модерация" },
];

export function HeroFeatures() {
  return (
    <motion.div
      className={styles.features}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.2 },
        },
      }}
    >
      {features.map((item, i) => (
        <motion.div
          key={i}
          className={styles.feature}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.iconBox}>{item.icon}</div>
          <span>{item.text}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
