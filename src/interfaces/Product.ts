
export interface Product {
    id: string;
    name_product: string;
    description: string;
    measure_unit: string;
    stock: number;
    sale_price:number;
    is_active: boolean;
    brand: {
        id: string;
        name: string;
    }
    category: {
        id: string;
        name: string;
    }
}
export type CreateProduct = Omit<UpdateProduct, "id">;

export interface UpdateProduct{
    id: string;
    name_product: string;
    description: string;
    measure_unit: string;
    stock: number;
    sale_price:number;
    is_active: boolean;
    brand_id: string;
    category_id: string;
}

