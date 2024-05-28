import { cn } from '@/lib/utils';
import { getProducts } from '@/renderer/api/products';
import { createTransaction } from '@/renderer/api/transactions';
import { DataPageHeader } from '@/renderer/components/data-table/data-page-header';
import { Button } from '@/renderer/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/renderer/components/ui/command';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/renderer/components/ui/form';
import { Input } from '@/renderer/components/ui/input';
import { Label } from '@/renderer/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/renderer/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/renderer/components/ui/select';
import type { ProductWithCategory } from '@/types/product';
import { Product } from '@/types/product';
import { convertToPurchasedUnit } from '@/utils/convert';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown, LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';

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
            toast.success(res);
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
        <main className="container my-6 flex w-full flex-col gap-14">
            <DataPageHeader
                pageTitle="New Transaction"
                ctaLabel="Cancel"
                variant="secondary"
                action={() => navigate(-1)}
            />
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
                        render={({ field }) => {
                            const product = products.find(
                                (p) => p.id === form.getValues('productId'),
                            );
                            return (
                                <FormItem className="w-full">
                                    <FormLabel>
                                        Quantity in{' '}
                                        {product
                                            ? ` ${product.purchasedUnit}`
                                            : 'Purchased Unit'}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Product quantity"
                                            min={0}
                                            {...field}
                                            onChange={(e) =>
                                                form.setValue(
                                                    'quantity',
                                                    e.currentTarget
                                                        .valueAsNumber,
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
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
