import { useEffect, useState } from 'react';

import { DataTable } from '@/renderer/components/data-table/index';
import { ProductWithCategory } from '@/types/product';
import { getProductsWithDetails } from '@/renderer/api/products';
import { columns } from '@/renderer/pages/admin/products/columns';
import { TableFilterType } from '@/renderer/components/data-table/data-table-faced-filter';
import { getCategoriesAsLabel } from '@/renderer/api/categories';
import { Button } from '@/renderer/components/ui/button';
import { Link } from 'react-router-dom';

export default function ProductsPage() {
    const [products, setProducts] = useState<ProductWithCategory[]>([]);
    const [categories, setCategories] = useState<TableFilterType[]>([]);

    useEffect(() => {
        (async () => {
            const data = await getProductsWithDetails();
            const categoriesData = await getCategoriesAsLabel();
            setProducts(data);
            setCategories(categoriesData);
        })();
    }, []);

    return (
        <main className={'container my-6 w-full'}>
            <div>
                <h1 className={'text-2xl font-bold'}>Products Page</h1>
                <Button asChild>
                    <Link to={'/admin/products/new'}>New Product</Link>
                </Button>
            </div>
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
