import { Footer } from "@/widgets/Footer/Footer";
import Header from "@/widgets/Header/Header";
import { ReactNode } from 'react';


interface Props {
    children: ReactNode;
}

export default function BaseLayout({ children }: Props) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}
