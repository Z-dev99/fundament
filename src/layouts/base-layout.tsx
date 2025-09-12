import { Footer } from "@/widgets/Footer/Footer";
import Header from "@/widgets/Header/Header";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function BaseLayout({ children }: Props) {
    return (
        <>
            {/* Бегущая строка */}
            <div
                style={{
                    width: "100%",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    background: "#ff4d4f",
                    color: "#fff",
                    fontWeight: "bold",
                    padding: "8px 0",
                    position: "relative",
                    zIndex: 50,
                }}
            >
                <div
                    style={{
                        display: "inline-block",
                        paddingLeft: "100%",
                        animation: "marquee 12s linear infinite",
                    }}
                >
                    🚧 Сайт находится в разработке 🚧
                </div>
            </div>

            <Header />
            <main>{children}</main>
            <Footer />

            <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
        </>
    );
}
