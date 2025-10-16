"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CatalogLayout from "@/layouts/catalog-layout";
import CatalogHeader from "@/widgets/Catalog/SearchBar/SearchBar";
import { CatalogSection } from "@/widgets/Catalog/CatalogSection/CatalogSection";
import { FiltersProvider } from "@/shared/providers/FiltersProvider";

type DealType = "RENT" | "SALE";

function CatalogContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const dealType: DealType =
    typeParam?.toUpperCase() === "RENT" ? "RENT" : "SALE";

  return (
    <CatalogLayout>
      <FiltersProvider>
        <CatalogHeader />
        <CatalogSection type={dealType} />
      </FiltersProvider>
    </CatalogLayout>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div>Загрузка каталога...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
