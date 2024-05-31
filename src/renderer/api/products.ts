import type {
    Price,
    Product,
    ProductPayload,
    ProductWithCategory,
} from '@/types/product';
import { UpdateProductPayload } from '@/renderer/components/form/product-form';

export async function getProduct(productId: number) {
    try {
        const product = JSON.parse(
            await window.api.getProduct(productId),
        ) as ProductWithCategory;
        return product;
    } catch (error) {
        const e = error as Error;
        console.error('❌ GET PRODUCT BY ID', error);
        throw new Error(e.message);
    }
}

export async function getProducts() {
    try {
        const products = JSON.parse(
            await window.api.getProducts(),
        ) as Product[];
        return products;
    } catch (error) {
        const e = error as Error;
        console.error('❌ GET PRODUCTS', error);
        throw new Error(e.message);
    }
}

export async function getProductsWithDetails() {
    try {
        const products = JSON.parse(
            await window.api.getProductsWithDetails(),
        ) as ProductWithCategory[];

        return products;
    } catch (error) {
        const e = error as Error;
        console.error('❌ GET PRODUCT BY ID', error);
        throw new Error(e.message);
    }
}

export async function createProduct(payload: ProductPayload) {
    try {
        const data = JSON.parse(await window.api.createProduct(payload));
        return data;
    } catch (err) {
        const e = err as Error;
        throw new Error(e.message);
    }
}

export async function deleteProduct(productId: number) {
    try {
        const res = JSON.parse(await window.api.deleteProduct(productId));
        return res;
    } catch (err) {
        const e = err as Error;
        throw new Error(e.message);
    }
}

export async function deletePrice(priceId: number) {
    try {
        const res = JSON.parse(await window.api.deletePrices(priceId));
        return res;
    } catch (error) {
        const e = error as Error;
        throw new Error(e.message);
    }
}

export async function updateProduct(
    productId: number,
    payload: UpdateProductPayload,
) {
    try {
        const res = JSON.parse(
            await window.api.updateProduct(productId, payload),
        );
        return res;
    } catch (error) {
        const e = error as Error;
        throw new Error(e.message);
    }
}

export async function getPrices(productId: number) {
    try {
        const data = JSON.parse(
            await window.api.getPrices(productId),
        ) as Price[];
        return data;
    } catch (err) {
        const e = err as Error;
        throw new Error(e.message);
    }
}

export async function getPrice(priceId: number) {
    try {
        const data = JSON.parse(await window.api.getPrice(priceId)) as Price;
        return data;
    } catch (err) {
        const e = err as Error;
        throw new Error(e.message);
    }
}
