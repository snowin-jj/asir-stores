import { getCustomer, getOrdersWithDetails } from '@/renderer/api/orders';
import BackButton from '@/renderer/components/back-button';
import {
    DataHeaderButtonProps,
    DataPageHeader,
} from '@/renderer/components/data-table/data-page-header';
import { DataTablePagination } from '@/renderer/components/data-table/data-table-pagination';
import CustomerForm from '@/renderer/components/form/customer-form';
import { OrderItemsTable } from '@/renderer/components/order/order-items-table';
import { PaidBadge } from '@/renderer/components/paid-badge';
import { Card, CardContent } from '@/renderer/components/ui/card';
import { Separator } from '@/renderer/components/ui/separator';
import { Customer, OrderWithDetails } from '@/types/order';
import { formatDateTime } from '@/utils/formatters';
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CustomerPage() {
    const [customer, setCustomer] = useState<Customer>();
    const [orders, setOrders] = useState<OrderWithDetails[]>([]);
    const [mode, setMode] = useState<'EDIT' | 'CREATE' | 'VIEW'>('VIEW');
    const btnState: DataHeaderButtonProps[] =
        mode !== 'EDIT'
            ? [
                  {
                      label: 'Edit',
                      action: () => setMode('EDIT'),
                      variant: 'default',
                  },
              ]
            : [
                  {
                      label: 'Cancel',
                      action: () => setMode('VIEW'),
                      variant: 'secondary',
                  },
              ];

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

    const columns: ColumnDef<OrderWithDetails>[] = [
        {
            accessorKey: 'id',
            header: 'Id',
        },
    ];

    const table = useReactTable({
        data: orders,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <main className="container my-6 w-full space-y-8">
            <header>
                <BackButton />
                <DataPageHeader
                    pageTitle="Cutomer Details"
                    buttons={btnState}
                />
            </header>
            <CustomerForm
                mode={mode}
                customer={customer}
                updateMode={(mode) => setMode(mode)}
            />
            <h3 className="text-2xl font-bold">Sales History</h3>
            {orders.length > 0 ? (
                table.getRowModel().rows.map(({ id, original }) => (
                    <div key={id} className="space-y-4">
                        <header className="flex justify-between">
                            <h4>
                                {formatDateTime(new Date(original.createdAt))}
                            </h4>
                            <PaidBadge isPaid={original.isPaid} />
                        </header>
                        <Separator />
                        <OrderItemsTable orderItems={original.orderItems} />
                    </div>
                ))
            ) : (
                <Card className="grid h-60 place-items-center text-center">
                    <CardContent>
                        <span className="font-medium">No History</span>
                    </CardContent>
                </Card>
            )}
            {orders.length > 0 && <DataTablePagination table={table} />}
        </main>
    );
}
