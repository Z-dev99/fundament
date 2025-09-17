import React from "react";
import styles from "./styles.module.scss";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export const AnnouncementTypeFilter: React.FC<Props> = ({ value, onChange }) => {
    const options = ["Аренда", "Покупка"];

    return (
        <div className={styles.filterBlock}>
            <label className={styles.label}>Тип объявления</label>
            <div className={styles.options}>
                {options.map((option) => (
                    <button
                        key={option}
                        type="button"
                        onClick={() => onChange(option)}
                        className={`${styles.option} ${value === option ? styles.active : ""}`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};
