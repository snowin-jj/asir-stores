import { Link } from 'react-router-dom';
import { useStore } from '@nanostores/react';

import { $activePanel } from '@/renderer/store';
import { Button } from './ui/button';
import Logo from './ui/logo';
import { ComponentType } from 'react';
import { Separator } from './ui/separator';

interface SidebarProps {
    links: {
        to: string;
        label: string;
        icon: ComponentType<{ className?: string }>;
    }[];
    page?: 'Admin' | 'Sales';
}
export function Sidebar({ page, links }: SidebarProps) {
    const activePanel = useStore($activePanel);

    return (
        <main className="flex min-h-full w-full max-w-[15rem] flex-col justify-between border-2 p-4">
            <div className="flex flex-col gap-4">
                <Logo className="pl-4" page={page} />
                <Separator />
                <nav className="flex flex-col items-start gap-2">
                    {links.map((link, idx) => (
                        <Link
                            key={`${link.label}-${idx}`}
                            to={link.to || '/'}
                            className="w-full"
                        >
                            <Button
                                variant="ghost"
                                className="w-full justify-start space-x-2"
                            >
                                <link.icon className="mr-2 h-5 w-5" />
                                <span>{link.label}</span>
                            </Button>
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="flex flex-col items-start gap-2">
                <Separator />
                {activePanel === 'ADMIN' && (
                    <Button
                        asChild
                        variant="ghost"
                        className="w-full justify-start"
                    >
                        <Link to="/admin/settings" className="w-full">
                            Settings
                        </Link>
                    </Button>
                )}
                <Button variant="ghost" className="w-full justify-start">
                    Logout
                </Button>
            </div>
        </main>
    );
}
