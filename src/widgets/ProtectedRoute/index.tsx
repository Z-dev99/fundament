'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useAuth } from '@/shared/providers/AuthProvider';

import styles from './styles.module.scss';

interface Props {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    if (isAuthenticated === null) {
        return (
            <motion.div
                className={styles.loaderWrapper}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className={styles.loader}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                />
            </motion.div>
        );
    }

    if (!isAuthenticated) {
        return (
            <motion.div
                className={styles.modalOverlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className={styles.modal}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <button
                        className={styles.closeButton}
                        onClick={() => router.push('/')}
                    >
                        <X size={20} />
                    </button>

                    <h2 className={styles.modalTitle}>Требуется авторизация</h2>
                    <p className={styles.modalText}>
                        Пожалуйста, войдите в аккаунт, чтобы получить доступ к каталогу.
                    </p>
                    <button
                        onClick={() => router.push('/auth/login')}
                        className={styles.button}
                    >
                        Перейти к авторизации
                    </button>
                </motion.div>
            </motion.div>
        );
    }

    return <>{children}</>;
}
