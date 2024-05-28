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

export function convertToBaseUnit(
    quantity: number,
    baseUnitValue: number,
    transactionType: 'SALE' | 'PURCHASE' | 'RETURN',
) {
    return transactionType === 'PURCHASE'
        ? quantity * baseUnitValue
        : quantity * baseUnitValue;
}
