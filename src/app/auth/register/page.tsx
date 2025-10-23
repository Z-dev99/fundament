"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./styles.module.scss";
import {
    useSendSignupCodeMutation,
    useSignupMutation,
} from "@/shared/api/authApi";

type UserRole = "OWNER" | "TENANT";

export default function RegisterPage() {
    const [step, setStep] = useState<"form" | "code">("form");
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("+998 ");
    const [code, setCode] = useState(Array(4).fill(""));
    const [role, setRole] = useState<UserRole>("OWNER");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const router = useRouter();

    const [sendSignupCode] = useSendSignupCodeMutation();
    const [signup] = useSignupMutation();

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

    const handleFormSubmit = async (e: React.FormEvent) => {
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

        try {
            const phone_number = phone.replace(/\D/g, "");
            await sendSignupCode({ phone_number }).unwrap();
            setStep("code");
        } catch (err: any) {
            console.error("Ошибка при отправке кода:", err);
            setError(err?.data?.message || err?.error || "Ошибка при отправке кода");
            setSuccess(false);
        }
    };

    const handleCodeChange = (index: number, value: string) => {
        if (/^\d?$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            if (value && index < 3) {
                const nextInput = document.querySelector<HTMLInputElement>(
                    `input[data-index="${index + 1}"]`
                );
                nextInput?.focus();
            }
        }
    };

    const handleCodeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const enteredCode = code.join("");

        if (enteredCode.length < 4) {
            setError("Введите все 4 цифры");
            return;
        }

        setError("");

        try {
            const phone_number = phone.replace(/\D/g, "");
            const [first_name, ...rest] = fullname.trim().split(" ");
            const middle_name = rest.length > 1 ? rest[0] : "";
            const last_name = rest.length > 0 ? rest[rest.length - 1] : "";

            await signup({
                phone_number,
                verification_code: enteredCode,
                first_name,
                middle_name,
                last_name,
                user_type: role,
            }).unwrap();

            router.replace("/");
        } catch (err: any) {
            console.error("Ошибка при подтверждении кода:", err);
            setError(err?.data?.message || err?.error || "Ошибка при подтверждении кода");
        }
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
                                />
                            </div>

                            <div className={styles.field}>
                                <label>Номер телефона</label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    className={success ? styles.success : ""}
                                    inputMode="numeric"
                                    maxLength={19}
                                />
                            </div>

                            <div className={styles.field}>
                                <label>Тип пользователя</label>
                                <div className={styles.roleContainer}>
                                    <motion.button
                                        type="button"
                                        className={`${styles.roleBtn} ${
                                            role === "OWNER" ? styles.roleBtnSelected : ""
                                        }`}
                                        onClick={() => setRole("OWNER")}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        🏠 Арендодатель
                                    </motion.button>

                                    <motion.button
                                        type="button"
                                        className={`${styles.roleBtn} ${
                                            role === "TENANT" ? styles.roleBtnSelected : ""
                                        }`}
                                        onClick={() => setRole("TENANT")}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        👤 Арендатор
                                    </motion.button>
                                </div>
                            </div>

                            {error && <p className={styles.error}>{error}</p>}

                            <button type="submit" className={styles.submit}>
                                Далее
                            </button>

                            <p className={styles.switchAuth}>
                                Уже есть аккаунт?{" "}
                                <a onClick={() => router.replace("/auth/login")}>Войти</a>
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
                            <p className={styles.subtitle}>Введите код из SMS</p>

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
