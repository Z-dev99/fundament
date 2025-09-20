"use client";

import React, { useState } from "react";
import styles from "./styles.module.scss";
import ProtectedRoute from "@/widgets/ProtectedRoute";
import BaseLayout from "@/layouts/base-layout";
import { NewsSection } from "@/widgets/MainPage/NewsSection/NewsSection";

interface User {
    first_name: string;
    phone_number: string;
    details: string;
}

interface Subscription {
    id: string;
    price: string;
    description: string;
    period: number;
}

const mockUser: User = {
    first_name: "Иван Иванов",
    phone_number: "+998 90 123 45 67",
    details: "Собственник недвижимости, активный пользователь платформы",
};

const mockSubscriptions: Subscription[] = [];
interface Announcement {
    id: string;
    title: string;
    price: string;
    currency: string;
    type: string;
    property_type: string;
    rooms_count: number;
    area_total: string;
    floor: number;
    floors_total: number;
    city: string;
    district: string;
    images: string[];
}
const mockAnnouncements: Announcement[] = [];

const ProfilePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"ads" | "subs" | "support">("subs");
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const perPage = 4;
    const totalPages = Math.ceil(mockAnnouncements.length / perPage);

    const handleLogout = () => {
        console.log("Выход из аккаунта");
    };

    const handleDelete = (id: string) => {
        console.log("Удалить объявление:", id);
    };


    return (
        <ProtectedRoute>
            <BaseLayout>
                <div className={styles.profilePage}>
                    <div className={styles.container}>
                        <aside className={styles.sidebar}>
                            <div className={styles.userInfo}>
                                <div className={styles.avatar}>
                                    {mockUser.first_name.charAt(0)}
                                </div>
                                <h2>{mockUser.first_name}</h2>
                                <p>{mockUser.phone_number}</p>
                                <p>{mockUser.details}</p>
                                <button className={styles.logoutBtn} onClick={handleLogout}>
                                    Выйти
                                </button>
                            </div>
                        </aside>

                        <main className={styles.content}>
                            <div className={styles.tabs}>
                                <button
                                    className={`${styles.tab} ${activeTab === "ads" ? styles.tabActive : ""
                                        }`}
                                    onClick={() => setActiveTab("ads")}
                                >
                                    Мои объявления
                                </button>
                                <button
                                    className={`${styles.tab} ${activeTab === "subs" ? styles.tabActive : ""
                                        }`}
                                    onClick={() => setActiveTab("subs")}
                                >
                                    Подписки
                                </button>
                                <button
                                    className={`${styles.tab} ${activeTab === "support" ? styles.tabActive : ""
                                        }`}
                                    onClick={() => setActiveTab("support")}
                                >
                                    Поддержка
                                </button>
                            </div>

                            {activeTab === "ads" && (
                                <>
                                    {mockAnnouncements.length === 0 ? (
                                        <p>У вас пока нет объявлений.</p>
                                    ) : (
                                        <>
                                            <div className={styles.cards}>
                                                {mockAnnouncements
                                                    .slice((currentPage - 1) * perPage, currentPage * perPage)
                                                    .map((ad) => (
                                                        <div key={ad.id} className={styles.card}>
                                                            <div className={styles.cardInfo}>
                                                                <h3>{ad.title}</h3>
                                                                <p>
                                                                    {ad.rooms_count > 0 ? `${ad.rooms_count}-комн. ` : ""}
                                                                    {ad.property_type}
                                                                </p>
                                                                <p>
                                                                    {ad.area_total} м² · Этаж {ad.floor}/{ad.floors_total}
                                                                </p>
                                                                <p>
                                                                    {ad.city}, {ad.district}
                                                                </p>
                                                                <p className={styles.price}>
                                                                    {ad.price} {ad.currency}{" "}
                                                                    {ad.type === "RENT" ? "/ мес." : ""}
                                                                </p>
                                                                <div className={styles.cardActions}>
                                                                    <button className={styles.editBtn}>Редактировать</button>
                                                                    <button
                                                                        className={styles.deleteBtn}
                                                                        onClick={() => handleDelete(ad.id)}
                                                                    >
                                                                        Удалить
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className={styles.cardImageWrapper}>
                                                                {ad.images?.length ? (
                                                                    <img
                                                                        src={ad.images[0]}
                                                                        alt={ad.title}
                                                                        className={styles.cardImage}
                                                                    />
                                                                ) : (
                                                                    <span className={styles.noImage}>Нет фото</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>

                                            {mockAnnouncements.length > perPage && (
                                                <div className={styles.pagination}>
                                                    {Array.from({ length: totalPages }, (_, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => setCurrentPage(i + 1)}
                                                            className={currentPage === i + 1 ? styles.activePage : ""}
                                                        >
                                                            {i + 1}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </>
                            )}

                            {activeTab === "subs" && (
                                <div className={styles.subscriptions}>
                                    <div className={styles.subHeader}>
                                        <h3>Ваши подписки</h3>
                                        <button
                                            className={styles.buyMainBtn}
                                            onClick={() => setShowModal(true)}
                                        >
                                            Купить подписку
                                        </button>
                                    </div>

                                    {mockSubscriptions.length > 0 ? (
                                        <div className={styles.subCards}>
                                            {mockSubscriptions.map((sub) => (
                                                <div key={sub.id} className={styles.subCard}>
                                                    <div className={styles.subInfo}>
                                                        <h4>{sub.description}</h4>
                                                        <p>Срок: {sub.period} дней</p>
                                                        <p className={styles.price}>{sub.price} ₽</p>
                                                    </div>
                                                    <div className={styles.subActions}>
                                                        <button className={styles.extendBtn}>
                                                            Продлить
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p>У вас пока нет активных подписок.</p>
                                    )}

                                    {showModal && (
                                        <div
                                            className={styles.modalOverlay}
                                            onClick={() => setShowModal(false)}
                                        >
                                            <div
                                                className={styles.modal}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <h3>Доступные подписки</h3>
                                                <div className={styles.subCards}>
                                                    {mockSubscriptions.map((sub) => (
                                                        <div key={sub.id} className={styles.subCard}>
                                                            <div className={styles.subInfo}>
                                                                <h4>{sub.description}</h4>
                                                                <p>Срок: {sub.period} дней</p>
                                                                <p className={styles.price}>{sub.price} ₽</p>
                                                            </div>
                                                            <div className={styles.subActions}>
                                                                <button className={styles.buyBtn}>Купить</button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <button
                                                    className={styles.closeModalBtn}
                                                    onClick={() => setShowModal(false)}
                                                >
                                                    Закрыть
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            {activeTab === "support" && (
                                <div className={styles.supportForm}>
                                    <label htmlFor="message">Сообщение в поддержку</label>
                                    <textarea id="message" placeholder="Опишите вашу проблему..." />
                                    <button onClick={() => setShowModal(true)}>Отправить</button>
                                </div>
                            )}
                        </main>
                    </div>
                    <NewsSection />
                </div>
            </BaseLayout>
        </ProtectedRoute>
    );
};

export default ProfilePage;
