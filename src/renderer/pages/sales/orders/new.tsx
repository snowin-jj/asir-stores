import { createOrder, getCustomers } from '@/renderer/api/orders';
import { getPrice, getProductsWithDetails } from '@/renderer/api/products';
import { DataPageHeader } from '@/renderer/components/data-table/data-page-header';
import { OrderItemsTable } from '@/renderer/components/order/order-items-table';
import SearchSelector from '@/renderer/components/search-selector';
import { Button } from '@/renderer/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/renderer/components/ui/card';
import { Input } from '@/renderer/components/ui/input';
import { Label } from '@/renderer/components/ui/label';
import {
    RadioGroup,
    RadioGroupItem,
} from '@/renderer/components/ui/radio-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/renderer/components/ui/select';
import { PAYMENT_METHODS } from '@/renderer/data/ui';
import {
    Customer,
    OrderItemPayload,
    OrderItemWithDetails,
    PaymentMethod,
} from '@/types/order';
import { Price, ProductWithCategory } from '@/types/product';
import { convertToPurchasedUnit } from '@/utils/formatters';
import { calculateTotalPrice } from '@/utils/order';
import { LoaderCircle } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

export default function NewOrderPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const [loading, setLoading] = useState(false);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [paidAmount, setPaidAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
        null,
    );
    const [customer, setCustomer] = useState<Customer>();
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [orderItems, setOrderItems] = useState<OrderItemWithDetails[]>(
        location.state?.orderItems || [],
    );

    useEffect(() => {
        (async () => {
            const data = await getCustomers();
            setCustomers(data);
        })();
    }, []);

    useEffect(() => {
        setTotalAmount(calculateTotalPrice(orderItems));
    }, [orderItems]);

    function handleAddItem(item: OrderItemWithDetails) {
        setOrderItems((prev) => [...prev, item]);
    }

    function handleCustomerCreate() {
        navigate('/sales/customers/new', {
            state: { orderItems, callbackUrl: '/sales/orders/new' },
        });
    }

    function handlePaymentSelect(value: PaymentMethod) {
        setPaymentMethod(value);
    }

    function handleCustomerSelect(customerId: number) {
        const selectedCustomer = customers.find((c) => c.id === customerId);
        if (!customerId) return toast.error('Customer Not Found');
        setCustomer(selectedCustomer);
    }

    function handleAmountPaid(e: ChangeEvent<HTMLInputElement>) {
        setPaidAmount(
            isNaN(e.currentTarget.valueAsNumber)
                ? 0
                : e.currentTarget.valueAsNumber,
        );
    }

    function handleDiscountAmount(e: ChangeEvent<HTMLInputElement>) {
        setDiscountAmount(
            isNaN(e.currentTarget.valueAsNumber)
                ? 0
                : e.currentTarget.valueAsNumber,
        );
    }

    function handleRemoveItem(idx: number) {
        setOrderItems(orderItems.filter((item, i) => i !== idx));
    }

    async function handlePlaceOrder() {
        if (!orderItems || orderItems.length <= 0) {
            toast.error('No Items Added');
            return;
        }

        try {
            setLoading(true);
            const balanceAmount = totalAmount - discountAmount - paidAmount;
            const isPaid = balanceAmount === 0 ? true : false;
            if (!isPaid && !customer) {
                throw new Error('Customer is required');
            }
            const res = await createOrder({
                orderItems,
                paymentMethod:
                    isPaid && !paymentMethod ? 'CASH' : paymentMethod,
                customerId: customer?.id,
                isPaid,
                discount: discountAmount,
                paidAt: isPaid && new Date(),
                paidAmount: paidAmount,
                balanceAmount: balanceAmount,
            });
            toast.success(res);
            navigate('/sales/orders');
        } catch (error) {
            const e = error as Error;
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="flex w-full flex-col gap-14 px-8 py-4">
            <DataPageHeader
                pageTitle="New Order"
                buttons={[{ label: 'Cancel', variant: 'secondary' }]}
                isBackBtn={true}
            />
            <OrderItemsForm
                loading={loading}
                product={location.state?.product}
                handleAddItem={handleAddItem}
            />
            <div className="flex w-full gap-20">
                <OrderItemsTable
                    orderItems={orderItems}
                    discount={discountAmount}
                    handleRemoveItem={handleRemoveItem}
                    isOrdering
                />
                <OrderDetails
                    paymentMethod={paymentMethod}
                    handlePaymentSelect={handlePaymentSelect}
                    customer={customer}
                    customers={customers}
                    handleDiscountAmount={handleDiscountAmount}
                    handleAmountPaid={handleAmountPaid}
                    handlePlaceOrder={handlePlaceOrder}
                    handleCustomerSelect={handleCustomerSelect}
                    handleCustomerCreate={handleCustomerCreate}
                    loading={loading}
                />
            </div>
        </main>
    );
}

interface OrderItemsFormProps {
    loading: boolean;
    product: ProductWithCategory;
    handleAddItem: (item: OrderItemPayload) => void;
}

function OrderItemsForm({
    handleAddItem,
    product,
    loading,
}: OrderItemsFormProps) {
    const [selectedProduct, setSelectedProduct] =
        useState<ProductWithCategory | null>(product || null);
    const [selectedPrice, setSelectedPrice] = useState<Price | null>(null);
    const [products, setProducts] = useState<ProductWithCategory[]>([]);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        (async () => {
            const data = await getProductsWithDetails();
            setProducts(data.filter((product) => product.isActive));
        })();
    }, []);

    function handlerProductSelect(productId: number) {
        const product = products.find((product) => product.id === productId);
        if (product) {
            setSelectedProduct(product);
        }
    }

    async function handlePriceSelection(priceId: string) {
        const price = await getPrice(Number(priceId));
        setSelectedPrice(price);
    }

    function handleAdd() {
        if (!selectedPrice || !selectedProduct)
            return toast.error(
                'Please check the fields are entered correctly.',
            );
        handleAddItem({
            priceId: selectedPrice.id,
            productId: selectedProduct.id,
            quantity,
            price: selectedPrice,
            product: selectedProduct,
        });
        setQuantity(1);
        setSelectedProduct(null);
        setSelectedPrice(null);
    }

    return (
        <div className="flex w-full gap-20">
            <div className="w-full max-w-md space-y-4">
                <div className="flex w-full flex-col">
                    <Label>Product</Label>
                    <SearchSelector
                        items={products}
                        label="Product"
                        onSelect={handlerProductSelect}
                        placehoder="Select a product"
                        value={selectedProduct?.id}
                    />
                </div>
                <div>
                    <Label>Quantity</Label>
                    <Input
                        type="number"
                        placeholder="Enter the Quanity"
                        value={quantity}
                        onChange={(e) =>
                            setQuantity(e.currentTarget.valueAsNumber)
                        }
                    />
                </div>
                <div>
                    <Label>Current Stock</Label>
                    <Input
                        disabled
                        type="text"
                        placeholder="Stock Level"
                        value={
                            selectedProduct && selectedPrice
                                ? selectedPrice.unit ==
                                  selectedProduct.purchasedUnit
                                    ? `${convertToPurchasedUnit(
                                          selectedProduct.stock,
                                          selectedProduct.baseUnitValue,
                                      )} ${selectedProduct.purchasedUnit}`
                                    : `${selectedProduct.stock} ${selectedProduct.baseUnit}`
                                : ''
                        }
                    />
                </div>
                <Button disabled={loading} onClick={handleAdd}>
                    Add
                </Button>
            </div>
            {selectedProduct && (
                <div className="space-y-3">
                    <Label>Prices</Label>
                    <RadioGroup
                        className="flex flex-col space-y-1"
                        onValueChange={handlePriceSelection}
                    >
                        {selectedProduct.sellingPrices.map((price) => (
                            <div
                                key={price.id}
                                className="flex items-center space-x-3 space-y-0"
                            >
                                <RadioGroupItem
                                    value={String(price.id)}
                                    id={String(price.id)}
                                />
                                <Label className="w-full font-normal">
                                    <Card className="flex w-full items-center">
                                        <CardHeader>
                                            <CardTitle>
                                                <p>{price.quantity}</p>
                                            </CardTitle>
                                            <CardDescription>
                                                {price.unit}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            <div className="flex gap-2">
                                                <p>Amount: </p>₹{price.amount}
                                            </div>
                                            <div className="flex gap-2">
                                                <p>Tax Rate: </p>
                                                <p>{price.taxValue}%</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
            )}
        </div>
    );
}

interface OrderDetailsProps {
    handleCustomerCreate: () => void;
    paymentMethod: PaymentMethod;
    handlePaymentSelect: (values: string) => void;
    customer: Customer;
    customers: Customer[];
    handleDiscountAmount: (e: ChangeEvent<HTMLInputElement>) => void;
    handleAmountPaid: (e: ChangeEvent<HTMLInputElement>) => void;
    handleCustomerSelect: (customerId: number) => void;
    handlePlaceOrder: () => Promise<void>;
    loading: boolean;
}
function OrderDetails({
    customer,
    customers,
    paymentMethod,
    loading,
    handlePaymentSelect,
    handlePlaceOrder,
    handleCustomerCreate,
    handleDiscountAmount,
    handleAmountPaid,
    handleCustomerSelect,
}: OrderDetailsProps) {
    return (
        <div className="w-full max-w-xl space-y-4">
            <div className="w-full space-y-2">
                <Label>Payment Method</Label>
                <Select
                    onValueChange={handlePaymentSelect}
                    defaultValue={paymentMethod || 'CASH'}
                >
                    <SelectTrigger className="min-w-[180px]">
                        <SelectValue placeholder="Select a Payment Method" />
                    </SelectTrigger>
                    <SelectContent>
                        {PAYMENT_METHODS.map((method, idx) => (
                            <SelectItem key={idx} value={method.VALUE}>
                                {method.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="w-full space-y-2">
                <Label>Customer</Label>
                <SearchSelector
                    items={customers}
                    label="Customers"
                    placehoder="Select a customer"
                    onSelect={handleCustomerSelect}
                    value={customer?.id}
                    onCreate={handleCustomerCreate}
                />
            </div>
            <div className="w-full space-y-2">
                <Label>Discount Amount</Label>
                <Input
                    type="number"
                    onChange={handleDiscountAmount}
                    placeholder="Enter the discount amount"
                />
            </div>
            <div className="w-full space-y-2">
                <Label>Amount</Label>
                <Input
                    type="number"
                    onChange={handleAmountPaid}
                    placeholder="Enter the amount"
                />
            </div>
            <Button disabled={loading} onClick={handlePlaceOrder}>
                {loading ? (
                    <>
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                        Creating Order...
                    </>
                ) : (
                    'Place Order'
                )}
            </Button>
        </div>
    );
}
