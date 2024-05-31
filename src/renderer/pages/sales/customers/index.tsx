import { useEffect, useState } from 'react';

import { getCustomers } from '@/renderer/api/orders';
import { DataTable } from '@/renderer/components/data-table';
import { DataPageHeader } from '@/renderer/components/data-table/data-page-header';
import { Customer } from '@/types/order';
import { columns } from './columns';

export default function CustomersPage() {
    const [customers, setCustomer] = useState<Customer[]>([]);

    useEffect(() => {
        (async () => {
            const customers = await getCustomers();
            setCustomer(customers);
        })();
    }, []);

    return (
        <main className={'container my-6 w-full'}>
            <DataPageHeader
                pageTitle="Customers Page"
                ctaLabel="New Customer"
                path="/sales/customers/new"
                navState={{ callbackUrl: '/sales/customers' }}
            />
            <DataTable
                data={customers}
                columns={columns}
                filterAccessorKey={'name'}
                filterLabel={'Customer Name'}
            />
        </main>
    );
}
