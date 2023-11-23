import axios from "./config";

import { Category, UpdateCategory} from "@/interfaces/Category";
import Cookies from "js-cookie";

export const getAllCategoriesAPI = async () => {
  const response = await axios.get<Category[]>("/category", {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
};

export const createCategoryAPI = async (category: Category) => {
  const response = await axios.post<Category>("/category", category, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
};
export const updateCategoryAPI = async (category: Category) => {
  const response = await axios.put<UpdateCategory>(
      `/category/${category.id}`,
      category,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
  );
  return response.data;
};



