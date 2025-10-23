'use client';

import { ReactNode } from 'react';
import BaseLayout from './base-layout';

interface Props {
  children: ReactNode;
}

export default function CatalogLayout({ children }: Props) {
  return (
    <BaseLayout>{children}</BaseLayout>
  );
}
