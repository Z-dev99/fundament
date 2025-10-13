"use client";
import { FiltersState } from "@/widgets/Catalog/Filters/types";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface FiltersContextProps {
    dealType: "SALE" | "RENT";
    setDealType: (type: "SALE" | "RENT") => void;
    filters: FiltersState;
    updateFilter: <K extends keyof FiltersState>(key: K, value: FiltersState[K]) => void;
    resetFilters: () => void;
}

const FiltersContext = createContext<FiltersContextProps | undefined>(undefined);

interface Props {
    children: ReactNode;
    initialDealType?: "SALE" | "RENT";
}

export const FiltersProvider: React.FC<Props> = ({ children, initialDealType = "SALE" }) => {
    const [dealType, setDealTypeState] = useState<"SALE" | "RENT">(initialDealType);
    const [filters, setFilters] = useState<FiltersState>({});

    const updateFilter = <K extends keyof FiltersState>(key: K, value: FiltersState[K]) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const resetFilters = () => {
        setFilters({});
    };

    const setDealType = (type: "SALE" | "RENT") => {
        setDealTypeState(type);
        resetFilters();
    };

    return (
        <FiltersContext.Provider value={{ dealType, setDealType, filters, updateFilter, resetFilters }}>
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
