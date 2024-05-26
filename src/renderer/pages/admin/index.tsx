import { Outlet } from 'react-router-dom';

import { Sidebar } from '@/renderer/components/sidebar';
import { adminPageSidebarLinks } from '@/renderer/data/ui';

export default function AdminLayout() {
    return (
        <main className={'flex min-h-screen'}>
            <Sidebar links={adminPageSidebarLinks} page={'Admin'} />
            <Outlet />
        </main>
    );
}
