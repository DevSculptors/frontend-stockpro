"use client";
import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { ModalContext } from "@/context/ModalContext";
import { getAllCategoriesAPI } from "@/api/Category";
import { CategoryContext } from "@/context/CategoryContext";
import { Category } from "@/interfaces/Category";

import styles from "./style.module.scss";

import { GridLoader } from "react-spinners";
import DataTable from "@/components/DataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Nombre",
    width: 200,
    type: "string",
  },
  {
    field: "description",
    headerName: "Descripción",
    width: 600,
    type: "string",
  },
  {
    field: "is_active",
    headerName: "Estado",
    width: 100,
    type: "boolean",
  },
];

function CategoryPage() {
  const { setOpen, setId } = useContext(ModalContext);
  const { setSelectedCategory, setCategories,category } = useContext(CategoryContext);

  const { data, isLoading } = useQuery(["category"], getAllCategoriesAPI, {
    onSuccess: (data) => {
      setCategories(data);
    },
  });

  const rows =
    category?.map((category: Category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
      is_active: category.is_active,
    })) || [];

  const handleRow = (id: string) => {
    const category = data?.find((category) => category.id === id);
    if (category) {
      setSelectedCategory(category);
    }
    if (setId) {
      setOpen(true);
      setId("editCategory");
    }
  };

  return (
    <div className={styles.containerCategory}>
      {isLoading ? (
        <div className={styles.loading}>
          <GridLoader color="#1E9189" loading={isLoading} size={125} />
        </div>
      ) : (
        <div>
          <div className={styles.containerTittle}>
            <p className={styles.tittleList}>Categorias</p>
            <div>
              <button
                className={styles.buttonCreate}
                onClick={() => {
                  if (setId) {
                    setOpen(true);
                    setId("addCategory");
                  }
                }}
              >
                Crear Categoria
              </button>
            </div>
          </div>
          <DataTable
            slug="categories"
            columns={columns}
            rows={rows}
            pagination={5}
            handleRow={(params) => handleRow(params)}
          />

        </div>
      )}
    </div>
  );
}

export default CategoryPage;
