import { useEffect, useState } from 'react';

import { getTransactionsWithDetails } from '@/renderer/api/transactions';
import { DataPageHeader } from '@/renderer/components/data-table/data-page-header';
import { DataTable } from '@/renderer/components/data-table/index';
import { transactionTypes } from '@/renderer/data/ui';
import { TransactionWithProduct } from '@/types/transaction';
import { columns } from './columns';

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<TransactionWithProduct[]>(
        [],
    );

    useEffect(() => {
        (async () => {
            const data = await getTransactionsWithDetails();
            console.log(data);
            setTransactions(data);
        })();
    }, []);

    return (
        <main className={'container my-6 w-full'}>
            <DataPageHeader pageTitle="Transaction Page" />
            <DataTable
                data={transactions}
                columns={columns}
                filterAccessorKey={'product_name'}
                filterLabel={'Product Name'}
                sorterLabel={'Transaction Type'}
                sorterAccessorKey={'transactionType'}
                sorterOptions={transactionTypes}
            />
        </main>
    );
}
