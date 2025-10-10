"use client";

import BaseLayout from "@/layouts/base-layout";
import ProtectedRoute from "@/widgets/ProtectedRoute";

interface ObjectDetailClientProps {
    id: string;
}

export default function ObjectDetailClient({ id }: ObjectDetailClientProps) {
    return (
        <BaseLayout>
            <ProtectedRoute>
                <div>Детали объекта {id}</div>
            </ProtectedRoute>
        </BaseLayout>
    );
}
