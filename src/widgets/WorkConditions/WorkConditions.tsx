"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import styles from "./styles.module.scss";

export const WorkConditions = () => {
    const steps = [
        {
            id: 1,
            title: "Заявка",
            desc: "Вы оставляете заявку через сайт или пишете нам напрямую.",
        },
        {
            id: 2,
            title: "Консультация",
            desc: "Мы связываемся с вами, обсуждаем детали и подбираем тариф.",
        },
        {
            id: 3,
            title: "Договор",
            desc: "Заключаем договор и фиксируем все условия сотрудничества.",
        },
        {
            id: 4,
            title: "Работа",
            desc: "Мы выполняем задачи по плану и регулярно даём обратную связь.",
        },
        {
            id: 5,
            title: "Результат",
            desc: "Вы получаете готовый результат и поддержку от нашей команды.",
        },
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <motion.h2
                    className={styles.heading}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Условия работы
                </motion.h2>

                <div className={styles.stepper}>
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            className={styles.step}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                        >
                            <div className={styles.circle}>
                                <CheckCircle2 size={26} />
                            </div>
                            <div className={styles.content}>
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                            </div>
                            {index < steps.length - 1 && <div className={styles.line}></div>}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
