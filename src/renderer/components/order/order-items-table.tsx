import { calculateActualAmount, cn } from '@/lib/utils';
import { OrderItemWithDetails } from '@/types/order';
import { formatCurrency } from '@/utils/formatters';
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table';

interface OrderItemsTableProps {
    orderItems: OrderItemWithDetails[];
    handleItemSelect?: (orderItem: OrderItemWithDetails) => void;
    isOrdering?: boolean;
    handleRemoveItem?: (idx: number) => void;
}

export function OrderItemsTable({
    orderItems,
    handleItemSelect,
    handleRemoveItem,
    isOrdering = false,
}: OrderItemsTableProps) {
    const totalAmount = orderItems.reduce((acc, item) => {
        const itemsPriceWithTax = item.price.amount * item.quantity;
        return acc + itemsPriceWithTax;
    }, 0);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Id</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Tax Rate</TableHead>
                    <TableHead className={cn(!isOrdering && 'text-right')}>
                        Total
                    </TableHead>
                    {isOrdering && (
                        <TableHead className="text-right">Action</TableHead>
                    )}
                </TableRow>
            </TableHeader>
            <TableBody>
                {orderItems.length > 0 ? (
                    orderItems.map((orderItem, idx) => (
                        <TableRow
                            key={`${orderItem?.id || idx + 1}-${orderItem.product.name}`}
                            onClick={() =>
                                handleItemSelect && handleItemSelect(orderItem)
                            }
                        >
                            <TableCell className="font-medium">
                                {orderItem?.id || idx + 1}
                            </TableCell>
                            <TableCell>{orderItem.product.name}</TableCell>
                            <TableCell>
                                {formatCurrency(
                                    Number(
                                        calculateActualAmount(
                                            orderItem.price.amount,
                                            orderItem.price.taxValue,
                                        ),
                                    ),
                                )}{' '}
                                / {orderItem.price.unit}
                            </TableCell>
                            <TableCell>
                                {orderItem.quantity * orderItem.price.quantity}{' '}
                                {orderItem.price.unit}
                            </TableCell>
                            <TableCell>{orderItem.price.taxValue} %</TableCell>
                            <TableCell
                                className={cn(!isOrdering && 'text-right')}
                            >
                                {formatCurrency(
                                    (
                                        orderItem.price.amount *
                                            orderItem.quantity
                                    ),
                                )}
                            </TableCell>
                            {isOrdering && (
                                <TableCell
                                    className="cursor-pointer text-right text-destructive"
                                    onClick={() => handleRemoveItem(idx)}
                                >
                                    Remove
                                </TableCell>
                            )}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell
                            colSpan={isOrdering ? 7 : 6}
                            className="h-24 text-center"
                        >
                            No Items Added
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={isOrdering ? 6 : 5}>Total</TableCell>
                    <TableCell className="text-right">
                        {formatCurrency((totalAmount))}
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
