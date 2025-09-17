'use client';

import React, { useState } from 'react';
import styles from './styles.module.scss';

interface CatalogHeaderProps {
    onSearch: (query: string) => void;
    onFilterChange: (type: string) => void;
    onShowMap?: () => void;
}

export default function CatalogHeader({ onSearch, onFilterChange, onShowMap }: CatalogHeaderProps) {
    const [query, setQuery] = useState('');
    const [type, setType] = useState('ALL');

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query.trim());
    };

    const handleFilterChange = (value: string) => {
        setType(value);
        onFilterChange(value);
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.headerTop}>
                    <div>
                        <h1 className={styles.title}>Каталог недвижимости</h1>
                        <p className={styles.subtitle}>Найдите подходящий объект по вашим критериям</p>
                    </div>
                    <button className={styles.mapBtn} onClick={onShowMap}>
                        🗺 Показать на карте
                    </button>
                </div>

                <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        placeholder="Поиск объекта..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className={styles.input}
                    />
                    <button type="submit" className={styles.btn}>🔍 Найти</button>
                </form>
            </div>
        </section>
    );
}
