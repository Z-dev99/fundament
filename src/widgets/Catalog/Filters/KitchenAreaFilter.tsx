import React from "react";
import styles from "./styles.module.scss";

interface Props {
  min?: number;
  max?: number;
  onChange: (range: { min?: number; max?: number }) => void;
}

export const KitchenAreaFilter: React.FC<Props> = ({ min, max, onChange }) => {
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
      <label className={styles.label}>Площадь кухни</label>
      <div className={styles.range}>
        <div className={styles.inputWrapper}>
          <input
            type="number"
            min={0}
            placeholder="От"
            value={min ?? ""}
            onChange={(e) => handleMinChange(e.target.value)}
            className={styles.input}
          />
          <span className={styles.suffix}>м²</span>
        </div>
        <div className={styles.inputWrapper}>
          <input
            type="number"
            min={0}
            placeholder="До"
            value={max ?? ""}
            onChange={(e) => handleMaxChange(e.target.value)}
            className={styles.input}
          />
          <span className={styles.suffix}>м²</span>
        </div>
      </div>
    </div>
  );
};
