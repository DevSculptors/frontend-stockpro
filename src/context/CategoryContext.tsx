import React, { createContext } from "react";

import { Category } from "@/interfaces/Category";


type CategoryContextType = {
  selectedCategory: Category | undefined;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | undefined>>;
  category: Category[] | undefined;
  setCategories: React.Dispatch<React.SetStateAction<Category[] | undefined>>;
};

const categoryContextState = {
  selectedCategory: undefined,
  setSelectedCategory: () => {},
  category: undefined,
  setCategories: () => {},
};

export const CategoryContext =
  createContext<CategoryContextType>(categoryContextState);
