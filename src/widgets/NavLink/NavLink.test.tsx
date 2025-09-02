// NavLink.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import NavLink from './NavLink';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
}));

describe('NavLink', () => {
    const usePathnameMock = usePathname as jest.Mock;

    beforeEach(() => {
        usePathnameMock.mockReset();
    });

    it('рендерит ссылку с корректным href и children', () => {
        usePathnameMock.mockReturnValue('/about');
        render(<NavLink href="/about">About Us</NavLink>);
        const link = screen.getByRole('link', { name: /about us/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/about');
    });

    it('добавляет activeClassName, когда ссылка активна', () => {
        usePathnameMock.mockReturnValue('/about');
        render(
            <NavLink href="/about" activeClassName="active" className="base">
                About Us
            </NavLink>
        );
        const link = screen.getByRole('link', { name: /about us/i });
        expect(link).toHaveClass('base');
        expect(link).toHaveClass('active');
    });

    it('не добавляет activeClassName, когда ссылка не активна', () => {
        usePathnameMock.mockReturnValue('/home');
        render(
            <NavLink href="/about" activeClassName="active" className="base">
                About Us
            </NavLink>
        );
        const link = screen.getByRole('link', { name: /about us/i });
        expect(link).toHaveClass('base');
        expect(link).not.toHaveClass('active');
    });

    it('использует пустую строку по умолчанию для activeClassName', () => {
        usePathnameMock.mockReturnValue('/about');
        render(<NavLink href="/about">About Us</NavLink>);
        const link = screen.getByRole('link', { name: /about us/i });
        expect(link.className).toBe('');
    });
});
