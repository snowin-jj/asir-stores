import { Link } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/renderer/components/ui/button';
import { ActivityBadge } from '@/renderer/components/active-badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/renderer/components/ui/dropdown-menu';
import { ProductWithCategory } from '@/types/product';
import { convertToPurchasedUnit } from '@/utils/convert';

export const columns: ColumnDef<ProductWithCategory>[] = [
    {
        accessorKey: 'id',
        header: 'Id',
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <p className="max-w-[15rem] truncate px-4">
                    {row.original.name}
                </p>
            );
        },
    },
    {
        accessorKey: 'price',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const price = row.original.sellingPrices[0];
            return (
                <p className="px-4">
                    ₹ {price.amount} / {price.unit}
                </p>
            );
        },
    },
    {
        accessorKey: 'stock',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Stock
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const stockInPurchasedUnit = convertToPurchasedUnit(
                row.original.stock,
                row.original.baseUnitValue,
            );
            return (
                <p className="px-4">
                    {stockInPurchasedUnit} {row.original.purchasedUnit}
                </p>
            );
        },
    },
    {
        accessorKey: 'isActive',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className=""
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Is Active
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const product = row.original;
            return (
                <div className="px-4">
                    <ActivityBadge
                        reorderPoint={product.reorderPoint}
                        stock={product.stock}
                        isActive={product.isActive}
                    />
                </div>
            );
        },
    },
    {
        id: 'categoryName',
        accessorKey: 'category.name',
        header: 'Category',
        filterFn: (row, columnId, value) => {
            return value.includes(row.getValue(columnId));
        },
    },
    {
        id: 'actions',
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
                            <Link
                                to="/admin/transactions/new"
                                state={{
                                    transactionType: 'PURCHASE',
                                    ...row.original,
                                }}
                            >
                                Make Purchase
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link to={`${row.original.id}`}>View details</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
