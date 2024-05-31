import { getCustomers, getOrdersWithDetails } from '@/renderer/api/orders';
import { getProducts } from '@/renderer/api/products';
import { DataPageHeader } from '@/renderer/components/data-table/data-page-header';
import { RecentOrders } from '@/renderer/components/order/recent-order';
import { SelectedOrder } from '@/renderer/components/order/selected-order';
import { Button } from '@/renderer/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/renderer/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/renderer/components/ui/dropdown-menu';
import { OrderWithDetails } from '@/types/order';
import {
    convertToPurchasedUnit,
    formatCurrency,
    formatDate,
    formatNumber,
} from '@/utils/formatters';
import { getRangeOption, RANGE_OPTIONS } from '@/utils/rangeOptions';
import {
    differenceInDays,
    differenceInMonths,
    differenceInWeeks,
    eachDayOfInterval,
    eachMonthOfInterval,
    eachWeekOfInterval,
    eachYearOfInterval,
    endOfWeek,
    interval,
    max,
    min,
    startOfDay,
    startOfWeek,
} from 'date-fns';
import {
    BadgeIndianRupee,
    Boxes,
    OctagonAlert,
    UsersRound,
} from 'lucide-react';
import { ComponentType, ReactNode, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import CustomersByDate from './components/charts/customers-by-date';
import OrderByDateChart from './components/charts/order-by-date';

async function getSalesData(
    createdAfter: Date | null,
    createdBefore: Date | null,
) {
    const orders = await getOrdersWithDetails();
    const thisMonthOrders = orders.filter(
        (order) =>
            new Date(order.createdAt).getMonth() === new Date().getMonth(),
    );
    const paidOrders = thisMonthOrders.filter((order) => order.isPaid);

    const amount = paidOrders.reduce((acc, order) => {
        const amount = order.totalPrice;
        return acc + amount;
    }, 0);

    let chartData = orders;
    if (createdAfter) {
        chartData = orders.filter(
            (order) => new Date(order.createdAt) >= createdAfter,
        );
    } else if (createdBefore) {
        chartData = orders.filter(
            (order) => new Date(order.createdAt) <= createdBefore,
        );
    }

    const startDate = createdAfter || startOfDay(chartData[0]?.createdAt);
    const endDate = createdBefore || new Date();

    const { array, format } = getChartDateArray(startDate, endDate);

    const dayArray = array.map((date) => {
        return {
            date: format(date),
            totalSales: 0,
        };
    });

    return {
        orders,
        numberOfSales: orders.length,
        amount,
        chartData: chartData.reduce((data, order) => {
            const formattedDate = format(new Date(order.createdAt));
            const entry = dayArray.find((day) => day.date === formattedDate);
            if (!entry) return data;
            entry.totalSales += order.totalPrice;
            return data;
        }, dayArray),
    };
}

async function getCustomersData(
    createdAfter: Date | null,
    createdBefore: Date | null,
    amount: number,
) {
    const customers = await getCustomers();

    let chartData = customers;
    if (createdAfter) {
        chartData = customers.filter(
            (customer) => new Date(customer.createdAt) >= createdAfter,
        );
    } else if (createdBefore) {
        chartData = customers.filter(
            (customer) => new Date(customer.createdAt) <= createdBefore,
        );
    }

    const startDate = createdAfter || startOfDay(chartData[0].createdAt);
    const endDate = createdBefore || new Date();

    const { array, format } = getChartDateArray(startDate, endDate);

    const dayArray = array.map((date) => {
        return {
            date: format(date),
            totalCustomers: 0,
        };
    });

    return {
        averageValuePerCustomer:
            customers.length === 0 ? 0 : amount / customers.length,
        numberOfCustomers: customers.length,
        chartData: chartData.reduce((data, customer) => {
            const formattedDate = format(new Date(customer.createdAt));
            const entry = dayArray.find((day) => {
                return day.date === formattedDate;
            });
            if (!entry) return data;
            entry.totalCustomers += 1;
            return data;
        }, dayArray),
    };
}

async function getProductsData() {
    const products = await getProducts();
    const activeProducts = products.filter(
        (product) => product.isActive,
    ).length;
    const inActiveProducts = products.filter(
        (product) => !product.isActive,
    ).length;
    const outOfStock = products.filter(
        (product) =>
            convertToPurchasedUnit(product.stock, product.baseUnitValue) === 0,
    ).length;
    const needPurchase = products.filter(
        (product) =>
            convertToPurchasedUnit(product.stock, product.baseUnitValue) <=
            product.reorderPoint,
    ).length;

    return {
        outOfStock,
        needPurchase,
        activeProducts,
        inActiveProducts,
    };
}

export default function AdminDashboard() {
    const [sales, setSales] =
        useState<Awaited<ReturnType<typeof getSalesData>>>();
    const [customers, setCustomers] =
        useState<Awaited<ReturnType<typeof getCustomersData>>>();
    const [products, setProducts] =
        useState<Awaited<ReturnType<typeof getProductsData>>>();
    const [selectedOrder, setSelectedOrder] = useState<OrderWithDetails>();

    const [searchParams, _] = useSearchParams();

    const totalSalesRangeOption =
        getRangeOption(searchParams.get('totalSalesRange')) ||
        RANGE_OPTIONS.last_7_days;
    const newCustomersRangeOption =
        getRangeOption(searchParams.get('newCustomersRange')) ||
        RANGE_OPTIONS.last_7_days;

    useEffect(() => {
        (async () => {
            const salesData = await getSalesData(
                totalSalesRangeOption.startDate,
                totalSalesRangeOption.endDate,
            );
            const customersData = await getCustomersData(
                newCustomersRangeOption.startDate,
                newCustomersRangeOption.endDate,
                salesData.amount,
            );

            const productsData = await getProductsData();

            setSelectedOrder(salesData.orders[0]);
            setProducts(productsData);
            setCustomers(customersData);
            setSales(salesData);
        })();
    }, [searchParams]);

    function handleOrderSelect(order: OrderWithDetails) {
        setSelectedOrder(order);
    }

    if (!sales || !products) return <p>Loading</p>;

    return (
        <main className="container my-6 w-full space-y-8">
            <DataPageHeader pageTitle="Dashboard" />
            <div className="flex flex-wrap gap-4">
                <DashboardCard
                    title="This Month Sales"
                    subtitle={`${formatNumber(sales?.numberOfSales)} Orders`}
                    body={formatCurrency(sales?.amount)}
                    Icon={BadgeIndianRupee}
                />
                <DashboardCard
                    title="Active Products"
                    subtitle={`${formatNumber(products?.inActiveProducts)} Inactive`}
                    body={formatNumber(products?.activeProducts)}
                    Icon={Boxes}
                />
                <DashboardCard
                    title="Customers"
                    subtitle={`${formatNumber(Math.round(customers?.averageValuePerCustomer))} Average Value`}
                    body={formatNumber(customers?.numberOfCustomers)}
                    Icon={UsersRound}
                />
                <DashboardCard
                    title="Out of Stock"
                    subtitle={`${formatNumber(products.needPurchase)} Low stocks`}
                    body={formatNumber(products.outOfStock)}
                    Icon={OctagonAlert}
                />
            </div>
            <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
                {sales && (
                    <ChartCard
                        title="Total Sales"
                        queryKey="totalSalesRange"
                        selectedRangeLabel={totalSalesRangeOption.label}
                    >
                        <OrderByDateChart data={sales.chartData} />
                    </ChartCard>
                )}
                {customers && (
                    <ChartCard
                        title="New Customers"
                        queryKey="newCustomersRange"
                        selectedRangeLabel={newCustomersRangeOption.label}
                    >
                        <CustomersByDate data={customers.chartData} />
                    </ChartCard>
                )}
            </div>
            {sales && selectedOrder && (
                <div className="flex gap-8">
                    <RecentOrders
                        orders={sales.orders}
                        selectedOrder={selectedOrder}
                        handleOrderSelect={handleOrderSelect}
                    />
                    <SelectedOrder selectedOrder={selectedOrder} />
                </div>
            )}
        </main>
    );
}

interface DashboardCardProps {
    title: string;
    subtitle: string;
    body: string;
    Icon: ComponentType<{ className?: string }>;
}

function DashboardCard({ title, subtitle, body, Icon }: DashboardCardProps) {
    return (
        <Card className="w-full max-w-xs">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="mr-2 h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex items-end justify-between">
                <div className="text-2xl font-bold">{body}</div>
                <p className="text-xs text-muted-foreground">{subtitle}</p>
            </CardContent>
        </Card>
    );
}

interface ChartCardProps {
    title: string;
    children: ReactNode;
    queryKey: string;
    selectedRangeLabel: string;
}

function ChartCard({
    children,
    title,
    queryKey,
    selectedRangeLabel,
}: ChartCardProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    function setRange(range: keyof typeof RANGE_OPTIONS) {
        const params = new URLSearchParams(searchParams);
        params.set(queryKey, range);
        setSearchParams({ [queryKey]: range });
        navigate(`${location.pathname}?${params.toString()}`, {
            preventScrollReset: true,
        });
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>{title}</CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                {selectedRangeLabel}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {Object.entries(RANGE_OPTIONS).map(
                                ([key, value]) => (
                                    <DropdownMenuItem
                                        key={key}
                                        onClick={() =>
                                            setRange(
                                                key as keyof typeof RANGE_OPTIONS,
                                            )
                                        }
                                    >
                                        {value.label}
                                    </DropdownMenuItem>
                                ),
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="pl-2">{children}</CardContent>
        </Card>
    );
}

function getChartDateArray(startDate: Date, endDate: Date = new Date()) {
    const days = differenceInDays(endDate, startDate);
    if (days < 30) {
        return {
            array: eachDayOfInterval(interval(startDate, endDate)),
            format: formatDate,
        };
    }

    const weeks = differenceInWeeks(endDate, startDate);
    if (weeks < 30) {
        return {
            array: eachWeekOfInterval(interval(startDate, endDate)),
            format: (date: Date) => {
                const start = max([startOfWeek(date), startDate]);
                const end = min([endOfWeek(date), endDate]);

                return `${formatDate(start)} - ${formatDate(end)}`;
            },
        };
    }

    const months = differenceInMonths(endDate, startDate);
    if (months < 30) {
        return {
            array: eachMonthOfInterval(interval(startDate, endDate)),
            format: new Intl.DateTimeFormat('en', {
                month: 'long',
                year: 'numeric',
            }).format,
        };
    }

    return {
        array: eachYearOfInterval(interval(startDate, endDate)),
        format: new Intl.DateTimeFormat('en', { year: 'numeric' }).format,
    };
}
