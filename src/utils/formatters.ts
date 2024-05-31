import type { Product } from '../types/product';

export function convertStockToBaseUnit(
    purchasedStock: number,
    baseUnitValue: number,
): number {
    return purchasedStock * baseUnitValue;
}

export function convertSellingUnit(
    product: Product,
    unit: string,
    quantity: number,
): number {
    if (
        unit !== product.baseUnit &&
        product.purchasedUnit !== product.baseUnit
    ) {
        return quantity * product.baseUnitValue;
    }

    return quantity;
}

export function convertToPurchasedUnit(
    quantity: number,
    baseUnitValue: number,
) {
    return quantity / baseUnitValue;
}

export function convertToBaseUnit(quantity: number, baseUnitValue: number) {
    return (quantity * baseUnitValue).toFixed(2);
}

const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
    currency: 'INR',
    style: 'currency',
    minimumFractionDigits: 0,
});

export function formatCurrency(amount: number) {
    return CURRENCY_FORMATTER.format(amount);
}

const NUMBER_FORMATTER = new Intl.NumberFormat('en-US');

export function formatNumber(number: number) {
    return NUMBER_FORMATTER.format(number);
}

const DATETIME_FORMATTER = new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
});

export function formatDateTime(date: Date) {
    return DATETIME_FORMATTER.format(date);
}

const DATE_FORMATTER = new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
});

export function formatDate(date: Date) {
    return DATE_FORMATTER.format(date);
}
