"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                textAlign: "center",
                background: "#fff",
                color: "#000",
                padding: "20px",
            }}
        >
            <motion.h1
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{
                    fontSize: "120px",
                    fontWeight: "bold",
                    margin: "0",
                    color: "#ff4d4f",
                    textShadow: "0 0 15px rgba(255,77,79,0.5)",
                }}
            >
                404
            </motion.h1>

            <motion.h2
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                style={{
                    fontSize: "28px",
                    marginBottom: "10px",
                    color: "#1e1e1e", 
                }}
            >
                Страница не найдена
            </motion.h2>

            <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                style={{
                    maxWidth: "400px",
                    color: "#555",
                    marginBottom: "30px",
                }}
            >
                Кажется, вы попали в пустоту. Вернитесь на главную страницу, чтобы
                продолжить.
            </motion.p>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                <Link
                    href="/"
                    style={{
                        padding: "12px 24px",
                        background: "#ff4d4f",
                        borderRadius: "6px",
                        color: "#fff",
                        fontWeight: "bold",
                        textDecoration: "none",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        transition: "background 0.3s ease",
                    }}
                    onMouseOver={(e) =>
                        ((e.target as HTMLElement).style.background = "#e63e40")
                    }
                    onMouseOut={(e) =>
                        ((e.target as HTMLElement).style.background = "#ff4d4f")
                    }
                >
                    Вернуться на главную
                </Link>
            </motion.div>
        </div>
    );
}
