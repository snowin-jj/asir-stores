import { PaidBadge } from '@/renderer/components/paid-badge';
import { Button } from '@/renderer/components/ui/button';
import type { OrderWithDetails } from '@/types/order';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

export const columns: ColumnDef<OrderWithDetails>[] = [
    {
        accessorKey: 'customer.name',
        header: 'Customer Name',
        cell: ({ row }) => {
            const customer = row.original.customer;

            return <p>{customer.name ? customer.name : 'Unknown'}</p>;
        },
    },
    {
        accessorKey: 'isPaid',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Is Paid
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return <PaidBadge isPaid={row.original.isPaid} />;
        },
    },
    {
        accessorKey: 'createdAt',
        header: 'Ordered Date',
        cell: ({ row }) => {
            const order = row.original;
            return (
                <div>
                    <span>
                        {order.createdAt
                            ? formatDate(new Date(order.createdAt))
                            : '-'}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: 'paidAt',
        header: 'Paid Date',
        cell: ({ row }) => {
            const order = row.original;
            return (
                <div>
                    <span>
                        {order.paidAt
                            ? formatDate(new Date(order.paidAt))
                            : '-'}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: 'paidAt',
        header: 'Paid Date',
        cell: ({ row }) => {
            const order = row.original;
            return <p>{formatCurrency(order.totalPrice)}</p>;
        },
    },
];
