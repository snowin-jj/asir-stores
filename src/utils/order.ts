export function formatOrdersWithDetails(orders: any[]) {
    return orders.reduce((result: any, order) => {
        const existingOrder = result.find((o: any) => o.id === order.id);

        if (existingOrder) {
            existingOrder.orderItems.push({
                id: order.orderItemId,
                quantity: order.quantity,
                priceId: order.priceId,
                productId: order.productId,
                price: {
                    id: order.priceId,
                    amount: order.amount,
                    unit: order.unit,
                    quantity: order.priceQuantity,
                    productId: order.productId,
                    taxValue: order.taxValue,
                },
                product: {
                    id: order.productId,
                    name: order.name,
                    description: order.description,
                    purchasedPrice: order.purchasedPrice,
                    purchasedUnit: order.purchasedUnit,
                    baseUnit: order.baseUnit,
                    baseUnitValue: order.baseUnitValue,
                    stock: order.stock,
                    reorderPoint: order.reorderPoint,
                    isActive: order.isActive,
                    createdAt: order.productCreatedAt,
                    updatedAt: order.productUpdatedAt,
                },
            });
        } else {
            result.push({
                id: order.id,
                customerId: order.customerId,
                paymentMethod: order.paymentMethod,
                isPaid: order.isPaid,
                paidAt: order.paidAt,
                totalPrice: order.totalPrice,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt,
                customer: {
                    name: order.customerName,
                    phone: order.phone,
                    email: order.email,
                    aadhaar: order.aadhaar,
                    points: order.points,
                    createdAt: order.customerCreatedAt,
                    updatedAt: order.customerUpdatedAt,
                },
                orderItems: [
                    {
                        id: order.orderItemId,
                        quantity: order.quantity,
                        priceId: order.priceId,
                        productId: order.productId,
                        price: {
                            id: order.priceId,
                            amount: order.amount,
                            unit: order.unit,
                            quantity: order.priceQuantity,
                            productId: order.productId,
                            taxValue: order.taxValue,
                        },
                        product: {
                            id: order.productId,
                            name: order.name,
                            description: order.description,
                            purchasedPrice: order.purchasedPrice,
                            purchasedUnit: order.purchasedUnit,
                            baseUnit: order.baseUnit,
                            baseUnitValue: order.baseUnitValue,
                            stock: order.stock,
                            reorderPoint: order.reorderPoint,
                            isActive: order.isActive,
                            createdAt: order.productCreatedAt,
                            updatedAt: order.productUpdatedAt,
                        },
                    },
                ],
            });
        }

        return result;
    }, []);
}

export function formatOrdersWithCustomer(orders: any[]) {
    return orders.reduce((result: any, order) => {
        const existingOrder = result.find((o: any) => o.id === order.id);

        if (existingOrder) {
            existingOrder.customer = {
                name: order.customerName,
                phone: order.phone,
                email: order.email,
                aadhaar: order.aadhaar,
                points: order.points,
                createdAt: order.customerCreatedAt,
                updatedAt: order.customerUpdatedAt,
            };
        } else {
            result.push({
                id: order.id,
                customerId: order.customerId,
                paymentMethod: order.paymentMethod,
                isPaid: order.isPaid,
                paidAt: order.paidAt,
                totalPrice: order.totalPrice,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt,
                customer: {
                    name: order.customerName,
                    phone: order.phone,
                    email: order.email,
                    aadhaar: order.aadhaar,
                    points: order.points,
                    createdAt: order.customerCreatedAt,
                    updatedAt: order.customerUpdatedAt,
                },
            });
        }
        return result;
    }, []);
}

export function formatOrderItems(orderItems: any[]) {
    return orderItems.map((orderItem) => {
        return {
            id: orderItem.id,
            quantity: orderItem.quantity,
            priceId: orderItem.priceId,
            productId: orderItem.productId,
            price: {
                id: orderItem.priceId,
                amount: orderItem.amount,
                unit: orderItem.unit,
                quantity: orderItem.priceQuantity,
                productId: orderItem.productId,
                taxValue: orderItem.taxValue,
            },
            product: {
                id: orderItem.productId,
                name: orderItem.name,
                description: orderItem.description,
                purchasedPrice: orderItem.purchasedPrice,
                purchasedUnit: orderItem.purchasedUnit,
                baseUnit: orderItem.baseUnit,
                baseUnitValue: orderItem.baseUnitValue,
                stock: orderItem.stock,
                reorderPoint: orderItem.reorderPoint,
                isActive: orderItem.isActive,
                createdAt: orderItem.productCreatedAt,
                updatedAt: orderItem.productUpdatedAt,
            },
        };
    });
}
