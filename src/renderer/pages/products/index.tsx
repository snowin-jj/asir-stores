import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';

import { getCategoriesAsLabel } from '@/renderer/api/categories';
import { getProductsWithDetails } from '@/renderer/api/products';
import { DataPageHeader } from '@/renderer/components/data-table/data-page-header';
import { TableFilterType } from '@/renderer/components/data-table/data-table-faced-filter';
import { DataTable } from '@/renderer/components/data-table/index';
import { columns } from '@/renderer/pages/products/columns';
import { ProductWithCategory } from '@/types/product';
import { $activePanel } from '@/renderer/store';

export default function ProductsPage() {
    const [products, setProducts] = useState<ProductWithCategory[]>([]);
    const [categories, setCategories] = useState<TableFilterType[]>([]);
    const activePanel = useStore($activePanel);

    useEffect(() => {
        (async () => {
            const data = await getProductsWithDetails();
            const categoriesData = await getCategoriesAsLabel();
            if (activePanel === 'SALES') {
                setProducts(data.filter((product) => product.isActive));
            } else {
                setProducts(data);
            }

            setCategories(categoriesData);
        })();
    }, []);

    return (
        <main className={'container my-6 w-full'}>
            <DataPageHeader
                pageTitle="Products Page"
                ctaLabel={activePanel === 'ADMIN' && 'New Product'}
                path="/admin/products/new"
            />
            <DataTable
                data={products}
                columns={columns}
                filterAccessorKey={'name'}
                filterLabel={'Product'}
                sorterLabel={'Category'}
                sorterAccessorKey={'categoryName'}
                sorterOptions={categories}
            />
        </main>
    );
}
