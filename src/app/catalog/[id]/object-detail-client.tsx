"use client";

import BaseLayout from "@/layouts/base-layout";
import ProtectedRoute from "@/widgets/ProtectedRoute";

export default function ObjectDetailClient({ id }: { id: string }) {
    return (
        <BaseLayout>
            <ProtectedRoute>
                <div>Детали объекта {id}</div>
            </ProtectedRoute>
        </BaseLayout>
    );
}
