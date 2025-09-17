import React from "react";
import styles from "./styles.module.scss";

interface Props {
  min?: number;
  max?: number;
  onChange: (range: { min?: number; max?: number }) => void;
}

export const YearBuiltFilter: React.FC<Props> = ({ min, max, onChange }) => {
  const handleMinChange = (value: string) => {
    const num = Number(value);
    onChange({ min: num > 0 ? num : undefined, max });
  };

  const handleMaxChange = (value: string) => {
    const num = Number(value);
    onChange({ min, max: num > 0 ? num : undefined });
  };

  return (
    <div className={styles.filterBlock}>
      <label className={styles.label}>Год постройки</label>
      <div className={styles.range}>
        <input
          type="number"
          placeholder="От"
          value={min ?? ""}
          onChange={(e) => handleMinChange(e.target.value)}
          className={styles.input}
        />
        <input
          type="number"
          placeholder="До"
          value={max ?? ""}
          onChange={(e) => handleMaxChange(e.target.value)}
          className={styles.input}
        />
      </div>
    </div>
  );
};
