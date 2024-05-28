import { DataTableFacetedFilter } from '@/renderer/components/data-table/data-table-faced-filter';
import { Button } from '@/renderer/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/renderer/components/ui/dropdown-menu';
import { Input } from '@/renderer/components/ui/input';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { SlidersHorizontal } from 'lucide-react';
import { ComponentType } from 'react';

interface SorterOptionsType {
    label: string;
    value: string;
    icon?: ComponentType<{ className?: string }>;
}

export interface DataTableFilterType {
    filterLabel: string;
    filterAccessorKey: string;
    sorterAccessorKey?: string;
    sorterLabel?: string;
    sorterOptions?: SorterOptionsType[];
}

interface DataTableToolBarProps<TData> extends DataTableFilterType {
    table: Table<TData>;
}

export function DataTableToolbar<TData>({
    table,
    filterLabel,
    filterAccessorKey,
    sorterAccessorKey,
    sorterLabel,
    sorterOptions,
}: DataTableToolBarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center px-2 py-4">
            <Input
                placeholder={`Filter by ${filterLabel}...`}
                value={
                    (table
                        .getColumn(filterAccessorKey)
                        ?.getFilterValue() as string) ?? ''
                }
                onChange={(event) => {
                    table
                        .getColumn(filterAccessorKey)
                        ?.setFilterValue(event.target.value);
                }}
                className="max-w-sm"
            />
            <div className="mx-4 space-x-2">
                {sorterAccessorKey &&
                    sorterOptions &&
                    table.getColumn(sorterAccessorKey) && (
                        <DataTableFacetedFilter
                            column={table.getColumn(sorterAccessorKey)}
                            title={sorterLabel}
                            options={sorterOptions}
                        />
                    )}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                    >
                        Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="ml-auto hidden h-8 lg:flex"
                    >
                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                        View
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {table
                        .getAllColumns()
                        .filter(
                            (column) =>
                                typeof column.accessorFn !== 'undefined' &&
                                column.getCanHide(),
                        )
                        .map((column) => {
                            return (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            );
                        })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
