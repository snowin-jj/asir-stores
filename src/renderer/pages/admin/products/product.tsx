import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import { deleteProduct, getProduct } from '@/renderer/api/products';
import { Button } from '@/renderer/components/ui/button';
import type { ProductWithCategory } from '@/types/product';
import { ProductForm } from '@/renderer/components/form/product-form';

export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<ProductWithCategory>();
    const [mode, setMode] = useState<'EDIT' | 'VIEW'>('VIEW');
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const data = await getProduct(Number(id));
            setProduct(data);
        })();
    }, []);

    async function handleDelete() {
        const choice = confirm(
            `Are you sure? Do you want to delete '${product?.name}'?`,
        );
        if (choice) {
            const res = await deleteProduct(Number(product?.id));
            toast.success(res);
            navigate(-1);
        }
    }

    function toggleMode() {
        setMode((prevState) => (prevState === 'EDIT' ? 'VIEW' : 'EDIT'));
    }

    if (!product) return <p>Loading...</p>;

    return (
        <main className="mx-auto w-full max-w-4xl space-y-4 py-8">
            <header className="flex w-full items-center justify-between">
                <Button
                    variant="link"
                    className="p-0"
                    onClick={() => navigate(-1)}
                >
                    <ChevronLeft className="mr-2 h-5 w-5" /> Back
                </Button>
                {mode === 'VIEW' ? (
                    <div className={'space-x-6'}>
                        <Button variant={'destructive'} onClick={handleDelete}>
                            Delete
                        </Button>
                        <Button onClick={toggleMode}>Edit</Button>
                    </div>
                ) : (
                    <Button onClick={() => navigate(0)}>Cancel</Button>
                )}
            </header>
            <ProductForm mode={mode} payload={product} />
        </main>
    );
}
