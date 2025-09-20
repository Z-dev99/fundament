"use client";
import React from "react";
import CatalogLayout from "@/layouts/catalog-layout";
import CatalogHeader from "@/widgets/Catalog/SearchBar/SearchBar";
import { CatalogSection } from "@/widgets/Catalog/CatalogSection/CatalogSection";
import { FiltersProvider } from "@/shared/providers/FiltersProvider";

export default function CatalogPage() {
    return (
        <CatalogLayout>
            <>
                <FiltersProvider>
                    <CatalogHeader />
                    <CatalogSection />
                </FiltersProvider>
            </>
        </CatalogLayout>
    );
}
