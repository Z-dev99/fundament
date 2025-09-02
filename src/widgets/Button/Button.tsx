'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import styles from './Button.module.scss';

type ButtonVariant = 'primary' | 'outline';
type ButtonSize = 'md' | 'lg';

interface BaseButtonProps {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
    tooltip?: string;
    as?: 'button' | 'a' | 'link';
}

type ButtonAsButton = BaseButtonProps &
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
        as?: 'button';
    };

type ButtonAsAnchor = BaseButtonProps &
    React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        as: 'a';
        href: string;
    };

type ButtonAsNextLink = BaseButtonProps & {
    as: 'link';
    href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsNextLink;

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    className,
    tooltip,
    as = 'button',
    ...rest
}: ButtonProps) {
    const classes = [
        styles.button,
        styles[variant],
        styles[size],
        className
    ]
        .filter(Boolean)
        .join(' ');

    const commonProps = {

        className: classes,
        title: tooltip,
    };

    if (as === 'link') {
        const { href, ...linkProps } = rest as ButtonAsNextLink;
        return (
            <Link href={href} {...commonProps} {...linkProps}>
                {children}
            </Link>
        );
    }

    if (as === 'a') {
        const { href, ...anchorProps } = rest as ButtonAsAnchor;
        return (
            <a href={href} {...commonProps} {...anchorProps}>
                {children}
            </a>
        );
    }

    return (
        <button {...commonProps} {...(rest as ButtonAsButton)}>
            {children}
        </button>
    );
}
