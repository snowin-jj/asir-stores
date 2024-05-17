import { Product } from '../types/product';

type ProductWithPrice = Product & {
    priceId: number;
    amount: number;
    unit: string;
    categoryName: string;
    categoryDescription: string;
};

export function getProductsWithPriceAndCategory(products: ProductWithPrice[]) {
    return products.reduce((acc, product) => {
        const existingProduct = acc.find((p) => p.id === product.id);
        if (existingProduct) {
            existingProduct.sellingPrices = existingProduct.sellingPrices || [];
            existingProduct.category = existingProduct.category || {};
            existingProduct.category = {
                id: product.categoryId,
                name: product.categoryName,
                description: product.categoryDescription,
            };

            existingProduct.sellingPrices.push({
                id: product.priceId,
                amount: product.amount,
                unit: product.unit,
            });
        } else {
            acc.push({
                ...product,
                category: {
                    id: product.categoryId,
                    name: product.categoryName,
                    description: product.categoryDescription,
                },
                sellingPrices: [
                    {
                        id: product.priceId,
                        amount: product.amount,
                        unit: product.unit,
                    },
                ],
            });
        }
        return acc;
    }, []);
}
