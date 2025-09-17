"use client";

import BaseLayout from "@/layouts/base-layout";
import ProtectedRoute from "@/widgets/ProtectedRoute";


export default function ProfilePage() {


    return (
        <ProtectedRoute>
            <BaseLayout>
                <div style={{ padding: "2rem" }}>
                    <h1>Профиль</h1>
                    <p>Это защищённая страница. Только авторизованные пользователи могут видеть этот контент.</p>
                </div>
            </BaseLayout>
        </ProtectedRoute>
    );
}
