"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./styles.module.scss";

export default function RegisterPage() {
    const [step, setStep] = useState<"form" | "code">("form");
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("+998 ");
    const [code, setCode] = useState(Array(6).fill(""));
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const router = useRouter();

    const formatPhone = (value: string) => {
        const digits = value.replace(/\D/g, "");
        let result = "+998";

        if (digits.length > 3) {
            const rest = digits.slice(3);
            if (rest.length > 0) result += ` (${rest.slice(0, 2)}`;
            if (rest.length >= 2) result += `) ${rest.slice(2, 5)}`;
            if (rest.length >= 5) result += ` ${rest.slice(5, 7)}`;
            if (rest.length >= 7) result += ` ${rest.slice(7, 9)}`;
        }
        return result;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(formatPhone(e.target.value));
        setError("");
        setSuccess(false);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!fullname.trim()) {
            setError("Введите ФИО");
            return;
        }
        const uzbPhoneRegex = /^\+998 \(\d{2}\) \d{3} \d{2} \d{2}$/;
        if (!uzbPhoneRegex.test(phone)) {
            setError("Введите номер в формате +998 (90) 123 45 67");
            return;
        }
        setError("");
        setSuccess(true);
        setTimeout(() => {
            setStep("code");
            setSuccess(false);
        }, 500);
    };

    const handleCodeChange = (index: number, value: string) => {
        if (/^\d?$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            if (value && index < 5) {
                const nextInput = document.querySelector<HTMLInputElement>(
                    `input[data-index="${index + 1}"]`
                );
                nextInput?.focus();
            }
        }
    };

    const handleCodeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const enteredCode = code.join("");

        if (enteredCode.length < 6) {
            setError("Введите все 6 цифр");
            return;
        }

        setError("");
        console.log("Регистрация:", { fullname, phone, enteredCode });

        router.replace("/");
    };

    return (
        <div className={styles.overlay}>
            <motion.div
                className={styles.modal}
                initial={{ opacity: 0, scale: 0.9, y: -40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <button
                    className={styles.closeIcon}
                    onClick={() => router.replace("/")}
                >
                    ✕
                </button>

                <h1 className={styles.title}>Регистрация</h1>

                <AnimatePresence mode="wait">
                    {step === "form" && (
                        <motion.form
                            key="form-step"
                            onSubmit={handleFormSubmit}
                            className={styles.form}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className={styles.field}>
                                <label>ФИО</label>
                                <input
                                    type="text"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.field}>
                                <label>Номер телефона</label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    className={`${styles.input} ${success ? styles.success : ""}`}
                                    inputMode="numeric"
                                    maxLength={19}
                                />
                            </div>

                            {error && <p className={styles.error}>{error}</p>}

                            <button type="submit" className={styles.submit}>
                                Далее
                            </button>

                            <p className={styles.switchAuth}>
                                Уже есть аккаунт?{" "}
                                <a onClick={() => router.replace("/auth/login")}>
                                    Войти
                                </a>
                            </p>
                        </motion.form>
                    )}

                    {step === "code" && (
                        <motion.form
                            key="code-step"
                            onSubmit={handleCodeSubmit}
                            className={styles.form}
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -40 }}
                        >
                            <p className={styles.subtitle}>
                                Введите код из SMS
                            </p>

                            <div className={styles.codeContainer}>
                                {code.map((digit, i) => (
                                    <input
                                        key={i}
                                        type="text"
                                        value={digit}
                                        onChange={(e) =>
                                            handleCodeChange(i, e.target.value)
                                        }
                                        maxLength={1}
                                        data-index={i}
                                        className={styles.codeInput}
                                        inputMode="numeric"
                                    />
                                ))}
                            </div>

                            {error && <p className={styles.error}>{error}</p>}

                            <button type="submit" className={styles.submit}>
                                Подтвердить
                            </button>

                            <button
                                type="button"
                                className={styles.close}
                                onClick={() => setStep("form")}
                            >
                                ← Назад
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
