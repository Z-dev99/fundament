"use client";

import React from "react";
import styles from "./styles.module.scss";
import PropertyCard from "./PropertyCard";
import { motion, AnimatePresence } from "framer-motion";
import { Announcement } from "@/shared/api/announcementApi";

export type PropertyType = "APARTMENT" | "HOUSE" | "OFFICE" | "OBJECT";
export type PropertyDealType = "RENT" | "SALE";
export type Currency = "USD" | "UZS";



interface Props {
    properties: Announcement[];
    total: number;
}

export const PropertyList: React.FC<Props> = ({ properties, total }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                Найдено: <span>{total}</span> объявлений
            </div>
            <div className={styles.list}>
                <AnimatePresence>
                    {properties.map((property, index) => (
                        <motion.div
                            key={property.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <PropertyCard property={property} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};
