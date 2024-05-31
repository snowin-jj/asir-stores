import {
    calculateActualAmount,
    calculateOrderItemsSubTotal,
    calculateOrderItemsTaxAmount,
} from '@/lib/utils';
import { Separator } from '@/renderer/components/ui/separator';
import { OrderWithDetails } from '@/types/order';
import { formatCurrency } from '@/utils/formatters';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../ui/card';

interface SelectedOrderProps {
    selectedOrder: OrderWithDetails;
}

export function SelectedOrder({ selectedOrder }: SelectedOrderProps) {
    return (
        <Card className="h-fit w-full max-w-md overflow-hidden">
            <CardHeader className="flex items-start bg-muted/50">
                <CardTitle className="flex w-full justify-between text-lg">
                    Order #{selectedOrder.id}
                    <Link
                        to={`/sales/orders/${selectedOrder.id}`}
                        className="flex items-center gap-2 text-muted-foreground"
                    >
                        View <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </CardTitle>
                <CardDescription>
                    Date: {new Date(selectedOrder.createdAt).toDateString()}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                    <div className="font-semibold">Order Details</div>
                    <ul className="grid gap-3">
                        {selectedOrder.orderItems.map((item) => (
                            <li
                                key={item.id}
                                className="flex items-center justify-between"
                            >
                                <span className="text-muted-foreground">
                                    <span>
                                        {item.quantity * item.price.quantity}{' '}
                                        {item.price.unit}
                                    </span>{' '}
                                    {item.product.name}
                                </span>
                                <span>
                                    {formatCurrency(
                                        item.quantity *
                                            Number(
                                                calculateActualAmount(
                                                    item.price.amount,
                                                    item.price.taxValue,
                                                ),
                                            ),
                                    )}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <Separator className="my-2" />
                    <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                                Sub Total
                            </span>
                            <span>
                                {formatCurrency(
                                    Number(
                                        calculateOrderItemsSubTotal(
                                            selectedOrder.orderItems,
                                        ),
                                    ),
                                )}
                            </span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">Tax</span>
                            <span>
                                {formatCurrency(
                                    Number(
                                        calculateOrderItemsTaxAmount(
                                            selectedOrder.orderItems,
                                        ),
                                    ),
                                )}
                            </span>
                        </li>
                        <li className="flex items-center justify-between font-semibold">
                            <span className="text-muted-foreground">Total</span>
                            <span>
                                {formatCurrency(selectedOrder.totalPrice)}
                            </span>
                        </li>
                    </ul>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                    <div className="font-semibold">Customer Information</div>
                    <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Customer</dt>
                            <dd>{selectedOrder.customer?.name || 'Unknown'}</dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Email</dt>
                            <dd>
                                <a href="#">
                                    {selectedOrder.customer?.email || 'Unknown'}
                                </a>
                            </dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Phone</dt>
                            <dd>
                                <a href="#">
                                    {selectedOrder.customer?.phone || 'Unknown'}
                                </a>
                            </dd>
                        </div>
                    </dl>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                    <div className="font-semibold">Payment Information</div>
                    <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                            <dt className="flex items-center gap-1 text-muted-foreground">
                                Payment Method
                            </dt>
                            <dd>{selectedOrder.paymentMethod || 'UNPAID'}</dd>
                        </div>
                    </dl>
                </div>
            </CardContent>
            <CardFooter className="flex flex-row items-center justify-between border-t bg-muted/50 px-6 py-3">
                <div className="flex gap-2 text-xs text-muted-foreground">
                    <p>Updated</p>
                    <time dateTime="2023-11-23">
                        {new Date(selectedOrder.updatedAt).toDateString()}
                    </time>
                </div>
            </CardFooter>
        </Card>
    );
}
