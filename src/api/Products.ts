import axios from "./config";

import { Product, CreateProduct, UpdateProduct} from "@/interfaces/Product";
import Cookies from "js-cookie";

export const getAllProductsAPI = async () => {
    const response = await axios.get<Product[]>("/product", {
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
        },
    });
    return response.data;
};

export const createProductAPI = async (product: CreateProduct) => {
    const response = await axios.post<CreateProduct>("/product", product, {
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
        },
    });
    return response.data;
};
export const updateProductAPI = async (product: UpdateProduct) => {
    const response = await axios.put<UpdateProduct>(
        `/product/${product.id}`,
        product,
        {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        }
    );
    return response.data;
};

