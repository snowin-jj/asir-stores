import { Product } from '@/types/product';

export interface Transaction {
    id: number;
    quantity: number;
    transactionType: 'SALE' | 'PURCHASE' | 'RETURN';
    productId: number;
    transactionDate: Date;
}

export interface TransactionWithProduct extends Transaction {
    product: Product;
}

export interface TransactionPayload
    extends Omit<Transaction, 'id' | 'transactionDate'> {}
