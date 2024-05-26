import type { Category, CategoryPayload } from '@/types/category';

export async function getCategory(categoryId: number) {
    try {
        const res = await window.api.getCategory(categoryId);
        const data = JSON.parse(res) as Category;
        return data;
    } catch (err) {
        const e = err as Error;
        throw new Error(e.message);
    }
}
export async function getCategories() {
    try {
        const res = await window.api.getCategories();
        const data = JSON.parse(res) as Category[];
        return data;
    } catch (err) {
        const e = err as Error;
        throw new Error(e.message);
    }
}

export async function createCategory(payload: CategoryPayload) {
    try {
        const newCategory = JSON.parse(
            await window.api.createCategory({
                name: payload.name,
                description: payload.description,
            }),
        ) as Category;
        return newCategory;
    } catch (err) {
        const e = err as Error;
        throw new Error(e.message);
    }
}

export const getCategoriesAsLabel = async () => {
    const data = await getCategories();

    return data.map((category) => {
        return {
            label: category.name,
            value: category.name,
            icon: undefined,
        };
    });
};
