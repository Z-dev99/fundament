import { ReactNode } from 'react';
import '@/styles/globals.css';
export const metadata = {
    title: 'fundament — Продажа и аренда квартир, домов и коммерческой недвижимости',
    description: 'fundament — надежный сервис для поиска и покупки, аренды квартир, домов, офисов и коммерческих помещений.',
    keywords: [
        'недвижимость',
        'продажа квартир',
        'аренда квартир',
        'продажа домов',
        'аренда домов',
        'коммерческая недвижимость',
        'купить квартиру',
        'снять квартиру',
        'купить дом',
        'снять дом',
        'аренда офисов',
        'поиск недвижимости',
        'fundament',
    ].join(', '),
    icons: {
        icon: '/favicon.svg',
    },
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ru">
            <body>
                {children}
            </body>
        </html>
    );
}
