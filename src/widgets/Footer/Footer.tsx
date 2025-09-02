"use client";

import Link from "next/link";
import { FaTelegram, FaWhatsapp, FaVk, FaInstagram } from "react-icons/fa";

import styles from "./styles.module.scss";
import NavLink from "../NavLink/NavLink";
import Image from "next/image";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.logo}>
                        <NavLink href="/">
                            <Image
                                src="/images/logo.svg"
                                alt="Логотип"
                                width={160}
                                height={36}
                                priority
                            />
                        </NavLink>
                    </div>
                    <p className={styles.text}>
                        Платформа прямого размещения.<br />
                        От владельцев.<br />
                        Без посредников.
                    </p>
                    <p className={styles.copy}>
                        © 2025 Fundament. Все права защищены.
                    </p>
                </div>

                <div className={styles.right}>
                    <div className={styles.column}>
                        <h4>Основные</h4>
                        <Link href="/">Главная</Link>
                        <Link href="/catalog">Аренда</Link>
                        <Link href="/catalog">Условия</Link>
                        <Link href="/contacts">Контакты</Link>
                    </div>

                    <div className={styles.column}>
                        <h4>Социальные сети</h4>
                        <a href="https://t.me/" target="_blank">
                            <FaTelegram color="#0088cc" /> Telegram
                        </a>
                        <a href="https://wa.me/" target="_blank">
                            <FaWhatsapp color="#25D366" /> WhatsApp
                        </a>
                        <a href="https://vk.com/" target="_blank">
                            <FaVk color="#4c75a3" /> ВКонтакте
                        </a>
                        <a href="https://instagram.com/" target="_blank">
                            <FaInstagram color="#E4405F" /> Instagram
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
