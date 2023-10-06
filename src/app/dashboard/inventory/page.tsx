"use client";
import React, { useState, useContext } from "react";
import ReactPaginate from "react-paginate";
import { useQuery } from "@tanstack/react-query";
import { getAllProductsAPI } from "@/api/Products";
import { ProductContext } from "@/context/ProductContext";
import { Product } from "@/interfaces/Product";
import { ModalContext } from "@/context/ModalContext";
import { Card } from "@/components/Catalog/Card";
import styles from "./styles.module.scss";

import { GridLoader } from "react-spinners";
import DataTable from "@/components/DataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";

import { getUnitLabel, formatPrice } from "@/helpers/Utils";

const columns: GridColDef[] = [
  {
    field: "name_product",
    headerName: "Nombre",
    width: 250,
    type: "string",
  },
  {
    field: "brand",
    headerName: "Marca",
    width: 200,
    type: "string",
  },
  {
    field: "category",
    headerName: "Categoria",
    width: 200,
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
    width: 80,
    type: "number",
  },
  {
    field: "is_active",
    headerName: "Activo",
    width: 100,
    type: "boolean",
  },
];

function Inventory() {
  const { setOpen, setId } = useContext(ModalContext);

  const { setSelectedProduct, setProducts, products } =
    useContext(ProductContext);

  const { data, isLoading } = useQuery(["products"], getAllProductsAPI, {
    onSuccess: (data) => {
      setProducts(data);
    },
  });

  const handleClick = (id: string) => {
    const product = products?.find((product) => product.id === id);
    if (product) {
      setSelectedProduct(product);
    }
    if (setId) {
      setOpen(true);
      setId("editProduct");
    }
  };

  const rows =
    products?.map((product: Product) => ({
      id: product.id,
      name_product: product.name_product,
      brand: product.brand.name,
      category: product.category.name,
      measure_unit: getUnitLabel(product.measure_unit),
      sale_price: formatPrice(product.sale_price),
      stock: product.stock,
      is_active: product.is_active,
    })) || [];

  // Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products?.slice(itemOffset, endOffset);

  const size = data ? data.length : products ? products.length : 0;

  const pageCount = Math.ceil(size / itemsPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % size;

    setItemOffset(newOffset);
  };

  //Modo table
  const [modeTable, setModeTable] = useState(false);

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
            <div>
              <button
                className={styles.buttonTable}
                onClick={() => {
                  setModeTable((prevMode) => !prevMode); // Alternar el valor actual
                }}
              >
                {modeTable ? "Modo Tarjeta" : "Modo Tabla"}
              </button>
            </div>
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
          {modeTable ? (
            <div className="py-3 mx-2">
              <DataTable
                slug="products"
                columns={columns}
                rows={rows}
                pagination={10}
                handleRow={(params) => handleClick(params)}
              />
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]  gap-4">
                {currentItems?.map((product: Product) => (
                  <Card
                    key={product.id}
                    index={product.id}
                    name={product.name_product}
                    description={product.description}
                    units={
                      product.stock + " " + getUnitLabel(product.measure_unit)
                    }
                    price={product.sale_price}
                    category={product.category.name}
                    brand={product.brand.name}
                    isActive={product.is_active}
                    handleClick={(params) => handleClick(params)}
                  />
                ))}
              </div>
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                containerClassName={styles.pagination}
                pageLinkClassName={styles.page_num}
                previousClassName={styles.page_num}
                nextClassName={styles.page_num}
                activeClassName={styles.active}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Inventory;
