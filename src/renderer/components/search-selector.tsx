import { cn } from '@/lib/utils';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/renderer/components/ui/command';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface SearchSelectorProps {
    items: any[];
    label: string;
    placehoder: string;
    value: number;
    onCreate?: () => void;
    onSelect: (itemId: number) => void;
}

export default function SearchSelector({
    items,
    placehoder,
    value,
    label,
    onSelect,
    onCreate,
}: SearchSelectorProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <div>
                    <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                            'w-full min-w-[200px] justify-between',
                            !value && 'text-muted-foreground',
                        )}
                    >
                        {value
                            ? items.find((items) => items.id === value)?.name
                            : placehoder}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </div>
            </PopoverTrigger>
            <PopoverContent className="min-w-[200px] p-0" align="end">
                <Command>
                    <CommandInput placeholder={`Search ${label}`} />
                    <CommandList>
                        <CommandEmpty>No {label} Found.</CommandEmpty>
                        <CommandGroup>
                            {items.map((item) => (
                                <CommandItem
                                    value={item.name}
                                    key={item.id}
                                    onSelect={() => onSelect(item.id)}
                                >
                                    <div
                                        className={cn(
                                            'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                                            item.id === value
                                                ? 'bg-primary text-primary-foreground'
                                                : 'opacity-50 [&_svg]:invisible',
                                        )}
                                    >
                                        <CheckIcon className={cn('h-4 w-4')} />
                                    </div>
                                    {item.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    {onCreate && (
                        <>
                            <CommandSeparator />
                            <CommandList>
                                <CommandGroup>
                                    <CommandItem onSelect={onCreate}>
                                        <PlusCircledIcon className="mr-2 h-5 w-5" />
                                        Create {label}
                                    </CommandItem>
                                </CommandGroup>
                            </CommandList>
                        </>
                    )}
                </Command>
            </PopoverContent>
        </Popover>
    );
}
