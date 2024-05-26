import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Price } from '../types/product';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function calculateTaxAmount(price: Price) {
    return price.amount + price.amount * (price.taxValue / 100);
}
