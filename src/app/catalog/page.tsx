"use client";
import React from "react";
import CatalogLayout from "@/layouts/catalog-layout";
import CatalogHeader from "@/widgets/Catalog/SearchBar/SearchBar";
import { CatalogSection } from "@/widgets/Catalog/CatalogSection/CatalogSection";
import { FiltersProvider } from "@/shared/providers/FiltersProvider";
import { useSearchParams } from "next/navigation";

type DealType = "RENT" | "SALE";

export default function CatalogPage() {
    const searchParams = useSearchParams();
    const typeParam = searchParams.get("type")?.toUpperCase() as DealType | undefined;
    const dealType: DealType = typeParam === "RENT" ? "RENT" : "SALE";

    return (
        <CatalogLayout>
            <FiltersProvider>
                <CatalogHeader />
                <CatalogSection type={dealType} />
            </FiltersProvider>
        </CatalogLayout>
    );
}
