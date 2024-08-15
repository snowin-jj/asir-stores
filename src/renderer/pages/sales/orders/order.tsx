import {
    calculateActualAmount,
    calculateOrderItemsSubTotal,
    calculateOrderItemsTaxAmount,
} from '@/lib/utils';
import { getOrder, updateOrder } from '@/renderer/api/orders';
import BackButton from '@/renderer/components/back-button';
import Bill from '@/renderer/components/bill';
import { OrderItemsTable } from '@/renderer/components/order/order-items-table';
import { Badge } from '@/renderer/components/ui/badge';
import { Button } from '@/renderer/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/renderer/components/ui/card';
import { Input } from '@/renderer/components/ui/input';
import { Label } from '@/renderer/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/renderer/components/ui/select';
import { Separator } from '@/renderer/components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/renderer/components/ui/table';
import { PAYMENT_METHODS } from '@/renderer/data/ui';
import { OrderWithDetails, PaymentMethod } from '@/types/order';
import { formatCurrency, formatDateTime } from '@/utils/formatters';
import { LoaderCircle } from 'lucide-react';
import { EventHandler, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

export default function OrderPage() {
    const { id } = useParams();
    const [order, setOrder] = useState<OrderWithDetails>();

    useEffect(() => {
        (async () => {
            const data = await getOrder(Number(id));
            setOrder(data);
        })();
    }, []);

    if (!order) return <p>loading....</p>;

    return (
        <main className="container mx-auto my-6 w-full">
            <header>
                <BackButton />
            </header>
            <div className="flex justify-between gap-8">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Customer Details</h2>
                        {order.customer && (
                            <div className="flex justify-between gap-8">
                                <div className="space-y-2">
                                    <div>
                                        <label
                                            htmlFor="customerName"
                                            className="font-bold"
                                        >
                                            Name
                                        </label>
                                        <p>
                                            {order.customer.name || 'Unknown'}
                                        </p>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="customerName"
                                            className="font-bold"
                                        >
                                            Email
                                        </label>
                                        <p>
                                            {order.customer.email || 'Unknown'}
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div>
                                        <label
                                            htmlFor="customerName"
                                            className="font-bold"
                                        >
                                            Phone Number
                                        </label>
                                        <p>
                                            {order.customer.phone || 'Unknown'}
                                        </p>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="customerName"
                                            className="font-bold"
                                        >
                                            Aadhaar Number
                                        </label>
                                        <p>
                                            {order.customer.aadhaar ||
                                                'Unknown'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold">Order Details</h3>
                        <div className="flex flex-wrap gap-8">
                            <div>
                                <h5>Total Amount</h5>
                                <p>{formatCurrency(order.totalPrice)}</p>
                            </div>
                            <div>
                                <h5>Paid Amount</h5>
                                <p>{formatCurrency(order.paidAmount)}</p>
                            </div>
                            <div>
                                <h5>Balance Amount</h5>
                                <p>{formatCurrency(order.balanceAmount)}</p>
                            </div>
                            <div>
                                <h5>Discount Amount</h5>
                                <p>{formatCurrency(order.discount)}</p>
                            </div>
                            {order.isPaid ? (
                                <div>
                                    <h5>Paid At</h5>
                                    <p>{formatDateTime(order.paidAt)}</p>
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold">Ordered Items</h3>
                        <OrderItemsTable
                            orderItems={order.orderItems}
                            discount={order.discount}
                        />
                    </div>
                </div>

                <OrderSummary order={order} />
            </div>
        </main>
    );
}

interface OrderSummaryProps {
    order: OrderWithDetails;
}

function OrderSummary({ order }: OrderSummaryProps) {
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CASH');
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);

    function handlePaymentSelect(e: PaymentMethod) {
        setPaymentMethod(e);
    }

    function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
        setAmount(e.currentTarget.valueAsNumber);
    }

    async function handlePaid() {
        if (!amount || amount === 0) {
            toast.error('Please enter amount correctly');
            return;
        }
        try {
            setLoading(true);
            const paidAmount = order.paidAmount + amount;
            const balanceAmount = order.balanceAmount - amount;
            const isPaid = balanceAmount === 0 ? true : false;
            const res = await updateOrder(order.id, {
                isPaid,
                paidAt: isPaid ? new Date() : null,
                paymentMethod,
                totalPrice: order.totalPrice,
                paidAmount,
                balanceAmount,
            });
            order.balanceAmount = balanceAmount;
            order.paidAmount = paidAmount;
            order.isPaid = isPaid;
            toast.success(res);
        } catch (error) {
            const e = error as Error;
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Including GST</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 px-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Product</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Tax Rate</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {order.orderItems.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">
                                    {item.product.name}
                                </TableCell>
                                <TableCell>
                                    {item.quantity * item.price.quantity}{' '}
                                    {item.price.unit}
                                </TableCell>
                                <TableCell>{item.price.taxValue}%</TableCell>
                                <TableCell className="text-right">
                                    {formatCurrency(
                                        item.quantity *
                                            Number(
                                                calculateActualAmount(
                                                    item.price.amount,
                                                    item.price.taxValue,
                                                ),
                                            ),
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="w-full flex-col space-y-2">
                <Separator className="mb-2" />
                <div className="flex w-full justify-between">
                    <p>Sub Total</p>
                    <p>
                        {formatCurrency(
                            Number(
                                calculateOrderItemsSubTotal(order.orderItems),
                            ),
                        )}
                    </p>
                </div>
                <div className="flex w-full justify-between">
                    <p>Tax Amount</p>
                    <p>
                        {formatCurrency(
                            Number(
                                calculateOrderItemsTaxAmount(order.orderItems),
                            ),
                        )}
                    </p>
                </div>
                <div className="flex w-full justify-between">
                    <p>Discount Amount</p>
                    <p>{formatCurrency(order.discount)}</p>
                </div>
                <div className="flex w-full justify-between">
                    <p>Total Amount</p>
                    <p>{formatCurrency(order.paidAmount)}</p>
                </div>
                <Separator />
                <div className="flex w-full justify-between">
                    <p>Payment</p>
                    <p>{order.paymentMethod || 'Unknown'}</p>
                </div>
                <div className="flex w-full justify-between">
                    <p>Paid</p>
                    <Badge variant={order.isPaid ? 'default' : 'warning'}>
                        {order.isPaid ? 'Paid' : 'Not paid'}
                    </Badge>
                </div>
                {!order.isPaid && (
                    <div className="w-full space-y-4">
                        <div className="w-full space-y-2">
                            <Label>Payment Method</Label>
                            <Select
                                onValueChange={handlePaymentSelect}
                                defaultValue={paymentMethod}
                            >
                                <SelectTrigger className="min-w-[180px]">
                                    <SelectValue placeholder="Select a Payment Method" />
                                </SelectTrigger>
                                <SelectContent>
                                    {PAYMENT_METHODS.map((method, idx) => (
                                        <SelectItem
                                            key={idx}
                                            value={method.VALUE}
                                        >
                                            {method.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-full space-y-2">
                            <Label>Amount</Label>
                            <Input
                                type="number"
                                onChange={handleAmountChange}
                                placeholder="Enter the amount"
                            />
                        </div>
                        <Button
                            disabled={loading}
                            onClick={handlePaid}
                            variant="secondary"
                            className="w-full"
                        >
                            {loading ? (
                                <>
                                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                'Paid'
                            )}
                        </Button>
                    </div>
                )}
                <Bill order={order} />
            </CardFooter>
        </Card>
    );
}
