import { useEffect, useState } from 'react';

import { DataTable } from '@/renderer/components/data-table/index';
import { columns } from './columns';
import { TransactionWithProduct } from '@/types/transaction';
import { getTransactionsWithDetails } from '@/renderer/api/transactions';
import { transactionTypes } from '@/renderer/data/ui';

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
            <h1 className={'text-2xl font-bold'}>Transactions Page</h1>
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
