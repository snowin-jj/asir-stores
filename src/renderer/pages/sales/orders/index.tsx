import { useEffect, useState } from 'react';

import { getOrders } from '@/renderer/api/orders';
import { DataTable } from '@/renderer/components/data-table';
import { DataPageHeader } from '@/renderer/components/data-table/data-page-header';
import { OrderWithCustomer } from '@/types/order';
import { columns } from './columns';

export default function OrdersPage() {
    const [orders, setOrders] = useState<OrderWithCustomer[]>([]);

    useEffect(() => {
        (async () => {
            const orders = await getOrders();
            setOrders(orders);
        })();
    }, []);

    return (
        <main className={'container my-6 w-full'}>
            <DataPageHeader
                pageTitle="Orders Page"
                buttons={[{ label: 'New Order', path: '/sales/orders/new' }]}
            />
            <DataTable
                data={orders}
                columns={columns}
                filterAccessorKey={'customer_name'}
                filterLabel={'Customer Name'}
            />
        </main>
    );
}
