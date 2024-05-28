import { calculateTaxAmount, calculateTotalTax, cn } from '@/lib/utils';
import { getOrdersWithDetails } from '@/renderer/api/orders';
import { DataPageHeader } from '@/renderer/components/data-table/data-page-header';
import { PaidBadge } from '@/renderer/components/paid-badge';
import { Button } from '@/renderer/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/renderer/components/ui/card';
import { Separator } from '@/renderer/components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/renderer/components/ui/table';
import { OrderWithDetails } from '@/types/order';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function SalesDashboard() {
    const [orders, setOrders] = useState<OrderWithDetails[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<OrderWithDetails>();

    useEffect(() => {
        (async () => {
            const ordersData = await getOrdersWithDetails();
            setSelectedOrder(ordersData[0]);
            setOrders(ordersData);
        })();
    }, []);

    function handleOrderSelect(order: OrderWithDetails) {
        setSelectedOrder(order);
    }

    return (
        <main className={'container my-6 w-full space-y-8'}>
            <DataPageHeader pageTitle="Dashboard" />
            <div className="flex w-full gap-8">
                <div className="space-y-8">
                    <Card className="max-w-sm">
                        <CardHeader className="space-y-4">
                            <CardTitle className="font-bold">
                                Sales Panel
                            </CardTitle>
                            <CardDescription>
                                You can also create new orders from Order Page
                                and also from the products page
                            </CardDescription>
                            <Button className="w-fit" asChild>
                                <Link to="/sales/orders/new">
                                    Create New Order
                                </Link>
                            </Button>
                        </CardHeader>
                    </Card>
                    <RecentOrders
                        orders={orders}
                        selectedOrder={selectedOrder}
                        handleOrderSelect={handleOrderSelect}
                    />
                </div>
                {selectedOrder && (
                    <Card className="h-fit w-full max-w-md overflow-hidden">
                        <CardHeader className="flex items-start bg-muted/50">
                            <CardTitle className="text-lg">
                                Order #{selectedOrder.id}
                            </CardTitle>
                            <CardDescription>
                                Date:{' '}
                                {new Date(
                                    selectedOrder.createdAt,
                                ).toDateString()}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 text-sm">
                            <div className="grid gap-3">
                                <div className="font-semibold">
                                    Order Details
                                </div>
                                <ul className="grid gap-3">
                                    {selectedOrder.orderItems.map((item) => (
                                        <li
                                            key={item.id}
                                            className="flex items-center justify-between"
                                        >
                                            <span className="text-muted-foreground">
                                                <span>
                                                    {item.quantity *
                                                        item.price.quantity}
                                                    {item.price.unit}
                                                </span>{' '}
                                                {item.product.name}
                                            </span>
                                            <span>
                                                ₹
                                                {Math.round(
                                                    item.quantity *
                                                        calculateTaxAmount(
                                                            item.price.amount,
                                                            item.price.taxValue,
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
                                            Tax
                                        </span>
                                        <span>
                                            {calculateTotalTax(
                                                selectedOrder.orderItems,
                                            )}
                                            %
                                        </span>
                                    </li>
                                    <li className="flex items-center justify-between font-semibold">
                                        <span className="text-muted-foreground">
                                            Total
                                        </span>
                                        <span>₹{selectedOrder.totalPrice}</span>
                                    </li>
                                </ul>
                            </div>
                            <Separator className="my-4" />
                            <div className="grid gap-3">
                                <div className="font-semibold">
                                    Customer Information
                                </div>
                                <dl className="grid gap-3">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">
                                            Customer
                                        </dt>
                                        <dd>
                                            {selectedOrder.customer?.name ||
                                                'Unknown'}
                                        </dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">
                                            Email
                                        </dt>
                                        <dd>
                                            <a href="#">
                                                {selectedOrder.customer
                                                    ?.email || 'Unknown'}
                                            </a>
                                        </dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">
                                            Phone
                                        </dt>
                                        <dd>
                                            <a href="#">
                                                {selectedOrder.customer
                                                    ?.phone || 'Unknown'}
                                            </a>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                            <Separator className="my-4" />
                            <div className="grid gap-3">
                                <div className="font-semibold">
                                    Payment Information
                                </div>
                                <dl className="grid gap-3">
                                    <div className="flex items-center justify-between">
                                        <dt className="flex items-center gap-1 text-muted-foreground">
                                            Payment Method
                                        </dt>
                                        <dd>
                                            {selectedOrder.paymentMethod ||
                                                'UNPAID'}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-row items-center justify-between border-t bg-muted/50 px-6 py-3">
                            <div className="flex gap-2 text-xs text-muted-foreground">
                                <p>Updated</p>
                                <time dateTime="2023-11-23">
                                    {new Date(
                                        selectedOrder.updatedAt,
                                    ).toDateString()}
                                </time>
                            </div>
                        </CardFooter>
                    </Card>
                )}
            </div>
        </main>
    );
}

interface RecentOrderProps {
    orders: OrderWithDetails[];
    selectedOrder: OrderWithDetails;
    handleOrderSelect: (order: OrderWithDetails) => void;
}

function RecentOrders({
    orders,
    handleOrderSelect,
    selectedOrder,
}: RecentOrderProps) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Orders</CardTitle>
                <CardDescription>Recent orders from the store</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">
                                Customer
                            </TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Purchased Date</TableHead>
                            <TableHead>Paid Date</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <TableRow
                                    key={order.id}
                                    onClick={() => handleOrderSelect(order)}
                                    className={cn(
                                        selectedOrder.id === order.id &&
                                            'bg-muted/50',
                                        'cursor-pointer',
                                    )}
                                >
                                    <TableCell className="font-medium">
                                        {order.customer?.name || 'Unknown'}
                                    </TableCell>
                                    <TableCell>Sale</TableCell>
                                    <TableCell>
                                        <PaidBadge isPaid={order.isPaid} />
                                    </TableCell>
                                    <TableCell>
                                        {new Date(
                                            order.createdAt,
                                        ).toDateString()}
                                    </TableCell>
                                    <TableCell>
                                        {order.paidAt
                                            ? new Date(
                                                  order.paidAt,
                                              ).toDateString()
                                            : 'NULL'}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        ₹{order.totalPrice}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
