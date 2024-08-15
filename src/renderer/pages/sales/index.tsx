import { Outlet } from 'react-router-dom';

import { Sidebar } from '@/renderer/components/sidebar';
import { salesPageSidebarLinks } from '@/renderer/data/ui';
import { Suspense } from 'react';
import LoadingScreen from '@/renderer/components/LoadingScreen';

export default function SalesLayout() {
    return (
        <main className={'flex min-h-screen'}>
            <Sidebar links={salesPageSidebarLinks} page={'Sales'} />
            <Suspense fallback={<LoadingScreen />}>
                <Outlet />
            </Suspense>
        </main>
    );
}
