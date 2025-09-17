'use client';

import { ReactNode } from 'react';
import BaseLayout from './base-layout';
import ProtectedRoute from '@/widgets/ProtectedRoute';

interface Props {
  children: ReactNode;
}

export default function CatalogLayout({ children }: Props) {
  return (
    <ProtectedRoute>
      <BaseLayout>{children}</BaseLayout>
    </ProtectedRoute>
  );
}
