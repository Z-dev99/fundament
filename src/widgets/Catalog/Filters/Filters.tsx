"use client";
import React, { useState } from "react";
import styles from "./styles.module.scss";

import { AnnouncementTypeFilter } from "./AnnouncementTypeFilter";
import { PriceFilter } from "./PriceFilter";
import { PropertyTypeFilter } from "./PropertyTypeFilter";
import { DropdownFilter } from "./DropdownFilter";
import { RoomsFilter } from "./RoomsFilter";
import { AreaTotalFilter } from "./AreaTotalFilter";
import { LivingAreaFilter } from "./LivingAreaFilter";
import { KitchenAreaFilter } from "./KitchenAreaFilter";
import { FloorFilter } from "./FloorFilter";
import { FloorsTotalFilter } from "./FloorsTotalFilter";
import { YearBuiltFilter } from "./YearBuiltFilter";
import Button from "@/widgets/Button/Button";
import { motion, AnimatePresence } from "framer-motion";
import { useFilters } from "@/shared/providers/FiltersProvider";

const filterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.05, duration: 0.3 },
    }),
};

export const Filters: React.FC = () => {
    const { dealType, setDealType, filters, updateFilter } = useFilters();
    const [isOpen, setIsOpen] = useState(false);

    const toggleFilters = () => setIsOpen((prev) => !prev);

    const filterElements = [
        <AnnouncementTypeFilter />,
        <PropertyTypeFilter
            key="property_type"
            value={filters.property_type || ""}
            onChange={(val) => updateFilter("property_type", val)}
        />,
        <DropdownFilter
            key="order_by"
            label="Сортировка"
            value={filters.order_by || ""}
            options={[
                "Сначала новые",
                "Сначала старые",
                "Цена по возрастанию",
                "Цена по убыванию",
                "Площадь по возрастанию",
                "Площадь по убыванию",
            ]}
            onChange={(val) => updateFilter("order_by", val)}
        />,
        <DropdownFilter
            key="currency"
            label="Валюта"
            value={filters.currency || ""}
            options={["USD", "UZS"]}
            onChange={(val) => updateFilter("currency", val)}
        />,
        <PriceFilter
            key="price"
            from={filters.priceFrom}
            to={filters.priceTo}
            onChange={(range) => {
                updateFilter("priceFrom", range.from);
                updateFilter("priceTo", range.to);
            }}
        />,
        <RoomsFilter
            key="rooms"
            min={filters.min_rooms}
            max={filters.max_rooms}
            onChange={(range) => {
                updateFilter("min_rooms", range.min);
                updateFilter("max_rooms", range.max);
            }}
        />,
        <AreaTotalFilter
            key="area_total"
            min={filters.min_area_total}
            max={filters.max_area_total}
            onChange={(range) => {
                updateFilter("min_area_total", range.min);
                updateFilter("max_area_total", range.max);
            }}
        />,
        <LivingAreaFilter
            key="area_living"
            min={filters.min_area_living}
            max={filters.max_area_living}
            onChange={(range) => {
                updateFilter("min_area_living", range.min);
                updateFilter("max_area_living", range.max);
            }}
        />,
        <KitchenAreaFilter
            key="area_kitchen"
            min={filters.min_area_kitchen}
            max={filters.max_area_kitchen}
            onChange={(range) => {
                updateFilter("min_area_kitchen", range.min);
                updateFilter("max_area_kitchen", range.max);
            }}
        />,
        <FloorFilter
            key="floor"
            min={filters.min_floor}
            max={filters.max_floor}
            onChange={(range) => {
                updateFilter("min_floor", range.min);
                updateFilter("max_floor", range.max);
            }}
        />,
        <FloorsTotalFilter
            key="floors_total"
            min={filters.min_floors_total}
            max={filters.max_floors_total}
            onChange={(range) => {
                updateFilter("min_floors_total", range.min);
                updateFilter("max_floors_total", range.max);
            }}
        />,
        <YearBuiltFilter
            key="year_built"
            min={filters.min_year_built}
            max={filters.max_year_built}
            onChange={(range) => {
                updateFilter("min_year_built", range.min);
                updateFilter("max_year_built", range.max);
            }}
        />,
    ];

    return (
        <section className={styles.section}>
            <div
                className={`${styles.overlay} ${isOpen ? styles.active : ""}`}
                onClick={toggleFilters}
            ></div>

            <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
                <div className={styles.container}>
                    <AnimatePresence>
                        {filterElements.map((el, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={filterVariants}
                            >
                                {el}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: filterElements.length * 0.05,
                            duration: 0.3,
                        }}
                        style={{ marginTop: "16px" }}
                    >
                        <Button
                            style={{ width: "100%" }}
                            variant="primary"
                            size="lg"
                            onClick={() => {
                                console.log(
                                    "Применены фильтры",
                                    filters,
                                    "Тип сделки:",
                                    dealType
                                );
                                toggleFilters();
                            }}
                        >
                            Применить
                        </Button>
                    </motion.div>
                </div>
            </aside>
        </section>
    );
};
