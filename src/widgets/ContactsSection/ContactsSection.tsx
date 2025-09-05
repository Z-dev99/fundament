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

    // состояние формы
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
                {/* Левая часть */}
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

                {/* Правая часть */}
                <motion.div
                    className={styles.map}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.276678402243!2d69.2797373154256!3d41.311158779270584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8adf7f4a56b5%3A0x1234567890abcdef!2sAmir%20Temur%20Street!5e0!3m2!1sru!2suz!4v1699999999999!5m2!1sru!2suz"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </motion.div>
            </div>

            {/* Модалка */}
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
