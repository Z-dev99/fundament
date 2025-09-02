"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

export const Preloader = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1000); // 1 секунда
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.preloader}>
      <div className={styles.loader}></div>
    </div>
  );
};
