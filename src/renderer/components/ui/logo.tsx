import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from './badge';

type LogoProps = React.ComponentPropsWithoutRef<'a'> & {
    page?: string;
};

export default function Logo({ page, href, className, ...props }: LogoProps) {
    return (
        <Link
            to={href ?? '/'}
            className={`flex items-center gap-2 text-3xl font-black ${className}`}
            {...props}
        >
            Asir Stores
            <Badge className="mt-2" variant="secondary">
                {page || 'Admin'}
            </Badge>
        </Link>
    );
}
