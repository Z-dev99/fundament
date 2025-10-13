'use client';

import React from 'react';
import styles from './styles.module.scss';

type DealType = 'RENT' | 'SALE';

interface CatalogHeaderProps {
    type: DealType;
}

export default function CatalogHeader() {



    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.headerTop}>
                    <div>
                        <h1 className={styles.title}>Каталог недвижимости</h1>
                        <p className={styles.subtitle}>
                            Найдите подходящий объект по вашим критериям
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
