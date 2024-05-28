import { useNavigate } from 'react-router-dom';

import { DataPageHeader } from '@/renderer/components/data-table/data-page-header';
import { ProductForm } from '@/renderer/components/form/product-form';

export default function NewProductPage() {
    const navigate = useNavigate();

    return (
        <main className="container my-6 flex w-full flex-col gap-14">
            <DataPageHeader
                pageTitle="New Product"
                ctaLabel="Cancel"
                action={() => navigate(-1)}
                variant="secondary"
            />
            <ProductForm mode={'CREATE'} />
        </main>
    );
}
