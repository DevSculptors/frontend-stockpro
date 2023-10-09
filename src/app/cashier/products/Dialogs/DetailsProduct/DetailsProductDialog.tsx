"use client"
import styles from "./styles.module.scss";
import React, { FormEvent, useContext, useState } from "react";
import { ModalContext } from "@/context/ModalContext";
import { ProductContext } from "@/context/ProductContext";

import {Product} from "@/interfaces/Product"


function DetailsProductDialog(){

    const { setOpen } = useContext(ModalContext);

    const { selectedProduct, setSelectedProduct} = useContext(ProductContext);

    const onCancel = () => {
        console.log("click en cerrar");
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

    return (
        <div className={styles.containerDetail}>
            <div className={styles.descriptionContainer}>
                <h2>Detalles Producto</h2>
            </div>
            <div className="my-[10px] grid grid-cols-2 gap-4">
                <div className={styles.detailContainer}>
                    <label htmlFor="name_product" className={styles.label}>
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="name_product"
                        name="name_product"
                        value={selectedProduct?.name_product}
                        readOnly
                    /></div>
                <div className={styles.detailContainer}>
                    <label htmlFor="measure_unit" className={styles.label}>
                        Unidad de medida
                    </label>
                    <input
                        type="text"
                        id="measure_unit"
                        name="measure_unit"
                        value={selectedProduct?.measure_unit}
                        readOnly
                    /></div>
                <div className={styles.detailContainer}>
                    <label htmlFor="sale_price" className={styles.label}>
                        Precio de venta
                    </label>
                    <input
                        type="text"
                        id="sale_price"
                        name="sale_price"
                        value={selectedProduct?.sale_price}
                        readOnly
                    /></div>
                <div className={styles.detailContainer}>
                    <label htmlFor="is_active" className={styles.label}>
                        Estado
                    </label>
                    <input
                        type="text"
                        id="is_active"
                        name="is_active"
                        value={selectedProduct?.is_active.toString()}
                        readOnly
                    /></div>
                <div className={styles.detailContainer}>
                    <label htmlFor="brand" className={styles.label}>
                        Marca
                    </label>
                    <input
                        type="text"
                        id="brand"
                        name="brand"
                        value={selectedProduct?.brand.name}
                        readOnly
                    /></div>
                <div className={styles.detailContainer}>
                    <label htmlFor="category" className={styles.label}>
                        Categoría
                    </label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={selectedProduct?.category.name}
                        readOnly
                    /></div>
            </div>
            <div className={styles.descriptionText}>
                <label htmlFor="description" className={styles.label}>
                    Descripción
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={selectedProduct?.description}
                    readOnly
                /></div>
            <div className="my-[10px] grid grid-cols-1 gap-4">
                <button
                    onClick={onCancel}
                    className={styles.cancelButton}
                    type="button"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}
export default DetailsProductDialog;