"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    MessageCircle,
    Instagram,
    Facebook,
    Linkedin,
    X,
} from "lucide-react";
import styles from "./styles.module.scss";

export const ContactsSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fio, setFio] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!fio || !phone || !message) {
            setError("Все поля обязательные");
            return;
        }
        setError("");
        console.log("ФИО:", fio);
        console.log("Телефон:", phone);
        console.log("Сообщение:", message);
        setIsModalOpen(false);
        setFio("");
        setPhone("");
        setMessage("");
    };

    return (
        <section className={styles.section}>
            <div className={styles.wrapper}>
                <motion.div
                    className={styles.card}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className={styles.heading}>Контакты</h2>
                    <p className={styles.subheading}>
                        Мы всегда рады вашим вопросам и предложениям.
                        Свяжитесь с нами удобным для вас способом 👇
                    </p>

                    <ul className={styles.list}>
                        <li>
                            <MapPin className={styles.icon} />
                            <span>
                                <strong>Адрес:</strong>{" "}
                                <a
                                    href="https://maps.google.com/?q=Ташкент,+ул.+Амир+Темур,+45"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Ташкент, ул. Амир Темур, 45
                                </a>
                            </span>
                        </li>
                        <li>
                            <Phone className={styles.icon} />
                            <span>
                                <strong>Телефон:</strong>{" "}
                                <a href="tel:+998901234567">+998 (90) 123-45-67</a>
                            </span>
                        </li>
                        <li>
                            <Mail className={styles.icon} />
                            <span>
                                <strong>Email:</strong>{" "}
                                <a href="mailto:info@company.uz">info@company.uz</a>
                            </span>
                        </li>
                        <li>
                            <Clock className={styles.icon} />
                            <span>
                                <strong>График:</strong> Пн–Сб: 09:00 – 19:00
                            </span>
                        </li>
                    </ul>

                    <div className={styles.socials}>
                        <p>Мы в соцсетях:</p>
                        <div className={styles.icons}>
                            <a href="https://t.me/example" target="_blank" rel="noopener noreferrer">
                                <MessageCircle />
                            </a>
                            <a href="https://instagram.com/example" target="_blank" rel="noopener noreferrer">
                                <Instagram />
                            </a>
                            <a href="https://facebook.com/example" target="_blank" rel="noopener noreferrer">
                                <Facebook />
                            </a>
                            <a href="https://linkedin.com/company/example" target="_blank" rel="noopener noreferrer">
                                <Linkedin />
                            </a>
                        </div>
                    </div>

                    <button className={styles.contactBtn} onClick={() => setIsModalOpen(true)}>
                        Написать нам
                    </button>
                </motion.div>
                <motion.div
                    className={styles.map}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div
                        style={{
                            position: "relative",
                            overflow: "hidden",
                            width: "100%",
                            height: "100%", 
                        }}
                    >
                        <a
                            href="https://yandex.uz/maps/10335/tashkent/?utm_medium=mapframe&utm_source=maps"
                            style={{
                                color: "#eee",
                                fontSize: "12px",
                                position: "absolute",
                                top: 0,
                            }}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Ташкент
                        </a>

                        <a
                            href="https://yandex.uz/maps/10335/tashkent/house/YkAYdARiT00EQFprfX55d3lhYQ==/?ll=69.233924%2C41.285915&utm_medium=mapframe&utm_source=maps&z=17.2"
                            style={{
                                color: "#eee",
                                fontSize: "12px",
                                position: "absolute",
                                top: 14,
                            }}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Улица Мукими, 100 — Яндекс Карты
                        </a>

                        <iframe
                            src="https://yandex.uz/map-widget/v1/?ll=69.233924%2C41.285915&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgoxNTIyNTA5OTc3Ei5Pyrt6YmVraXN0b24sIFRvc2hrZW50LCBNdXFpbWl5IGtvyrtjaGFzaSwgMTAwIgoNIneKQhVnJSVC&z=17.2"
                            width="100%"
                            height="100%"
                            style={{
                                border: 0,
                                position: "absolute",
                                top: 0,
                                left: 0,
                            }}
                            allowFullScreen
                            loading="lazy"
                        />
                    </div>

                </motion.div>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className={styles.modalBackdrop}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            className={styles.modal}
                            initial={{ scale: 0.85, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.85, opacity: 0, y: 40 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className={styles.modalClose}
                                onClick={() => setIsModalOpen(false)}
                                aria-label="Закрыть"
                            >
                                <X />
                            </button>
                            <h3 className={styles.modalTitle}>Свяжитесь с нами</h3>
                            <form className={styles.form} onSubmit={handleSubmit}>
                                <label>
                                    ФИО
                                    <input
                                        type="text"
                                        value={fio}
                                        onChange={(e) => setFio(e.target.value)}
                                        placeholder="Введите ваше имя"
                                        required
                                    />
                                </label>
                                <label>
                                    Телефон
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="+998 (__) ___ __ __"
                                        required
                                    />
                                </label>
                                <label>
                                    Сообщение
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Ваше сообщение..."
                                        required
                                    />
                                </label>
                                {error && <p className={styles.error}>{error}</p>}
                                <button type="submit" className={styles.submitBtn}>
                                    Отправить
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
