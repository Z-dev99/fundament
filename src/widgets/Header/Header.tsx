"use client";

import React, { FC, useState } from "react";
import styles from "./Header.module.scss";

import Image from "next/image";
import { easeOut, motion, Variants } from "framer-motion";

import { Menu, X } from "react-feather";
import { useRouter } from "next/navigation";
import NavLink from "@/widgets/NavLink/NavLink";
import Button from "@/widgets/Button/Button";
import { useAuth } from "@/shared/providers/AuthProvider";

const menuItems = [
    { href: "/catalog?type=sale", label: "Продажа" },
    { href: "/catalog?type=rent", label: "Аренда" },
    { href: "/contacts", label: "Контакты" },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.125 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: easeOut },
    },
};

const Header: FC = () => {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const { isAuthenticated } = useAuth();

    return (
        <>
            {menuOpen && (
                <motion.div
                    className={styles.overlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setMenuOpen(false)}
                />
            )}
            <motion.nav
                className={styles.nav}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <div className="container">
                    <motion.div className={styles.left} variants={containerVariants}>
                        <motion.div variants={itemVariants}>
                            <NavLink href="/">
                                <Image
                                    src="/images/logo.svg"
                                    alt="Логотип"
                                    width={160}
                                    height={36}
                                    priority
                                    style={{ width: "160px", height: "auto" }}
                                />
                            </NavLink>
                        </motion.div>

                        <button
                            className={styles.burger}
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
                        >
                            {menuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>

                        <motion.ul
                            className={`${styles.menu} ${menuOpen ? styles.open : ""}`}
                            variants={containerVariants}
                        >
                            {menuItems.map(({ href, label }) => (
                                <motion.li key={href + label} variants={itemVariants}>
                                    <NavLink
                                        href={href}
                                        activeClassName={styles.active}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {label}
                                    </NavLink>
                                </motion.li>
                            ))}

                            <motion.li
                                className={styles.menuLogin}
                                variants={itemVariants}
                                onClick={() => setMenuOpen(false)}
                            >
                                {isAuthenticated ? (
                                    <Button
                                        variant="outline"
                                        tooltip="Профиль"
                                        onClick={() => router.push("/profile")}
                                    >
                                        Профиль
                                    </Button>
                                ) : (
                                    <Button
                                        variant="outline"
                                        tooltip="Войти"
                                        onClick={() => router.push("/auth/login")}
                                    >
                                        Войти
                                    </Button>
                                )}
                            </motion.li>
                        </motion.ul>
                    </motion.div>

                    <motion.div className={styles.options} variants={containerVariants}>
                        <motion.div
                            style={{ display: "flex", gap: "8px" }}
                            variants={containerVariants}
                        >
                            <motion.div variants={itemVariants}>
                                {isAuthenticated ? (
                                    <Button
                                        variant="outline"
                                        tooltip="Профиль"
                                        onClick={() => router.push("/profile")}
                                    >
                                        Профиль
                                    </Button>
                                ) : (
                                    <Button
                                        variant="outline"
                                        tooltip="Войти"
                                        onClick={() => router.push("/auth/login")}
                                    >
                                        Войти
                                    </Button>
                                )}
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.nav>
        </>
    );
};

export default Header;
