import { Outlet } from 'react-router-dom';

import { Sidebar } from '@/renderer/components/sidebar';
import { salesPageSidebarLinks } from '@/renderer/data/ui';

export default function SalesLayout() {
    return (
        <main className={'flex min-h-screen'}>
            <Sidebar links={salesPageSidebarLinks} page={'Sales'} />
            <Outlet />
        </main>
    );
}
