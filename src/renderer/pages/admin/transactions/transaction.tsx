import { calculateTaxAmount } from '@/lib/utils';
import { getTransaction } from '@/renderer/api/transactions';
import BackButton from '@/renderer/components/back-button';
import { Button } from '@/renderer/components/ui/button';
import { TransactionWithProduct } from '@/types/transaction';
import { convertToBaseUnit } from '@/utils/convert';
import { ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function TransactionPage() {
    const { id } = useParams();
    const [transaction, setTransaction] = useState<TransactionWithProduct>();

    useEffect(() => {
        (async () => {
            const data = await getTransaction(Number(id));
            console.log(data);

            setTransaction(data);
        })();
    }, []);

    if (!transaction) return <p>Loading...</p>;

    return (
        <main className="mx-auto grid w-full place-items-center">
            <div className="h-full w-full max-w-6xl px-20 py-20">
                <BackButton />
                <div className="flex flex-col gap-8">
                    <div className="flex w-full justify-between gap-6">
                        <div>
                            <h2 className="text-2xl font-bold">
                                {transaction.product.name}
                            </h2>
                            <p>{transaction.product.description}</p>
                        </div>
                        <Button variant="link" asChild>
                            <Link
                                to={`/admin/products/${transaction.productId}`}
                            >
                                View <ExternalLink className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                    <div className="flex gap-10">
                        <span>
                            <strong>Transaction Date</strong>
                            <p>
                                {new Date(
                                    transaction.transactionDate,
                                ).toDateString()}
                            </p>
                        </span>
                        <span>
                            <strong>Transaction Type</strong>
                            <p>{transaction.transactionType}</p>
                        </span>
                        <span>
                            <strong>Quantity</strong>
                            {transaction.transactionType !== 'PURCHASE' ? (
                                <p>
                                    {convertToBaseUnit(
                                        transaction.quantity,
                                        transaction.product.baseUnitValue,
                                        transaction.transactionType,
                                    )}{' '}
                                    {transaction.product.baseUnit}
                                </p>
                            ) : (
                                <p>
                                    {transaction.quantity}
                                    {transaction.product.purchasedUnit}
                                </p>
                            )}
                        </span>
                        {transaction.transactionType !== 'PURCHASE' ? (
                            <>
                                <span>
                                    <strong>Sold Price</strong>
                                    <p>
                                        ₹ {Number(transaction.price?.amount)} /{' '}
                                        {transaction.price.quantity}{' '}
                                        {transaction.price.unit}
                                    </p>
                                </span>
                                <span>
                                    <strong>Tax Rate</strong>
                                    <p>
                                        {Number(transaction.price?.taxValue)} %
                                    </p>
                                </span>
                            </>
                        ) : (
                            <span>
                                <strong>Purchased Price</strong>
                                <p>₹ {transaction.product.purchasedPrice}</p>
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
