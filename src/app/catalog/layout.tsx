import CatalogLayout from '@/layouts/catalog-layout';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export default function Layout({ children }: Props) {
    return <CatalogLayout>{children}</CatalogLayout>;
}
