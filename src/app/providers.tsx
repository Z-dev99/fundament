'use client';

import { AuthProvider } from '@/shared/providers/AuthProvider';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
    return <AuthProvider debugMode={true}>{children}</AuthProvider>;
}
