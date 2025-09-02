"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./styles.module.scss";

const faqData = [
    {
        question: "Как купить квартиру через ваш сайт?",
        answer:
            "Вы можете выбрать понравившийся объект, связаться с владельцем через кнопку 'Показать телефон' или написать в чат. Дополнительно мы предлагаем юридическое сопровождение сделки."
    },
    {
        question: "Нужна ли регистрация для просмотра предложений?",
        answer:
            "Часть предложений доступна без регистрации, но для доступа к эксклюзивным объектам и возможности связаться с владельцами потребуется авторизация."
    },
    {
        question: "Какие способы оплаты поддерживаются?",
        answer:
            "Мы поддерживаем наличные, банковские переводы, ипотечные программы и рассрочку от застройщиков."
    }
];

export const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={styles.section}>
            <div className={styles.wrapper}>
                <h2 className={styles.heading}>Часто задаваемые вопросы</h2>

                <div className={styles.accordion}>
                    {faqData.map((item, index) => (
                        <div key={index} className={styles.item}>
                            <button
                                className={styles.question}
                                onClick={() => toggle(index)}
                            >
                                <span>{item.question}</span>
                                <ChevronDown
                                    className={`${styles.icon} ${openIndex === index ? styles.open : ""
                                        }`}
                                />
                            </button>

                            <div
                                className={`${styles.answer} ${openIndex === index ? styles.show : ""
                                    }`}
                            >
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
