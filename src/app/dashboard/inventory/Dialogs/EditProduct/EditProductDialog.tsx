"use client";
import React, { FormEvent, useContext, useState } from "react";
import {useQueryClient, useMutation, useQuery} from "@tanstack/react-query";
import styles from "./styles.module.scss";

import { ModalContext } from "@/context/ModalContext";
import { ProductContext } from "@/context/ProductContext";
import { CategoryContext } from "@/context/CategoryContext";
import { BrandContext } from "@/context/BrandContext";

import {UpdateProduct, Product} from "@/interfaces/Product"
import {updateProductAPI} from "@/api/Products";

import { ToasterEdit, ToasterError } from "@/helpers/useToaster";
import {getAllCategoriesAPI} from "@/api/Category";
import {getAllBrandsAPI} from "@/api/Brand";

function EditProductDialog() {
    const queryClient = useQueryClient();

    const updateProductMutation = useMutation({
        mutationFn: updateProductAPI,
        onSuccess: () => {
            queryClient.invalidateQueries(["product"]);
            ToasterEdit("Producto editado correctamente");
            setOpen(false);
        },
        onError: (error: any) => {
            error.response.data.forEach((error: any) => {
                ToasterError(error.message);
            });
        }
    });
    const { setOpen } = useContext(ModalContext);

    const { selectedProduct, setSelectedProduct} = useContext(ProductContext);

    const { setBrands, brands } = useContext(BrandContext);
    const { setCategories, category } = useContext(CategoryContext);

    const {} = useQuery(["category"], getAllCategoriesAPI, {
        onSuccess: (data) => {
            setCategories(data);
        },
    });
    const {} = useQuery(["brands"], getAllBrandsAPI, {
        onSuccess: (data) => {
            setBrands(data);
        },
    });

    const updateProductValues = {
        id: selectedProduct?.id,
        name_product: selectedProduct?.name_product,
        description: selectedProduct?.description,
        measure_unit: selectedProduct?.measure_unit,
        stock: selectedProduct?.stock,
        sale_price: Number(selectedProduct?.sale_price),
        category_id: selectedProduct?.category.id,
        brand_id: selectedProduct?.brand.id,
        is_active: selectedProduct?.is_active,
    };

    const handleChange = ({ target: { name, value } }: any) => {
        if (name=="is_active"){
            value=="true"?value=true:value=false;
        }
        if (name=="category_id"){
            updateProductValues.category_id=value
        }
        if (name=="brand_id"){
            updateProductValues.brand_id=value
        }
        setSelectedProduct((prevValues: any) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const onSubmit = async (e:  FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateProductMutation.mutate(updateProductValues as UpdateProduct)
    };

    const onCancel = () => {
        console.log("click en cancelar");
        setOpen(false);
    };
    const measureTypes = [
        {
          value: 'KG',
          label: 'Kilogramos',
        },
        {
          value: 'UNITS',
          label: 'Unidades',
        },
        {
          value: 'LITERS',
          label: 'Litros',
        },
        {
          value: 'POUNDS',
          label: 'Libras',
        }]

    const state =[
        { value: "true", label: 'Activo' },
        { value: "false", label: 'Inactivo' }
    ]

    return (
        <form onSubmit={onSubmit} className={styles.form}>
            <div className={styles.descriptionContainer}>
                <h2>Editar Producto</h2>
            </div>
            <div className="my-[10px] grid grid-cols-2 gap-4">
                <div className={styles.inputContainer}>
                    <label htmlFor="name_product" className={styles.label}>
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="name_product"
                        name="name_product"
                        placeholder="Escribe el nombre"
                        value={selectedProduct?.name_product}
                        onChange={handleChange}
                        required
                    /></div>
                <div className={styles.listBox}>
                    <label htmlFor="measure_unit">Unidad de medida</label>
                    <select name="measure_unit" id="measure_unit" onChange={handleChange}
                            value={selectedProduct?.measure_unit}
                    >
                        {measureTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="sale_price" className={styles.label}>
                        Precio de venta
                    </label>
                    <input
                        type="number"
                        id="sale_price"
                        name="sale_price"
                        placeholder="Ingrese el precio de venta"
                        value={selectedProduct?.sale_price}
                        onChange={handleChange}
                        required
                    /></div>
                <div className={styles.listBox}>
                    <label htmlFor="is_active">Estado Producto</label>
                    <select name="is_active" id="is_active" onChange={handleChange}
                            value={selectedProduct?.is_active.toString()}>
                        {state.map((type) => (
                            <option key={type.value} value={type.value}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.listBox}>
                    <label htmlFor="brand">Marca</label>
                    <select name="brand_id" id="brand" onChange={handleChange}
                            value={updateProductValues.brand_id}
                    >
                        {brands?.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.listBox}>
                    <label htmlFor="category_id">Categoria</label>
                    <select name="category_id" id="category" onChange={handleChange}
                            value={selectedProduct?.category.id}
                    >
                        {category?.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="description" className={styles.label}>
                        Descripción
                    </label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Ingrese la descripción"
                        value={selectedProduct?.description}
                        onChange={handleChange}
                        required
                    /></div>
            </div>
            <div className="my-[10px] grid grid-cols-2 gap-4">
                <button
                    onClick={onCancel}
                    className={styles.cancelButton}
                    type="button"
                >
                    Cancelar
                </button>
                <button className={styles.submitButton}>Editar</button>
            </div>
        </form>
    );
}

export default EditProductDialog;
