import axios from "./config";

import { Brand, UpdateBrand} from "@/interfaces/Brand";
import Cookies from "js-cookie";

export const getAllBrandsAPI = async () => {
  const response = await axios.get<Brand[]>("/brand", {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
};

export const createBrandAPI = async (brand: Brand) => {
  const response = await axios.post<UpdateBrand>("/brand", brand, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  
  return response.data;
};
export const updateBrandAPI = async (brand: Brand) => {
  const response = await axios.put<UpdateBrand>(
      `/brand/${brand.id}`,
      brand,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
  );
  return response.data;
};

