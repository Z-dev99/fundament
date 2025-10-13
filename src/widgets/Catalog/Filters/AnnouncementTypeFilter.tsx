"use client";

import React from "react";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import { useFilters } from "@/shared/providers/FiltersProvider";

export const AnnouncementTypeFilter: React.FC = () => {
    const { dealType, setDealType } = useFilters();
    const router = useRouter();


    const options: { label: string; value: "RENT" | "SALE"; href: string }[] = [
        { label: "Аренда", value: "RENT", href: "/catalog?type=rent" },
        { label: "Покупка", value: "SALE", href: "/catalog?type=sale" },
    ];

    const handleClick = (option: typeof options[0]) => {
        setDealType(option.value);
        router.push(option.href);
    };

    return (
        <div className={styles.filterBlock}>
            <label className={styles.label}>Тип объявления</label>
            <div className={styles.options}>
                {options.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => handleClick(option)}
                        className={`${styles.option} ${dealType === option.value ? styles.active : ""}`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
};
