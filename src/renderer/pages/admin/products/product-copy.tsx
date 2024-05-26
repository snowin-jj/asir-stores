import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { deleteProduct, getProduct } from '@/renderer/api/products';
import { ActivityBadge } from '@/renderer/components/active-badge';
import { Button } from '@/renderer/components/ui/button';
import type { ProductWithCategory } from '@/types/product';

export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<ProductWithCategory>();
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
            // toast.success(res);
            // navigate(-1);
        }
    }

    if (!product) return <p>Loading...</p>;

    return (
        <main className="mx-auto grid w-full place-items-center">
            <div className="h-full w-full max-w-6xl px-20 py-20">
                <Button
                    variant="link"
                    className="mb-8 p-0"
                    onClick={() => navigate(-1)}
                >
                    <ChevronLeft className="mr-2 h-5 w-5" /> Back
                </Button>
                <div className="flex w-full justify-between gap-8 ">
                    <div className="w-[60%] space-y-12">
                        <div>
                            <h2 className="text-2xl font-bold">
                                {product.name}
                            </h2>
                            <p>{product.description}</p>
                            <div className="my-4 flex gap-8">
                                <span>
                                    <strong>Created At</strong>
                                    <p>
                                        {new Date(
                                            product.createdAt,
                                        ).toDateString()}
                                    </p>
                                </span>
                                <span>
                                    <strong>Updated At</strong>
                                    <p>
                                        {new Date(
                                            product.updatedAt,
                                        ).toDateString()}
                                    </p>
                                </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <Button asChild>
                                <Link to={`/admin/products/edit/${product.id}`}>
                                    Edit Product
                                </Link>
                            </Button>
                            <Button asChild>
                                <Link
                                    to="/admin/transactions/new"
                                    state={{
                                        transactionType: 'Purchase',
                                        ...product,
                                    }}
                                >
                                    Make Purchase
                                </Link>
                            </Button>
                            {/* <Button asChild>
                <Link to="/admin/products">Sell (TODO)</Link>
              </Button> */}
                            <Button
                                variant="destructive"
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                    <div className="mx-auto flex w-[40%] justify-center gap-8">
                        <div className="space-y-4">
                            <div className="w-fit space-y-1">
                                <h2 className="text-xl font-bold">Price</h2>
                                <p>
                                    ₹ {Number(product.sellingPrices[0].amount)}
                                </p>
                            </div>
                            <div className="w-fit space-y-1">
                                <h2 className="text-xl font-bold">Quantity</h2>
                                <p>{product.stock}</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="w-fit space-y-1">
                                <h2 className="text-xl font-bold">
                                    Reorder Point
                                </h2>
                                <p>{product.reorderPoint}</p>
                            </div>
                            <div className="w-fit space-y-1">
                                <h2 className="text-xl font-bold">Is Active</h2>
                                <ActivityBadge
                                    reorderPoint={product.reorderPoint}
                                    stock={product.stock}
                                    isActive={product.isActive}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
