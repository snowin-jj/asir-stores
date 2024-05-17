import { useEffect } from 'react';

import { ProductWithPrice } from '../types/product';
import { Transaction } from '../types/transaction';

export default function App() {
    useEffect(() => {
        (async () => {
            const data = await window.api.getTransactions();
            console.log(JSON.parse(data) as Transaction[]);
        })();
    }, []);

    async function handleCreate() {
        try {
            const res = await window.api.createTransaction({
                transactionType: 'PURCHASE',
                productId: 4,
                quantity: 10,
            });
            console.log(JSON.parse(res));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main>
            <h2>Hello</h2>
            <button onClick={handleCreate}>Create</button>
        </main>
    );
}
