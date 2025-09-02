// components/HeroImage.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./styles.module.scss";

export function HeroImage() {
    return (
        <motion.div
            className={styles.imageWrapper}
            initial={{ opacity: 1 }}
            animate={{
                scale: [1, 1.02, 1],
            }}
            transition={{
                duration: 8,
                ease: "easeInOut",
                repeat: Infinity,
            }}
        >
            <Image
                src="/images/header.png"
                alt="Здание"
                width={480}
                height={240}
                className="object-cover w-full h-auto"
                priority
            />
        </motion.div>
    );
}
