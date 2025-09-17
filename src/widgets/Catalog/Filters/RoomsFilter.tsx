import React from "react";
import styles from "./styles.module.scss";

interface Props {
    min?: number;
    max?: number;
    onChange: (range: { min?: number; max?: number }) => void;
}

export const RoomsFilter: React.FC<Props> = ({ min, max, onChange }) => {
    const handleMinChange = (value: string) => {
        const num = Number(value);
        onChange({ min: num >= 0 ? num : 0, max });
    };

    const handleMaxChange = (value: string) => {
        const num = Number(value);
        onChange({ min, max: num >= 0 ? num : 0 });
    };

    return (
        <div className={styles.filterBlock}>
            <label className={styles.label}>Количество комнат</label>
            <div className={styles.range}>
                <input
                    type="number"
                    min={0}
                    placeholder="От"
                    value={min ?? ""}
                    onChange={(e) => handleMinChange(e.target.value)}
                    className={styles.input}
                />
                <input
                    type="number"
                    min={0}
                    placeholder="До"
                    value={max ?? ""}
                    onChange={(e) => handleMaxChange(e.target.value)}
                    className={styles.input}
                />
            </div>
        </div>
    );
};
