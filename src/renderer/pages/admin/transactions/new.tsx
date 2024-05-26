import { z } from 'zod';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown, LoaderCircle } from 'lucide-react';

import { Button } from '@/renderer/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/renderer/components/ui/select';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/renderer/components/ui/form';
import { Input } from '@/renderer/components/ui/input';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { ProductWithCategory } from '@/types/product';
import { Product } from '@/types/product';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/renderer/components/ui/popover';
import { cn } from '@/lib/utils';
import { getProducts } from '@/renderer/api/products';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/renderer/components/ui/command';
import { createTransaction } from '@/renderer/api/transactions';
import { Label } from '@/renderer/components/ui/label';
import { convertToPurchasedUnit } from '@/utils/convert';

const formSchema = z.object({
    productId: z.number(),
    quantity: z.number(),
    transactionType: z.enum(['PURCHASE', 'SALE', 'RETURN']),
});

export default function NewTransactionPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const passedProduct = location.state as unknown as ProductWithCategory & {
        transactionType: 'PURCHASE' | 'SALE' | 'RETURN';
    };

    useEffect(() => {
        (async () => {
            const productsData = await getProducts();
            setProducts(productsData);
        })();
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            productId: passedProduct?.id,
            transactionType: passedProduct?.transactionType || 'PURCHASE',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        try {
            setLoading(true);
            if (Number(values.quantity) <= 0) {
                throw new Error(
                    'The quantity must be greater than 0 in order to make a transaction.',
                );
            }
            const res = await createTransaction({
                productId: values.productId,
                quantity: values.quantity,
                transactionType: values.transactionType,
            });
            toast.success('Transaction completed');
            navigate('/admin/transactions');
        } catch (error) {
            const e = error as Error;
            toast.error(e.message);
            throw new Error(e.message);
        } finally {
            setLoading(false);
        }
    }

    function getCurrentStock(productId: number) {
        const product = products.find((product) => product.id === productId);
        if (!product) return 0;
        return `${convertToPurchasedUnit(product.stock, product.baseUnitValue)} ${product.purchasedUnit}`;
    }

    return (
        <main className="flex w-full flex-col gap-14 px-8 py-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">New Transaction</h2>
                <Button variant="secondary" onClick={() => navigate(-1)}>
                    Cancel
                </Button>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex w-full max-w-4xl flex-col items-start justify-center space-y-8 self-center"
                >
                    <FormField
                        control={form.control}
                        name="productId"
                        render={({ field }) => (
                            <FormItem className="flex w-full flex-col">
                                <FormLabel>Product</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    'min-w-[200px] justify-between',
                                                    !field.value &&
                                                        'text-muted-foreground',
                                                )}
                                            >
                                                {field.value
                                                    ? products.find(
                                                          (product) =>
                                                              product.id ===
                                                              field.value,
                                                      )?.name
                                                    : 'Select product'}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="min-w-[200px] p-0"
                                        align="end"
                                    >
                                        <Command>
                                            <CommandList>
                                                <CommandInput placeholder="Search product..." />
                                                <CommandEmpty>
                                                    No product found.
                                                </CommandEmpty>
                                                <CommandGroup>
                                                    {products.map((product) => (
                                                        <CommandItem
                                                            value={product.name}
                                                            key={product.id}
                                                            onSelect={() => {
                                                                form.setValue(
                                                                    'productId',
                                                                    product.id,
                                                                );
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    'mr-2 h-4 w-4',
                                                                    product.id ===
                                                                        field.value
                                                                        ? 'opacity-100'
                                                                        : 'opacity-0',
                                                                )}
                                                            />
                                                            {product.name}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                                <div className="flex items-center gap-2 pt-4">
                                    <Label>Current Stock:</Label>
                                    <p>{getCurrentStock(field.value)}</p>
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Quantity</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Product quantity"
                                        min={0}
                                        {...field}
                                        onChange={(e) =>
                                            form.setValue(
                                                'quantity',
                                                e.currentTarget.valueAsNumber,
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="transactionType"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Transaction Type</FormLabel>
                                <Select
                                    disabled
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder={`Select a transaction type`}
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="PURCHASE">
                                            PURCHASE
                                        </SelectItem>
                                        <SelectItem value="SALE">
                                            SALE
                                        </SelectItem>
                                        <SelectItem value="RETURN">
                                            RETURN
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {loading ? (
                        <Button type="submit" disabled={loading}>
                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                            Making...
                        </Button>
                    ) : (
                        <Button type="submit">Make Transaction</Button>
                    )}
                </form>
            </Form>
        </main>
    );
}
