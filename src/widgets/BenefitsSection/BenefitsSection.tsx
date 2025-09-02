"use client";

import { motion } from "framer-motion";
import {
    Flame,
    UserRound,
    Filter,
    Zap,
    Sparkles,
    ShieldCheck,
} from "lucide-react";

import styles from "./styles.module.scss";

const benefits = [
    {
        icon: <Flame size={32} />,
        title: "Без комиссий посредников",
        text: "Все сделки идут напрямую между владельцем и клиентом",
    },
    {
        icon: <UserRound size={32} />,
        title: "Прямой контакт с владельцем",
        text: "Все сделки идут напрямую между владельцем и клиентом",
    },
    {
        icon: <Filter size={32} />,
        title: "Умные фильтры и карта",
        text: "Быстрый поиск по удобным параметрам",
    },
    {
        icon: <Zap size={32} />,
        title: "Быстрый старт размещения",
        text: "Разместите объект за пару минут",
    },
    {
        icon: <Sparkles size={32} />,
        title: "Прозрачные тарифы",
        text: "Никаких скрытых условий или платежей",
    },
    {
        icon: <ShieldCheck size={32} />,
        title: "Модерация и защита объявлений",
        text: "Мы проверяем объявления и защищаем пользователей",
    },
];

export function BenefitsSection() {
    return (
        <section className={styles.section}>
            <motion.h2
                className={styles.title}
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ once: true }}
            >
                Преимущества работы с нами
            </motion.h2>

            <div className={styles.grid}>
                {benefits.map((item, i) => (
                    <motion.div
                        key={i}
                        className={styles.card}
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                            duration: 0.9,
                            ease: [0.25, 0.1, 0.25, 1],
                            delay: i * 0.15,
                        }}
                        viewport={{ once: true }}
                    >
                        <div className={styles.icon}>{item.icon}</div>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
