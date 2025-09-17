import React from "react";
import styles from "./styles.module.scss";

interface Props {
    value?: string;
    onChange: (value: string) => void;
}

const PROPERTY_TYPES: Record<string, string> = {
    APARTMENT: "Квартира",
    HOUSE: "Дом",
    ROOM: "Комната",
    LAND: "Земельный участок",
    COMMERCIAL: "Коммерческая недвижимость",
};

export const PropertyTypeFilter: React.FC<Props> = ({ value, onChange }) => {
    return (
        <div className={styles.filterBlock}>
            <label className={styles.label}>Тип недвижимости</label>
            <div className={styles.options}>
                {Object.entries(PROPERTY_TYPES).map(([key, label]) => (
                    <button
                        key={key}
                        type="button"
                        onClick={() => onChange(key)}
                        className={`${styles.option} ${value === key ? styles.active : ""}`}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
};
