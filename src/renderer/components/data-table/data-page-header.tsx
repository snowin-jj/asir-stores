import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/renderer/components/ui/button';

type DataPageHeaderProps = {
    pageTitle: string;
    ctaLabel?: string;
    path?: string;
    isBackBtn?: boolean;
    action?: () => void;
    children?: ReactNode;
    navState?: object;
    variant?:
        | 'link'
        | 'default'
        | 'destructive'
        | 'outline'
        | 'secondary'
        | 'ghost';
};
export function DataPageHeader({
    pageTitle,
    ctaLabel,
    path,
    action,
    children,
    isBackBtn = false,
    variant = 'default',
    navState,
}: DataPageHeaderProps) {
    const navigate = useNavigate();

    function handleClick() {
        isBackBtn ? navigate(-1) : action();
    }

    return (
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{pageTitle}</h2>
            {ctaLabel && (
                <nav className="flex items-center gap-6">
                    {children}
                    {path ? (
                        <Button variant={variant} asChild>
                            <Link to={path} state={navState}>
                                {ctaLabel}
                            </Link>
                        </Button>
                    ) : (
                        (action || isBackBtn) && (
                            <Button onClick={handleClick} variant={variant}>
                                {ctaLabel}
                            </Button>
                        )
                    )}
                </nav>
            )}
        </div>
    );
}
