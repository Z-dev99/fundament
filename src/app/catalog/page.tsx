"use client";
import React from "react";
import CatalogLayout from "@/layouts/catalog-layout";
import CatalogHeader from "@/widgets/Catalog/SearchBar/SearchBar";
import { CatalogSection } from "@/widgets/Catalog/CatalogSection/CatalogSection";

export default function CatalogPage() {
    return (
        <CatalogLayout>
            <>
                <CatalogHeader onSearch={() => { }} onFilterChange={() => { }} />
                <CatalogSection />
            </>
        </CatalogLayout>
    );
}
