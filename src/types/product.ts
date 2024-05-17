import type { Category } from './category';

export interface Product {
    id: number;
    name: string;
    description?: string;
    purchasedPrice: number;
    purchasedUnit: string;
    taxValue: number;
    stock: number;
    reorderPoint: number;
    isActive: boolean;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Price {
    id: number;
    amount: number;
    unit: string;
    productId: number;
}

export interface ProductWithPrice extends Product {
    sellingPrices: Price[];
}

export interface ProductWithCategory extends ProductWithPrice {
    category: Category;
}

export interface PricePayload extends Omit<Price, 'id' | 'productId'> {}

export interface ProductPayload
    extends Omit<Product, 'id' | 'createdAt' | 'updatedAt'> {
    sellingPrices: PricePayload[];
}
