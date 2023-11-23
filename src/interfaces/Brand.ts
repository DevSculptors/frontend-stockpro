
export interface Brand {
    id: string;
    name: string;
    is_active: boolean;
    description: string;
}

export type UpdateBrand = Omit<Brand, "id">;

