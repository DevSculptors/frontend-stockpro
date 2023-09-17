"use client";
import { Table } from "@/components/Table";
import { LuSearch } from "react-icons/lu";
import React, { useContext } from "react";

import { useQuery } from "@tanstack/react-query";

import { ModalContext } from "@/context/ModalContext";
import {getAllCategoriesAPI} from "@/api/Category";
import {CategoryContext} from "@/context/CategoryContext";
import styles from "./style.module.css";
import { Category } from "@/interfaces/Category";


function CategoryPage() {

    const { setOpen, setId } = useContext(ModalContext);
    const { setSelectedCategory, setCategories } = useContext(CategoryContext);

    const { data, isLoading } = useQuery(["category"], getAllCategoriesAPI, {
        onSuccess: (data) => {
            setCategories(data);
        },
    });
    const typeStatus = (status: boolean) => {
        return status ? 'Activo' : 'Inactivo';
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
            <div className={styles.containerTittle}>
                <p className={styles.tittleList}>Categorias</p>
                <div className={styles.divSearch}>
                    <LuSearch className={styles.iconSearch} />
                    <input
                        type="text"
                        placeholder="Buscar categoria"
                        className={styles.inputSearch}
                    />
                </div>
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
                columnNames={[
                    "Nombre",
                    "Descripción",
                    "Estado",
                ]}>
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
    );
}

export default CategoryPage