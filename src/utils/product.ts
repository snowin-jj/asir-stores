export function getProductsWithPriceAndCategory(products: any[]) {
    return products.reduce((acc, product) => {
        const existingProduct = acc.find((p: any) => p.id === product.id);
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
                quantity: product.quantity,
                taxValue: product.taxValue,
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
                        quantity: product.quantity,
                        taxValue: product.taxValue,
                    },
                ],
            });
        }
        return acc;
    }, []);
}
