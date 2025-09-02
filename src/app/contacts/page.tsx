"use client";

import BaseLayout from "@/layouts/base-layout";
import styles from "./styles.module.scss";
import { Phone, MessageCircle, Users, Zap } from "lucide-react";
import { motion, Variants } from "framer-motion";

const contacts = [
    {
        id: 1,
        title: "Бесплатная консультация",
        phone: "+7 (495) 123-45-67",
        tg: "https://t.me/example",
        icon: <MessageCircle className={styles.iconYellow} />,
    },
    {
        id: 2,
        title: "Корпоративным клиентам",
        phone: "+7 (495) 765-43-21",
        tg: "https://t.me/example",
        icon: <Users className={styles.iconBlue} />,
    },
    {
        id: 3,
        title: "Предложения о сотрудничестве",
        phone: "+7 (495) 111-22-33",
        tg: "https://t.me/example",
        icon: <Zap className={styles.iconPurple} />,
    },
];

const addresses = [
    {
        id: 1,
        title: "Филиал Москва",
        address: "г. Москва, ул. Примерная, д. 10",
        image: "/images/office1.jpg",
    },
];

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ContactsPage() {
    return (
        <BaseLayout>
            <motion.section
                className={styles.section}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <div className={styles.container}>
                    <motion.h1
                        className={styles.title}
                        variants={fadeUp}
                    >
                        Контактная информация
                    </motion.h1>

                    <motion.p
                        className={styles.subtitle}
                        variants={fadeUp}
                    >
                        Вы можете связаться с нами, если у вас есть вопросы или предложения :)
                    </motion.p>

                    <motion.div className={styles.cards} variants={containerVariants}>
                        {contacts.map((item) => (
                            <motion.div
                                key={item.id}
                                className={styles.card}
                                variants={fadeUp}
                                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                            >
                                <div className={styles.icon}>{item.icon}</div>
                                <h3>{item.title}</h3>
                                <p>
                                    <strong>Телефон:</strong> {item.phone}
                                </p>
                                <a href={item.tg} target="_blank" className={styles.btn}>
                                    Написать в Telegram
                                </a>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div className={styles.addressSection} variants={containerVariants}>
                        <motion.h2 variants={fadeUp}>Наши адреса</motion.h2>
                        <motion.div className={styles.addresses} variants={containerVariants}>
                            {addresses.map((a) => (
                                <motion.div
                                    key={a.id}
                                    className={styles.addressCard}
                                    variants={fadeUp}
                                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                                >
                                    <img src={a.image} alt={a.title} />
                                    <div>
                                        <h3>{a.title}</h3>
                                        <p>{a.address}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>
        </BaseLayout>
    );
}
