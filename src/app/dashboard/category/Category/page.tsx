"use client";
import { Table } from "@/components/Table";
import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { ModalContext } from "@/context/ModalContext";
import { getAllCategoriesAPI } from "@/api/Category";
import { CategoryContext } from "@/context/CategoryContext";
import { Category } from "@/interfaces/Category";
import { GridLoader } from "react-spinners";

import styles from "./style.module.scss";



function CategoryPage() {
  const { setOpen, setId } = useContext(ModalContext);
  const { setSelectedCategory, setCategories } = useContext(CategoryContext);

  const { data, isLoading } = useQuery(["category"], getAllCategoriesAPI, {
    onSuccess: (data) => {
      setCategories(data);
    },
  });
  const typeStatus = (status: boolean) => {
    return status ? "Activo" : "Inactivo";
  };

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
          <Table
            name="categories"
            columnNames={["Nombre", "Descripción", "Estado"]}
          >
            {data?.map((category: Category) => (
              <Table.Row
                key={category.id}
                indexRow={category.id}
                rowData={[
                  category.name,
                  category.description,
                  typeStatus(category.is_active),
                ]}
                handleRow={() => handleRow(category.id)}
              />
            ))}
          </Table>
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
