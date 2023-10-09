"use client"
import React, { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProductsAPI } from "@/api/Products";
import { ProductContext } from "@/context/ProductContext";
import { Product } from "@/interfaces/Product";
import styles from "./styles.module.scss";
import { ModalContext } from "@/context/ModalContext";
import { GridLoader } from "react-spinners";
import DataTable from "@/components/DataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { getUnitLabel, formatPrice } from "@/helpers/Utils";


const columns: GridColDef[] = [
  {
    field: "name_product",
    headerName: "Nombre",
    width: 200,
    type: "string",
  },
  {
    field: "description",
    headerName: "Descripción",
    width: 300,
    type: "string",
  },
  {
    field: "sale_price",
    headerName: "Precio Ven",
    width: 100,
    type: "string",
  },
  {
    field: "measure_unit",
    headerName: "Unidades",
    width: 100,
    type: "string",
  },
  {
    field: "stock",
    headerName: "Stock",
    width: 100,
    type: "number",
  },
  {
    field: "is_active",
    headerName: "Activo",
    width: 180,
    type: "boolean",
  },
];

function Products() {
  const { setSelectedProduct, setProducts, products } = useContext(ProductContext);
  const { setOpen, setId } = useContext(ModalContext);


  const { data, isLoading } = useQuery(["products"], getAllProductsAPI, {
    onSuccess: (data) => {
      setProducts(data);
    },
  });

  const rows =
      products?.map((product: Product) => ({
        id: product.id,
        name_product: product.name_product,
        description: product.description,
        measure_unit: getUnitLabel(product.measure_unit),
        sale_price: formatPrice(product.sale_price),
        stock: product.stock,
        is_active: product.is_active,
      })) || [];

  const handleClick = (id: string) => {
    const product = products?.find((product) => product.id === id);
    if (product) {
      setSelectedProduct(product);
    }
    if (setId) {
      setOpen(true);
      setId("detailsProduct");
    }
  };

  return (
      <div className={styles.container}>
        {isLoading ? (
            <div className={styles.loading}>
              <GridLoader color="#1E9189" loading={isLoading} size={180} />
            </div>
        ) : (
            <div>
              <div className={styles.containerTittle}>
                <p className={styles.tittleList}>Lista Productos</p>
              </div>
                  <div className="py-3 mx-2">
                    <DataTable
                        slug="products"
                        columns={columns}
                        rows={rows}
                        pagination={10}
                        handleRow={(params) => handleClick(params)}
                    />
                  </div>
            </div>
        )}
      </div>
  )
}

export default Products