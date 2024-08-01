import knex from '../lib/db';
import type { CategoryPayload } from '../types/category';
import { TABLES } from '../utils/constants';

export async function createCategory(payload: CategoryPayload) {
    try {
        const categoryId = await knex(TABLES.CATEGORIES).insert(payload);
        const createdCategory = await knex(TABLES.CATEGORIES)
            .where('id', categoryId[0])
            .first();
        return JSON.stringify(createdCategory);
    } catch (error) {
        const e = error as Error;

        return 'Failed to create category.';
    }
}

export async function getCategories() {
    try {
        const categories = await knex(TABLES.CATEGORIES).select('*');
        return JSON.stringify(categories);
    } catch (error) {
        const e = error as Error;

        return 'Failed to get categories.';
    }
}

export async function getCategory(categoryId: number) {
    try {
        const category = await knex(TABLES.CATEGORIES)
            .select('*')
            .where('id', categoryId)
            .first();
        return JSON.stringify(category);
    } catch (error) {
        const e = error as Error;

        return 'Failed to get category.';
    }
}
