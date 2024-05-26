import type { Product } from '../types/product';

export function convertStockToBaseUnit(
    purchasedStock: number,
    purchasedUnitValue: number,
    baseUnitValue: number,
): number {
    return purchasedStock * purchasedUnitValue * baseUnitValue;
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
    purchasedUnitValue: number,
) {
    return quantity * purchasedUnitValue * baseUnitValue;
}
