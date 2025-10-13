"use client";

import React, { useState } from "react";
import BaseLayout from "@/layouts/base-layout";
import ProtectedRoute from "@/widgets/ProtectedRoute";
import styles from "./styles.module.scss";

export default function ModeratorPage() {
    const [activeTab, setActiveTab] = useState("reviews");

    const renderContent = () => {
        switch (activeTab) {
            case "reviews":
                return <p>Здесь будут отзывы пользователей.</p>;
            case "ads":
                return <p>Список всех объявлений.</p>;
            case "subscriptions":
                return <p>Информация о подписках.</p>;
            case "requests":
                return <p>Заявки и обращения с сайта.</p>;
            case "ai":
                return (
                    <>
                        <p>Задайте вопрос — ИИ поможет с анализом, ответами или подсказками.</p>
                        <div className={styles.chatBox}>
                            <div className={styles.messages}>
                                <p className={styles.systemMessage}>🤖 Привет! Чем могу помочь?</p>
                            </div>
                            <form
                                className={styles.chatForm}
                                onSubmit={(e) => {
                                    e.preventDefault();
                                }}
                            >
                                <input
                                    type="text"
                                    placeholder="Введите ваш вопрос..."
                                    className={styles.input}
                                />
                                <button type="submit" className={styles.sendBtn}>
                                    Отправить
                                </button>
                            </form>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <ProtectedRoute>
            <BaseLayout>
                <div className={styles.moderatorPage}>
                    <div className={styles.container}>
                        <aside className={styles.sidebar}>
                            <h2 className={styles.sidebarTitle}>Панель модератора</h2>
                            <nav className={styles.menu}>
                                <button
                                    className={`${styles.menuItem} ${activeTab === "reviews" ? styles.active : ""}`}
                                    onClick={() => setActiveTab("reviews")}
                                >
                                    Отзывы
                                </button>
                                <button
                                    className={`${styles.menuItem} ${activeTab === "ads" ? styles.active : ""}`}
                                    onClick={() => setActiveTab("ads")}
                                >
                                    Объявления
                                </button>
                                <button
                                    className={`${styles.menuItem} ${activeTab === "subscriptions" ? styles.active : ""}`}
                                    onClick={() => setActiveTab("subscriptions")}
                                >
                                    Подписки
                                </button>
                                <button
                                    className={`${styles.menuItem} ${activeTab === "requests" ? styles.active : ""}`}
                                    onClick={() => setActiveTab("requests")}
                                >
                                    Запросы с сайта
                                </button>
                                <button
                                    className={`${styles.menuItem} ${activeTab === "ai" ? styles.active : ""}`}
                                    onClick={() => setActiveTab("ai")}
                                >
                                    Помощник ИИ
                                </button>
                            </nav>
                        </aside>

                        <section className={styles.content}>
                            <h1 className={styles.title}>
                                {activeTab === "reviews" && "Отзывы"}
                                {activeTab === "ads" && "Объявления"}
                                {activeTab === "subscriptions" && "Подписки"}
                                {activeTab === "requests" && "Запросы с сайта"}
                                {activeTab === "ai" && "Помощник ИИ"}
                            </h1>
                            <div className={styles.body}>{renderContent()}</div>
                        </section>
                    </div>
                </div>
            </BaseLayout>
        </ProtectedRoute>
    );
}
