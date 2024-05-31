import { OrderItemWithDetails, OrderWithDetails } from '@/types/order';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function calculateTaxAmount(
    amountWithTax: number,
    actualAmount: number,
) {
    return amountWithTax - actualAmount;
}

export function calculateActualAmount(amountWithTax: number, taxValue: number) {
    const taxRate = taxValue / 100;
    return (amountWithTax / (1 + taxRate)).toFixed(2);
}

export function calculateOrderItemsSubTotal(
    orderItems: OrderItemWithDetails[],
) {
    return orderItems
        .reduce((acc, item) => {
            const amountWithTax = item.quantity * item.price.amount;
            return (
                acc +
                Number(
                    calculateActualAmount(amountWithTax, item.price.taxValue),
                )
            );
        }, 0)
        .toFixed(2);
}

export function calculateOrderItemsTaxAmount(
    orderItems: OrderItemWithDetails[],
) {
    return orderItems
        .reduce((acc, item) => {
            const amountWithTax = item.quantity * item.price.amount;
            const actualAmount =
                item.quantity *
                Number(
                    calculateActualAmount(
                        item.price.amount,
                        item.price.taxValue,
                    ),
                );
            return acc + calculateTaxAmount(amountWithTax, actualAmount);
        }, 0)
        .toFixed(2);
}

export function calculateTotalTax(orderItems: OrderItemWithDetails[]) {
    return orderItems
        .reduce((acc, item) => {
            const tax = item.price.taxValue * item.quantity;
            return acc + tax;
        }, 0)
        .toFixed(2);
}
