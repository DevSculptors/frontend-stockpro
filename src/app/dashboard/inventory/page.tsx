"use client";
import React, {useContext} from "react";
import { useQuery } from "@tanstack/react-query";
import {getAllProductsAPI} from "@/api/Products";
import { ProductContext } from "@/context/ProductContext";
import { Product } from "@/interfaces/Product";
import { ModalContext } from "@/context/ModalContext";
import styles from './styles.module.scss';
import { Card } from "@/components/Catalog/Card";

function Inventory() {
    const { setOpen, setId } = useContext(ModalContext);

    const { setSelectedProduct, setProducts, products } = useContext(ProductContext);

    const { data, isLoading } = useQuery(["products"], getAllProductsAPI, {
        onSuccess: (data) => {
            setProducts(data);
        },
    });
    const handleClick = (id: string) => {
        const product = data?.find((product) => product.id === id);
        if (product) {
            setSelectedProduct(product);
        }
        if (setId) {
            setOpen(true);
            setId("editProduct");
        }
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

    const getUnitLabel = (value: string) => {
        const found = measureTypes.find((type) => type.value === value);
        return found ? found.label : 'Unknown';
    };
    return (
        <div className={styles.container}>
            <div className={styles.containerTittle}>
                <p className={styles.tittleList}>Lista Productos</p>

                <div>
                    <button
                        className={styles.buttonCreateUser}
                        onClick={() => {
                            if (setId) {
                                setOpen(true);
                                setId("addProduct");
                            }
                        }}
                    >
                        Crear producto
                    </button>
                </div>
            </div>
            <div className="my-[10px] grid grid-cols-3 gap-4">
                {data?.map((product: Product) => (
                    <Card
                        key={product.id}
                        index={product.id}
                        name={product.name_product}
                        description={product.description}
                        units={product.stock +" "+ getUnitLabel(product.measure_unit)}
                        price={product.sale_price}
                        category={product.category.name}
                        brand={product.brand.name}
                        isActive={product.is_active}
                        handleClick={(params) => handleClick(params)}
                    />
                ))}
            </div>
        </div>

    )
}

export default Inventory