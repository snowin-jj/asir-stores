import { cn } from '@/lib/utils';
import { getOrdersWithDetails } from '@/renderer/api/orders';
import { OrderWithDetails } from '@/types/order';
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { DataTablePagination } from '../data-table/data-table-pagination';
import { PaidBadge } from '../paid-badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../ui/card';
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '../ui/table';
import { columns } from './column';

interface RecentOrderProps {
    orders: OrderWithDetails[];
    selectedOrder: OrderWithDetails;
    handleOrderSelect: (order: OrderWithDetails) => void;
}

export function RecentOrders({
    orders,
    handleOrderSelect,
    selectedOrder,
}: RecentOrderProps) {
    const table = useReactTable({
        data: orders,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <Card className="flex w-full flex-col">
            <CardHeader>
                <CardTitle>Orders</CardTitle>
                <CardDescription>Recent orders from the store</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup, idx) => (
                            <TableRow key={`${idx}-${headerGroup.id}`}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row, idx) => (
                                <TableRow
                                    key={`${idx}-${row.id}`}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                    onClick={() =>
                                        handleOrderSelect(row.original)
                                    }
                                    className={cn(
                                        selectedOrder.id === row.original.id &&
                                            'bg-muted/50',
                                        'cursor-pointer',
                                    )}
                                >
                                    {row.getVisibleCells().map((cell, idx) => (
                                        <TableCell key={`${idx}-${cell.id}`}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
            {orders.length > 0 && (
                <CardFooter className="self-end">
                    <DataTablePagination table={table} />
                </CardFooter>
            )}
        </Card>
    );
}
