import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/renderer/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/renderer/components/ui/dropdown-menu';
import { transactionTypes } from '@/renderer/data/ui';
import { Link } from 'react-router-dom';
import { TransactionWithProduct } from '@/types/transaction';

export const columns: ColumnDef<TransactionWithProduct>[] = [
    {
        accessorKey: 'id',
        header: 'Transaction Id',
    },
    {
        accessorKey: 'product.name',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Product Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const product = row.original.product;
            return (
                <p className="max-w-[15rem] truncate px-4">
                    {product ? product.name : '-'}
                </p>
            );
        },
    },
    {
        id: 'transactionType',
        accessorKey: 'transactionType',
        header: 'Transaction Type',
        cell: ({ row, column: { id } }) => {
            const transactionType = transactionTypes.find(
                (transactionType) => transactionType.value === row.getValue(id),
            );
            if (!transactionType) {
                return null;
            }
            return (
                <div className="flex w-[100px] items-center px-1">
                    {transactionType.icon && (
                        <transactionType.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{transactionType.label}</span>
                </div>
            );
        },
        filterFn: (row, columnId, value) => {
            return value.includes(row.getValue(columnId));
        },
    },
    {
        accessorKey: 'quantity',
        header: 'Quantity',
        cell: ({ row }) => {
            return (
                <p className="px-1">
                    {row.original.quantity}{' '}
                    {row.original.product?.purchasedUnit}
                </p>
            );
        },
    },
    {
        accessorKey: 'transactionDate',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Transaction Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const date = row.original;
            return (
                <div className="px-5">
                    <span>{new Date(date.transactionDate).toDateString()}</span>
                </div>
            );
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const transaction = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <Link
                                to={`/admin/transactions/${transaction.id}`}
                                className="w-full"
                            >
                                View details
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
