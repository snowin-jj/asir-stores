import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Sidebar } from '@/renderer/components/sidebar';
import { adminPageSidebarLinks } from '@/renderer/data/ui';
import LoadingScreen from '@/renderer/components/LoadingScreen';

export default function AdminLayout() {
    return (
        <main className={'flex min-h-screen'}>
            <Sidebar links={adminPageSidebarLinks} page={'Admin'} />
            <Suspense fallback={<LoadingScreen />}>
                <Outlet />
            </Suspense>
        </main>
    );
}
