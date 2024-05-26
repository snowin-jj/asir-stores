"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsWithPriceAndCategory = void 0;
function getProductsWithPriceAndCategory(products) {
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
        }
        else {
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
exports.getProductsWithPriceAndCategory = getProductsWithPriceAndCategory;
//# sourceMappingURL=product.js.map