'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import BaseLayout from './base-layout';

import styles from './CatalogLayout.module.scss';

interface Props {
  children: ReactNode;
}

export default function CatalogLayout({ children }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const isAuthenticated = false;

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      setShowModal(true);
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  if (loading) {
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

  return (
    <AnimatePresence>
      {showModal ? (
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
      ) : (
        <BaseLayout>{children}</BaseLayout>
      )}
    </AnimatePresence>
  );
}
