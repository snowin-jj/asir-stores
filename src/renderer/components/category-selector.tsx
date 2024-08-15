import {
    CaretSortIcon,
    CheckIcon,
    PlusCircledIcon,
} from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';

import { Button } from '@/renderer/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/renderer/components/ui/command';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/renderer/components/ui/dialog';
import { Input } from '@/renderer/components/ui/input';
import { Label } from '@/renderer/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/renderer/components/ui/popover';
import { Category } from '@/types/category';
import { Textarea } from './ui/textarea';
import toast from 'react-hot-toast';
import { LoaderCircle } from 'lucide-react';
import {
    ComponentPropsWithoutRef,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from 'react';
import { createCategory } from '@/renderer/api/categories';

type PopoverTriggerProps = ComponentPropsWithoutRef<typeof PopoverTrigger>;

type CategorySelectorProps = PopoverTriggerProps & {
    defaultCategory?: Category;
    disabled?: boolean;
    updateCategory: (categoryId: number) => void;
};

export default function CategorySelector({
    className,
    defaultCategory,
    disabled,
    updateCategory,
}: CategorySelectorProps) {
    const [open, setOpen] = useState(false);
    const [showNewCategoryDialog, setShowNewCategoryDialog] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category>(
        defaultCategory || {
            id: 0,
            name: 'Select a category',
            description: '',
        },
    );
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryName, setCategoryName] = useState<string>('');
    const [categoryDescription, setCategoryDescription] = useState<string>('');
    const [creatingCategory, setCreatingCategory] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const data = JSON.parse(
                    await window.api.getCategories(),
                ) as unknown as Category[];
                setCategories(data);
            } catch (error) {
                toast.error('Failed to get categories');
                console.error(
                    'Failed to parse categories! Check the db connections',
                );
            }
        })();
    }, []);

    async function handleSubmit() {
        if (categoryName !== '') {
            setCreatingCategory(true);
            try {
                const newCategory = await createCategory({
                    name: categoryName,
                    description:
                        categoryDescription === '' ? null : categoryDescription,
                });
                updateCategory(newCategory.id);
                setSelectedCategory(newCategory);
                setCategories((categories) => [...categories, newCategory]);
            } catch (error) {
                const e = error as Error;
                toast.error(e.message);
                throw new Error(e.message);
            } finally {
                setCreatingCategory(false);
                setShowNewCategoryDialog(false);
            }
        }
    }

    return (
        <>
            <Dialog
                open={showNewCategoryDialog}
                onOpenChange={setShowNewCategoryDialog}
            >
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            aria-label="Select a category"
                            className={cn(
                                'min-w-[200px] justify-between',
                                className,
                            )}
                            disabled={disabled}
                        >
                            {selectedCategory.name}
                            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="min-w-full p-0">
                        <Command>
                            <CommandList>
                                <CommandInput placeholder="Search category..." />
                                <CommandEmpty>No team found.</CommandEmpty>
                                {categories.map((category) => (
                                    <CommandGroup
                                        key={category.id}
                                        className="w-full"
                                    >
                                        <CommandItem
                                            key={category.name}
                                            onSelect={() => {
                                                setSelectedCategory(category);
                                                updateCategory(category.id);
                                                setOpen(false);
                                            }}
                                            className="text-sm"
                                        >
                                            {category.name}
                                            <CheckIcon
                                                className={cn(
                                                    'ml-auto h-4 w-4',
                                                    selectedCategory?.name ===
                                                        category.name
                                                        ? 'opacity-100'
                                                        : 'opacity-0',
                                                )}
                                            />
                                        </CommandItem>
                                    </CommandGroup>
                                ))}
                            </CommandList>
                            <CommandSeparator />
                            <CommandList>
                                <CommandGroup>
                                    <DialogTrigger asChild>
                                        <CommandItem
                                            onSelect={() => {
                                                setOpen(false);
                                                setShowNewCategoryDialog(true);
                                            }}
                                        >
                                            <PlusCircledIcon className="mr-2 h-5 w-5" />
                                            Create Category
                                        </CommandItem>
                                    </DialogTrigger>
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Category</DialogTitle>
                        <DialogDescription>
                            Add a new category to manage products.
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <div className="space-y-4 py-2 pb-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Category name</Label>
                                <Input
                                    id="name"
                                    value={categoryName}
                                    onChange={(e) =>
                                        setCategoryName(e.target.value)
                                    }
                                    placeholder="Painting Supplies"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="plan">Description</Label>
                                <Textarea
                                    id="description"
                                    value={categoryDescription}
                                    onChange={(e) =>
                                        setCategoryDescription(e.target.value)
                                    }
                                    placeholder="Type the category description"
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowNewCategoryDialog(false)}
                        >
                            Cancel
                        </Button>
                        {creatingCategory ? (
                            <Button type="submit" disabled={creatingCategory}>
                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                Creating...
                            </Button>
                        ) : (
                            <Button type="button" onClick={handleSubmit}>
                                Create
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
