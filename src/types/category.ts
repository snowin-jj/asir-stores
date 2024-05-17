export interface Category {
    id: number;
    name: string;
    description?: string | null;
}

export interface CategoryPayload extends Omit<Category, 'id'> {}
