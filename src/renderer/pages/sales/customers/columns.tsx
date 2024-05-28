import { Button } from '@/renderer/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/renderer/components/ui/dropdown-menu';
import type { Customer } from '@/types/order';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

export const columns: ColumnDef<Customer>[] = [
    {
        accessorKey: 'id',
        header: 'Id',
    },
    {
        accessorKey: 'name',
        header: 'Customer Name',
    },
    {
        accessorKey: 'phone',
        header: 'Phone Number',
    },
    {
        accessorKey: 'points',
        header: 'Points',
    },
    {
        accessorKey: 'aadhaar',
        header: 'Aadahaar Number',
        cell: ({ row }) => {
            return <p>{row.original.aadhaar || 'No Aadhaar'}</p>;
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
                            <Link to={`/sales/customers/${row.original.id}`}>
                                View details
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
