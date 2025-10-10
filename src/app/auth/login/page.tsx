"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./styles.module.scss";
import {
    useOwnerSigninMutation,
    useSendOwnerSigninCodeMutation,
    useSendTenantSigninCodeMutation,
    useTenantSigninMutation
} from "@/shared/api/authApi";

export default function LoginPage() {
    const [step, setStep] = useState<"role" | "phone" | "code">("role");
    const [role, setRole] = useState<"landlord" | "tenant" | null>(null);
    const [digits, setDigits] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [code, setCode] = useState(Array(4).fill(""));

    const router = useRouter();

    const [sendOwnerCode] = useSendOwnerSigninCodeMutation();
    const [ownerSignin] = useOwnerSigninMutation();
    const [sendTenantCode] = useSendTenantSigninCodeMutation();
    const [tenantSignin] = useTenantSigninMutation();

    const formatPhone = (digits: string) => {
        if (!digits) return "+998 ";
        let result = "+998";
        if (digits.length > 0) result += ` (${digits.slice(0, 2)}`;
        if (digits.length >= 2) result += `) ${digits.slice(2, 5)}`;
        if (digits.length >= 5) result += ` ${digits.slice(5, 7)}`;
        if (digits.length >= 7) result += ` ${digits.slice(7, 9)}`;
        return result;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/\D/g, "");
        if (val.startsWith("998")) val = val.slice(3);
        setDigits(val.slice(0, 9));
        setError("");
        setSuccess(false);
    };

    const handlePhoneSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (digits.length !== 9) {
            setError("Введите номер в формате +998 (90) 123 45 67");
            return;
        }
        setError("");
        setSuccess(true);

        try {
            const phone = "+998" + digits;

            if (role === "landlord") {
                await sendOwnerCode({ phone_number: phone }).unwrap();
            } else if (role === "tenant") {
                await sendTenantCode({ phone_number: phone }).unwrap();
            }

            setStep("code");
        } catch (err: any) {
            setError(err?.data?.message || "Ошибка при отправке кода");
            setSuccess(false);
        }
    };

    const handleCodeChange = (index: number, value: string) => {
        if (/^\d?$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
            if (value && index < code.length - 1) {
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
            const phone = "+998" + digits;
            let res;

            if (role === "landlord") {
                res = await ownerSignin({ phone_number: phone, verification_code: enteredCode }).unwrap();
            } else if (role === "tenant") {
                res = await tenantSignin({ phone_number: phone, verification_code: enteredCode }).unwrap();
            }

            console.log("Успешный вход:", res);
            router.replace("/");
        } catch (err: any) {
            setError(err?.data?.message || "Ошибка при подтверждении кода");
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
                <button className={styles.closeIcon} onClick={() => router.replace("/")}>✕</button>
                <h1 className={styles.title}>Вход</h1>

                <AnimatePresence mode="wait">
                    {step === "role" && (
                        <motion.div key="role-step" className={styles.form} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <p className={styles.subtitle}>Выберите, кто вы:</p>
                            <div className={styles.roleContainer}>
                                <button type="button" className={styles.roleBtn} onClick={() => { setRole("landlord"); setStep("phone"); }}>Я арендодатель</button>
                                <button type="button" className={styles.roleBtn} onClick={() => { setRole("tenant"); setStep("phone"); }}>Я арендатор</button>
                            </div>
                            <p className={styles.switch}>
                                Нет аккаунта? <button onClick={() => router.replace("/auth/register")}>Зарегистрироваться</button>
                            </p>
                        </motion.div>
                    )}

                    {step === "phone" && (
                        <motion.form key="phone-step" onSubmit={handlePhoneSubmit} className={styles.form} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className={styles.field}>
                                <label>Номер телефона</label>
                                <input
                                    type="tel"
                                    value={formatPhone(digits)}
                                    onChange={handlePhoneChange}
                                    className={`${styles.input} ${success ? styles.success : ""}`}
                                    inputMode="numeric"
                                    placeholder="+998 (90) 123 45 67"
                                />
                                {error && <p className={styles.error}>{error}</p>}
                            </div>

                            <button type="submit" className={styles.submit}>Далее</button>
                            <button type="button" className={styles.back} onClick={() => setStep("role")}>← Назад</button>

                            <p className={styles.switch}>
                                Нет аккаунта? <button onClick={() => router.replace("/auth/register")}>Зарегистрироваться</button>
                            </p>
                        </motion.form>
                    )}

                    {step === "code" && (
                        <motion.form key="code-step" onSubmit={handleCodeSubmit} className={styles.form} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
                            <p className={styles.subtitle}>Введите код из SMS</p>

                            <div className={styles.codeContainer}>
                                {code.map((digit, i) => (
                                    <input
                                        key={i}
                                        type="text"
                                        value={digit}
                                        onChange={(e) => handleCodeChange(i, e.target.value)}
                                        maxLength={1}
                                        data-index={i}
                                        className={styles.codeInput}
                                        inputMode="numeric"
                                    />
                                ))}
                            </div>

                            {error && <p className={styles.error}>{error}</p>}

                            <button type="submit" className={styles.submit}>Подтвердить</button>
                            <button type="button" className={styles.back} onClick={() => setStep("phone")}>← Назад</button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
