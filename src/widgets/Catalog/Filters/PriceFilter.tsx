import React from "react";
import styles from "./styles.module.scss";

interface Props {
    from?: number;
    to?: number;
    onChange: (range: { from?: number; to?: number }) => void;
}

export const PriceFilter: React.FC<Props> = ({ from, to, onChange }) => {
    const handleFromChange = (value: string) => {
        const num = Number(value);
        onChange({ from: num >= 0 ? num : 0, to });
    };

    const handleToChange = (value: string) => {
        const num = Number(value);
        onChange({ from, to: num >= 0 ? num : 0 });
    };

    return (
        <div className={styles.filterBlock}>
            <label className={styles.label}>Цена (USD)</label>
            <div className={styles.range}>
                <div className={styles.inputWrapper}>
                    <input
                        type="number"
                        min={0}
                        step={500}
                        placeholder="От"
                        value={from ?? ""}
                        onChange={(e) => handleFromChange(e.target.value)}
                        className={styles.input}
                    />
                    <span className={styles.suffix}>$</span>
                </div>
                <div className={styles.inputWrapper}>
                    <input
                        type="number"
                        min={0}
                        step={500}
                        placeholder="До"
                        value={to ?? ""}
                        onChange={(e) => handleToChange(e.target.value)}
                        className={styles.input}
                    />
                    <span className={styles.suffix}>$</span>
                </div>
            </div>
        </div>
    );
};
