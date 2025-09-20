'use client';

import { AuthProvider } from '@/shared/providers/AuthProvider';
import { ReduxProvider } from '@/shared/providers/ReduxProvider';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
    return (
        <AuthProvider debugMode={true}>
            <ReduxProvider>
                {children}
            </ReduxProvider>
        </AuthProvider>
    );
}
