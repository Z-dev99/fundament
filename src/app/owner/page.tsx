"use client";

import BaseLayout from "@/layouts/base-layout";
import ProtectedRoute from "@/widgets/ProtectedRoute";
import React from "react";

export default function OwnerPage() {
    return (
        <ProtectedRoute>
            <BaseLayout>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "80vh",
                        textAlign: "center",
                        padding: "20px",
                        color: "#333",
                    }}
                >
                    <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "20px" }}>
                        Панель модератора
                    </h1>
                    <p style={{ fontSize: "18px", color: "#666" }}>
                        Здесь будут отображаться все инструменты модератора.
                    </p>
                </div>
            </BaseLayout>
        </ProtectedRoute>
    );
}
