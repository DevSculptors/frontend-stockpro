
export interface Category {
    id: string;
    name: string;
    is_active: boolean;
    description: string;
}

export type UpdateCategory = Omit<Category, "id">;

