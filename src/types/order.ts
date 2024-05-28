import { Price, Product } from './product';

export type PaymentMethod = 'CASH' | 'UPI' | 'CARD' | 'NET_BANKING';

export interface Order {
    id: number;
    customerId?: number;
    paymentMethod?: PaymentMethod;
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

export interface Customer {
    id: number;
    name: string;
    phone: string;
    email?: string;
    aadhaar?: string;
    points: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface CustomerWithDetails extends Customer {
    orders: Omit<OrderWithDetails, 'customer'>;
}

export interface OrderItemWithDetails extends OrderItem {
    price: Price;
    product: Product;
}

export interface OrderWithDetails extends Order {
    orderItems: OrderItemWithDetails[];
    customer: Customer;
}
export interface OrderWithCustomer extends Order {
    customer: Customer;
}

export interface OrderItemPayload
    extends Omit<OrderItemWithDetails, 'id' | 'orderId'> {}
export interface CustomerPayload
    extends Omit<Customer, 'id' | 'createdAt' | 'updatedAt'> {}

export interface OrderPayload
    extends Omit<Order, 'id' | 'createdAt' | 'updatedAt'> {}
export interface OrderPayloadWithItems
    extends Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'totalPrice'> {
    orderItems: Omit<OrderItem, 'id' | 'orderId'>[];
    customer?: CustomerPayload;
}
