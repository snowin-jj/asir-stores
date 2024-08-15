import { getOrdersWithDetails } from '@/renderer/api/orders';
import { DataPageHeader } from '@/renderer/components/data-table/data-page-header';
import LoadingScreen from '@/renderer/components/LoadingScreen';
import { RecentOrders } from '@/renderer/components/order/recent-order';
import { SelectedOrder } from '@/renderer/components/order/selected-order';
import { Button } from '@/renderer/components/ui/button';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/renderer/components/ui/card';
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
                <div className="w-full space-y-8">
                    <Card className="max-w-sm">
                        <CardHeader className="space-y-4">
                            <CardTitle className="font-bold">
                                Sales Panel
                            </CardTitle>
                            <CardDescription>
                                New orders can be created from the Order Page
                                and from the Products Page.
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
                    <SelectedOrder selectedOrder={selectedOrder} />
                )}
            </div>
        </main>
    );
}
