import React, { useState } from "react";
import styles from "./styles.module.scss";

interface Props {
    label: string;
    value?: string;
    options: string[];
    onChange: (value: string) => void;
}

export const DropdownFilter: React.FC<Props> = ({ label, value, options, onChange }) => {
    const [open, setOpen] = useState(false);

    const handleSelect = (option: string) => {
        onChange(option);
        setOpen(false);
    };

    return (
        <div className={styles.filterBlock}>
            <label className={styles.label}>{label}</label>
            <div className={styles.dropdown}>
                <div
                    className={styles.dropdownControl}
                    onClick={() => setOpen((prev) => !prev)}
                >
                    <span>{value || `Выберите ${label.toLowerCase()}`}</span>
                    <span className={styles.arrow}>{open ? "▲" : "▼"}</span>
                </div>

                {open && (
                    <div className={styles.dropdownMenu}>
                        <ul className={styles.dropdownList}>
                            {options.length > 0 ? (
                                options.map((option) => (
                                    <li
                                        key={option}
                                        className={`${styles.dropdownItem} ${option === value ? styles.dropdownItemActive : ""
                                            }`}
                                        onClick={() => handleSelect(option)}
                                    >
                                        {option}
                                    </li>
                                ))
                            ) : (
                                <li className={styles.dropdownEmpty}>Нет вариантов</li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};
