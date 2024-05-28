import { getCustomer, getOrdersWithDetails } from '@/renderer/api/orders';
import { DataPageHeader } from '@/renderer/components/data-table/data-page-header';
import CustomerForm from '@/renderer/components/form/customer-form';
import { OrderItemsTable } from '@/renderer/components/order/order-items-table';
import { PaidBadge } from '@/renderer/components/paid-badge';
import { Card, CardContent } from '@/renderer/components/ui/card';
import { Separator } from '@/renderer/components/ui/separator';
import { Customer, OrderWithDetails } from '@/types/order';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CustomerPage() {
    const [customer, setCustomer] = useState<Customer>();
    const [orders, setOrders] = useState<OrderWithDetails[]>([]);
    const [mode, setMode] = useState<'EDIT' | 'CREATE' | 'VIEW'>('VIEW');
    const btnState =
        mode !== 'EDIT'
            ? {
                  label: 'Edit',
                  action: () => setMode('EDIT'),
                  variant: 'default',
              }
            : {
                  label: 'Cancel',
                  action: () => setMode('VIEW'),
                  variant: 'secondary',
              };

    const { id } = useParams();

    useEffect(() => {
        (async () => {
            const customerData = await getCustomer(Number(id));
            const ordersData = await getOrdersWithDetails();
            setCustomer(customerData);
            setOrders(
                ordersData.filter((order) => order.customerId === Number(id)),
            );
        })();
    }, []);

    return (
        <main className="container my-6 w-full space-y-8">
            <DataPageHeader
                pageTitle="Cutomer Details"
                ctaLabel={btnState.label}
                action={btnState.action}
                //@ts-ignore
                variant={btnState.variant}
            />
            <CustomerForm
                mode={mode}
                customer={customer}
                updateMode={(mode) => setMode(mode)}
            />
            <h3 className="text-2xl font-bold">Order History</h3>
            {orders.length > 0 ? (
                orders.map((order) => (
                    <div key={order.id} className="space-y-4">
                        <header className="flex justify-between">
                            <h4>{new Date(order.createdAt).toDateString()}</h4>
                            <PaidBadge isPaid={order.isPaid} />
                        </header>
                        <Separator />
                        <OrderItemsTable orderItems={order.orderItems} />
                    </div>
                ))
            ) : (
                <Card className="grid h-60 place-items-center text-center">
                    <CardContent>
                        <span className="font-medium">No History</span>
                    </CardContent>
                </Card>
            )}
        </main>
    );
}
