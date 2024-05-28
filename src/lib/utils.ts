import { OrderItemWithDetails, OrderWithDetails } from '@/types/order';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function calculateTaxAmount(amount: number, taxValue: number) {
    return amount + amount * (taxValue / 100);
}

export function calculateTotalTax(orderItems: OrderItemWithDetails[]) {
    return orderItems.reduce((acc, item) => {
        const tax = item.price.taxValue * item.quantity;
        return acc + tax;
    }, 0);
}
