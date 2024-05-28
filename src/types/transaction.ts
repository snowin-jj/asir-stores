import { Price, ProductWithCategory } from '@/types/product';

export interface Transaction {
    id: number;
    quantity: number;
    transactionType: 'SALE' | 'PURCHASE' | 'RETURN';
    productId: number;
    priceId?: number;
    transactionDate: Date;
}

export interface TransactionWithProduct extends Transaction {
    product: ProductWithCategory;
    price?: Price;
}

export interface TransactionPayload
    extends Omit<Transaction, 'id' | 'transactionDate'> {}
