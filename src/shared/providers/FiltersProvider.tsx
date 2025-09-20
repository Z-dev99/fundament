"use client";
import { FiltersState } from "@/widgets/Catalog/Filters/types";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface FiltersContextProps {
    filters: FiltersState;
    updateFilter: <K extends keyof FiltersState>(key: K, value: FiltersState[K]) => void;
    resetFilters: () => void;
}

const FiltersContext = createContext<FiltersContextProps | undefined>(undefined);

interface Props {
    children: ReactNode;
}

export const FiltersProvider: React.FC<Props> = ({ children }) => {
    const [filters, setFilters] = useState<FiltersState>({});

    const updateFilter = <K extends keyof FiltersState>(key: K, value: FiltersState[K]) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const resetFilters = () => {
        setFilters({});
    };

    return (
        <FiltersContext.Provider value={{ filters, updateFilter, resetFilters }}>
            {children}
        </FiltersContext.Provider>
    );
};

export const useFilters = (): FiltersContextProps => {
    const context = useContext(FiltersContext);
    if (!context) {
        throw new Error("useFilters must be used within a FiltersProvider");
    }
    return context;
};
