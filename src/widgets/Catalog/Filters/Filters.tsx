import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { FiltersState } from "./types";

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

interface Props {
    onFiltersChange?: (filters: FiltersState) => void;
}

export const Filters: React.FC<Props> = ({ onFiltersChange }) => {
    const [filters, setFilters] = useState<FiltersState>({});

    useEffect(() => {
        if (onFiltersChange) {
            onFiltersChange(filters);
        }
    }, [filters, onFiltersChange]);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <AnnouncementTypeFilter
                    value={filters.announcement_type || ""}
                    onChange={(val) => setFilters((p) => ({ ...p, announcement_type: val }))}
                />

                <PropertyTypeFilter
                    value={filters.property_type || ""}
                    onChange={(val) => setFilters((p) => ({ ...p, property_type: val }))}
                />

                <DropdownFilter
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
                    onChange={(val) => setFilters((p) => ({ ...p, order_by: val }))}
                />

                <DropdownFilter
                    label="Валюта"
                    value={filters.currency || ""}
                    options={["USD", "UZS"]}
                    onChange={(val) => setFilters((p) => ({ ...p, currency: val }))}
                />

                <PriceFilter
                    from={filters.priceFrom}
                    to={filters.priceTo}
                    onChange={(range) =>
                        setFilters((p) => ({
                            ...p,
                            priceFrom: range.from,
                            priceTo: range.to,
                        }))
                    }
                />

                <RoomsFilter
                    min={filters.min_rooms}
                    max={filters.max_rooms}
                    onChange={(range) =>
                        setFilters((p) => ({ ...p, min_rooms: range.min, max_rooms: range.max }))
                    }
                />

                <AreaTotalFilter
                    min={filters.min_area_total}
                    max={filters.max_area_total}
                    onChange={(range) =>
                        setFilters((p) => ({ ...p, min_area_total: range.min, max_area_total: range.max }))
                    }
                />

                <LivingAreaFilter
                    min={filters.min_area_living}
                    max={filters.max_area_living}
                    onChange={(range) =>
                        setFilters((p) => ({ ...p, min_area_living: range.min, max_area_living: range.max }))
                    }
                />

                <KitchenAreaFilter
                    min={filters.min_area_kitchen}
                    max={filters.max_area_kitchen}
                    onChange={(range) =>
                        setFilters((p) => ({ ...p, min_area_kitchen: range.min, max_area_kitchen: range.max }))
                    }
                />

                <FloorFilter
                    min={filters.min_floor}
                    max={filters.max_floor}
                    onChange={(range) =>
                        setFilters((p) => ({ ...p, min_floor: range.min, max_floor: range.max }))
                    }
                />

                <FloorsTotalFilter
                    min={filters.min_floors_total}
                    max={filters.max_floors_total}
                    onChange={(range) =>
                        setFilters((p) => ({
                            ...p,
                            min_floors_total: range.min,
                            max_floors_total: range.max,
                        }))
                    }
                />

                <YearBuiltFilter
                    min={filters.min_year_built}
                    max={filters.max_year_built}
                    onChange={(range) =>
                        setFilters((p) => ({ ...p, min_year_built: range.min, max_year_built: range.max }))
                    }
                />

                <DropdownFilter
                    label="Страна"
                    value={filters.country || ""}
                    options={["Узбекистан", "Казахстан", "Россия"]}
                    onChange={(val) => setFilters((p) => ({ ...p, country: val }))}
                />

                <DropdownFilter
                    label="Регион"
                    value={filters.region || ""}
                    options={[
                        "Республика Каракалпакстан",
                        "Андижанская область",
                        "Бухарская область",
                        "Джизакская область",
                        "Кашкадарьинская область",
                        "Навоийская область",
                        "Наманганская область",
                        "Самаркандская область",
                        "Сурхандарьинская область",
                        "Сырдарьинская область",
                        "Ферганская область",
                        "Хорезмская область",
                        "Ташкентская область",
                        "Город Ташкент",
                    ]}
                    onChange={(val) => setFilters((p) => ({ ...p, region: val }))}
                />

                <DropdownFilter
                    label="Город"
                    value={filters.city || ""}
                    options={["Ташкент", "Самарканд", "Бухара"]}
                    onChange={(val) => setFilters((p) => ({ ...p, city: val }))}
                />

                <DropdownFilter
                    label="Район"
                    value={filters.district || ""}
                    options={["Мирзо-Улугбекский", "Чиланзарский", "Юнусабадский"]}
                    onChange={(val) => setFilters((p) => ({ ...p, district: val }))}
                />

                <DropdownFilter
                    label="Улица"
                    value={filters.street || ""}
                    options={["Амир Темур", "Навои", "Фароби"]}
                    onChange={(val) => setFilters((p) => ({ ...p, street: val }))}
                />

                <DropdownFilter
                    label="Материал стен"
                    value={filters.wall_material || ""}
                    options={["Кирпич", "Панель", "Монолит", "Дерево", "Блок", "Каркас", "Другое"]}
                    onChange={(val) => setFilters((p) => ({ ...p, wall_material: val }))}
                />

                <DropdownFilter
                    label="Санузел"
                    value={filters.bathroom_layout || ""}
                    options={["Совмещённый", "Раздельный"]}
                    onChange={(val) => setFilters((p) => ({ ...p, bathroom_layout: val }))}
                />
                <div style={{ marginTop: "16px" }}>
                    <Button
                        style={{ width: '100%' }}
                        variant="primary"
                        size="lg"
                        onClick={() => { }}
                    >
                        Применить
                    </Button>
                </div>
            </div>
        </section>
    );
};
