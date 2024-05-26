import FormHeader from '@/renderer/components/form/form-header';
import { ProductForm } from '@/renderer/components/form/product-form';

export default function NewProductPage() {
    return (
        <main className="flex w-full flex-col gap-14 px-8 py-4">
            <FormHeader title="New Product" />
            <ProductForm mode={'CREATE'} />
        </main>
    );
}
