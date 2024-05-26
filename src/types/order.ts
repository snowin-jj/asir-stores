import { Price, Product } from './product';

export interface Order {
    id: number;
    customerId?: number;
    paymentMethod: 'CASH' | 'UPI' | 'CARD' | 'NET_BANKING';
    isPaid?: boolean;
    paidAt?: Date;
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface OrderItem {
    id: number;
    quantity: number;
    priceId: number;
    orderId: number;
    productId: number;
}

export interface OrderItemWithDetails {
    id: number;
    quantity: number;
    priceId: number;
    price: Price;
    orderId: number;
    productId: number;
    product: Product;
}

export interface OrderItemPayload extends Omit<OrderItem, 'id'> {}

export interface OrderPayload
    extends Omit<Order, 'id' | 'createdAt' | 'updatedAt'> {}
export interface OrderPayloadWithItems
    extends Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'totalPrice'> {
    orderItems: Omit<OrderItem, 'id' | 'orderId'>[];
}
