import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import '@testing-library/jest-dom';

jest.mock('next/image', () => {
    const React = require('react');
    return (props: any) => {
        const { priority, ...rest } = props;
        return React.createElement('img', { ...rest, alt: props.alt });
    };
});



jest.mock('next/navigation', () => ({
    usePathname: () => '/',
}));

describe('Header', () => {
    it('renders logo image and menu items', () => {
        render(<Header />);

        const logo = screen.getByAltText('Логотип');
        expect(logo).toBeInTheDocument();

        const menuItems = ['Продажа', 'Аренда', 'Условия', 'Контакты'];
        menuItems.forEach(label => {
            expect(screen.getByText(label)).toBeInTheDocument();
        });
    });
});
