import { Link } from 'react-router-dom';

import { Button } from './ui/button';
import Logo from './ui/logo';

interface SidebarProps {
    links: {
        to: string;
        label: string;
    }[];
    page?: 'Admin' | 'Sales';
}
export function Sidebar({ page, links }: SidebarProps) {
    return (
        <main className="flex min-h-full w-full max-w-[15rem] flex-col justify-between border-2 p-4">
            <div className="flex flex-col gap-4">
                <Logo className="pl-4" page={page} />
                <nav className="flex flex-col items-start gap-2">
                    {links.map((link, idx) => (
                        <Link
                            key={`${link.label}-${idx}`}
                            to={link.to || '/'}
                            className="w-full"
                        >
                            <Button
                                variant="ghost"
                                className="w-full justify-start"
                            >
                                {link.label}
                            </Button>
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="flex flex-col items-start gap-2">
                <Link to="/admin/settings" className="w-full">
                    <Button variant="ghost" className="w-full justify-start">
                        Settings
                    </Button>
                </Link>
                <Button variant="ghost" className="w-full justify-start">
                    Logout
                </Button>
            </div>
        </main>
    );
}
