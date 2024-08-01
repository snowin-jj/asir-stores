import {
    createProduct,
    deletePrice,
    updateProduct,
} from '@/renderer/api/products';
import CategorySelector from '@/renderer/components/category-selector';
import FormButton from '@/renderer/components/form/form-button';
import { Button } from '@/renderer/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/renderer/components/ui/form';
import { Input } from '@/renderer/components/ui/input';
import { Switch } from '@/renderer/components/ui/switch';
import { Textarea } from '@/renderer/components/ui/textarea';
import { sellingPricesColumns } from '@/renderer/data/ui';
import { ProductPayload } from '@/types/product';
import { convertToBaseUnit, convertToPurchasedUnit } from '@/utils/formatters';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { z, ZodError } from 'zod';
import { Label } from '../ui/label';

const sellingPricesSchema = z
    .array(
        z.object({
            amount: z.number({ message: 'Amount is required' }),
            unit: z.string(),
            taxValue: z.number({ message: 'Tax Value is required' }),
            quantity: z.number({ message: 'Quantity is required' }),
        }),
    )
    .min(1, { message: 'Add at-least one selling price' });

const formSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    purchasedPrice: z.number(),
    purchasedUnit: z.string(),
    baseUnit: z.string(),
    baseUnitValue: z.number(),
    stock: z.number(),
    reorderPoint: z.number(),
    categoryId: z.number(),
    isActive: z.boolean(),
});

type FormSchema = z.infer<typeof formSchema>;

interface ProductFormProps {
    payload?: FormSchema & {
        id: number;
        sellingPrices: Array<{
            id?: number;
            quantity: string | number;
            unit: string;
            amount: string | number;
            taxValue: string | number;
        }>;
        category: {
            id: number;
            name: string;
            description?: string;
        };
    };
    mode: 'EDIT' | 'CREATE' | 'VIEW';
}

// Extract the payload type
type ProductFormPayload = ProductFormProps['payload'];

// Ensure the payload type is not undefined
type RequiredProductFormPayload = Exclude<ProductFormPayload, undefined>;

// Export as UpdateProductPayload
export type UpdateProductPayload = Omit<
    RequiredProductFormPayload,
    'id' | 'category'
>;

export function ProductForm({ mode, payload }: ProductFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: payload?.name,
            description: payload?.description || '',
            purchasedPrice: payload?.purchasedPrice,
            purchasedUnit: payload?.purchasedUnit,
            baseUnit: payload?.baseUnit,
            baseUnitValue: payload?.baseUnitValue,
            reorderPoint: payload?.reorderPoint,
            stock: convertToPurchasedUnit(
                payload?.stock,
                payload?.baseUnitValue,
            ),
            // @ts-ignore
            isActive: payload ? (payload.isActive === 0 ? false : true) : false,
            categoryId: payload?.categoryId,
        },
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const prices =
        payload && payload.sellingPrices && payload.sellingPrices.length > 0
            ? payload.sellingPrices
            : [{ quantity: '', unit: '', amount: '', taxValue: '' }];
    const [rows, setRows] = useState(prices);

    function updateCategory(categoryId: number) {
        form.setValue('categoryId', categoryId);
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true);
            const sellingPrices = await sellingPricesSchema.parseAsync(rows);
            if (mode === 'CREATE') {
                const res = await createProduct({
                    ...values,
                    sellingPrices,
                } as ProductPayload);
                toast.success(res);
                navigate('/admin/products');
            } else if (mode === 'EDIT') {
                const res = await updateProduct(payload.id, {
                    name: values.name,
                    categoryId: values.categoryId,
                    description: values.description,
                    stock: Number(
                        convertToBaseUnit(values.stock, payload.baseUnitValue),
                    ),
                    reorderPoint: values.reorderPoint,
                    baseUnit: values.baseUnit,
                    baseUnitValue: values.baseUnitValue,
                    isActive: values.isActive,
                    sellingPrices: rows,
                    purchasedPrice: values.purchasedPrice,
                    purchasedUnit: values.purchasedUnit,
                } as UpdateProductPayload);
                toast.success(res);
                navigate('/admin/products');
            }
        } catch (error) {
            if (error instanceof ZodError) {
                error.errors.forEach((err) => {
                    toast.error(`${err.path[1] || 'Error'}: ${err.message}`);
                });
                return;
            }
            const e = error as Error;
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    }
    function addRow() {
        setRows((prevState) => [
            ...prevState,
            { quantity: '', unit: '', amount: '', taxValue: '' },
        ]);
    }

    function handleInputChange(
        index: number,
        columnName: string,
        value: string | number,
    ) {
        const newRows = rows.map((row, idx) => {
            if (idx === index) {
                return { ...row, [columnName]: value };
            }
            return row;
        });
        setRows(newRows);
    }

    function handleRemoveRow(idx: number) {
        setRows((prevState) => prevState.filter((r, rowIdx) => rowIdx !== idx));
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-full flex-col items-start justify-center space-y-8 self-center"
            >
                <div className="flex w-full items-start justify-center gap-14">
                    <div className="w-full space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Product Name"
                                            autoFocus
                                            aria-selected={true}
                                            disabled={mode === 'VIEW'}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Product description"
                                            disabled={mode === 'VIEW'}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="purchasedPrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Purchased Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder="Enter the price of the product"
                                            disabled={mode === 'VIEW'}
                                            onChange={(e) =>
                                                form.setValue(
                                                    'purchasedPrice',
                                                    e.currentTarget
                                                        .valueAsNumber,
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
                            name="purchasedUnit"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Purchased Unit</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Enter the purchased unit of the product"
                                            disabled={mode === 'VIEW'}
                                            onChange={(e) =>
                                                form.setValue(
                                                    'purchasedUnit',
                                                    e.currentTarget.value,
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-full space-y-4">
                        <FormField
                            control={form.control}
                            name="stock"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Stock Level (
                                        {payload?.purchasedUnit ||
                                            form.getValues('purchasedUnit') ||
                                            'Purchased Unit'}
                                        )
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder="Stock"
                                            disabled={
                                                mode === 'EDIT' ||
                                                mode === 'VIEW'
                                            }
                                            onChange={(e) =>
                                                form.setValue(
                                                    'stock',
                                                    e.currentTarget
                                                        .valueAsNumber,
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
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-3">
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <CategorySelector
                                            disabled={mode === 'VIEW'}
                                            defaultCategory={
                                                payload
                                                    ? {
                                                          id: payload.categoryId,
                                                          name: payload
                                                              ?.category.name,
                                                          description:
                                                              payload?.category
                                                                  .description,
                                                      }
                                                    : null
                                            }
                                            updateCategory={updateCategory}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="reorderPoint"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Reorder Point (
                                        {payload?.purchasedUnit ||
                                            form.getValues('purchasedUnit') ||
                                            'Purchased Unit'}
                                        )
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder="Enter Reorder Point"
                                            disabled={mode === 'VIEW'}
                                            onChange={(e) =>
                                                form.setValue(
                                                    'reorderPoint',
                                                    e.currentTarget
                                                        .valueAsNumber,
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
                            name="baseUnit"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Base Unit</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Enter Base Unit"
                                            disabled={mode === 'VIEW'}
                                            onChange={(e) =>
                                                form.setValue(
                                                    'baseUnit',
                                                    e.currentTarget.value,
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
                            name="baseUnitValue"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {form.getValues('purchasedUnit') &&
                                        form.getValues('purchasedUnit') !==
                                            form.getValues('baseUnit')
                                            ? `How many ${form.getValues('baseUnit')} in a ${form.getValues('purchasedUnit')}`
                                            : 'Base Unit Value'}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder="Enter Base Unit Value"
                                            disabled={mode === 'VIEW'}
                                            onChange={(e) =>
                                                form.setValue(
                                                    'baseUnitValue',
                                                    e.currentTarget
                                                        .valueAsNumber,
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                {/*selling prices*/}
                <SellingPrices
                    rows={rows}
                    addRow={addRow}
                    handleRemoveRow={handleRemoveRow}
                    handleInputChange={handleInputChange}
                    disabled={mode === 'VIEW'}
                    mode={mode}
                />
                <div className="flex w-full items-center justify-between">
                    <FormField
                        control={form.control}
                        name="isActive"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-start gap-2">
                                <FormLabel>Is Active</FormLabel>
                                <FormControl>
                                    <Switch
                                        disabled={mode === 'VIEW'}
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormButton
                        disabled={mode === 'VIEW'}
                        loading={loading}
                        loadingText={
                            mode === 'CREATE' ? 'Creating...' : 'Updating...'
                        }
                        btnText={mode === 'CREATE' ? 'Create' : 'Save'}
                    />
                </div>
            </form>
        </Form>
    );
}

interface SellingPricesProps {
    rows: {
        id?: number;
        unit: string;
        amount: number | string;
        quantity: number | string;
        taxValue: number | string;
    }[];
    addRow: () => void;
    handleInputChange: (
        index: number,
        columnName: string,
        value: string | number,
    ) => void;
    handleRemoveRow: (idx: number) => void;
    disabled: boolean;
    mode: 'VIEW' | 'EDIT' | 'CREATE';
}

function SellingPrices({
    rows,
    addRow,
    handleInputChange,
    handleRemoveRow,
    disabled,
    mode,
}: SellingPricesProps) {
    async function handleDeletePrice(rowIndex: number, priceId: number) {
        try {
            if (mode === 'EDIT') {
                const res = await deletePrice(priceId);
                toast.success(res);
            }
            handleRemoveRow(rowIndex);
        } catch (error) {
            const e = error as Error;
            toast.error(e.message);
        }
    }

    return (
        <div className={'space-y-2'}>
            <h2 className={'font-bold'}>Selling Prices</h2>
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className={'flex items-end gap-8'}>
                    {sellingPricesColumns.map((col, colIndex) => (
                        <div className="space-y-2">
                            <Label>{col.label}</Label>
                            <Input
                                key={colIndex}
                                type={col.type}
                                // placeholder={`Enter the ${col.label}`}
                                placeholder={col.placeholder}
                                disabled={disabled}
                                // @ts-ignore
                                value={row[col.name]}
                                onChange={(e) =>
                                    handleInputChange(
                                        rowIndex,
                                        col.name,
                                        col.type === 'number'
                                            ? e.target.valueAsNumber
                                            : e.target.value,
                                    )
                                }
                            />
                        </div>
                    ))}
                    <Button
                        variant={'destructive'}
                        type={'button'}
                        disabled={disabled}
                        onClick={() =>
                            // @ts-ignore
                            handleDeletePrice(rowIndex, row.id as number)
                        }
                    >
                        <X />
                    </Button>
                </div>
            ))}
            <Button
                variant={'secondary'}
                type={'button'}
                disabled={disabled}
                onClick={addRow}
            >
                Add
            </Button>
        </div>
    );
}
