import { PaidBadge } from '@/renderer/components/paid-badge';
import { Button } from '@/renderer/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/renderer/components/ui/dropdown-menu';
import type { OrderWithCustomer } from '@/types/order';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

export const columns: ColumnDef<OrderWithCustomer>[] = [
    {
        accessorKey: 'id',
        header: 'Id',
    },
    {
        accessorKey: 'customer.name',
        header: 'Customer Name',
        cell: ({ row }) => {
            const customer = row.original.customer;

            return <p>{customer.name ? customer.name : 'Unknown'}</p>;
        },
    },
    {
        accessorKey: 'paymentMethod',
        header: 'Payment Method',
        cell: ({ row }) => {
            return <p className="ml-2">{row.original.paymentMethod || '-'}</p>;
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
        accessorKey: 'paidAt',
        header: 'Paid At',
        cell: ({ row }) => {
            const order = row.original;
            return (
                <div>
                    <span>
                        {order.paidAt
                            ? new Date(order.paidAt).toDateString()
                            : '-'}
                    </span>
                </div>
            );
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                            <Link to={`/sales/orders/${row.original.id}`}>
                                View details
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
