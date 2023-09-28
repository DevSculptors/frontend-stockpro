"use client";
import React, { useState, useEffect, useContext } from "react";
import ReactPaginate from "react-paginate";
import { useQuery } from "@tanstack/react-query";
import { getAllProductsAPI } from "@/api/Products";
import { ProductContext } from "@/context/ProductContext";
import { Product } from "@/interfaces/Product";
import { ModalContext } from "@/context/ModalContext";
import { Card } from "@/components/Catalog/Card";

import styles from "./styles.module.scss";

import { GridLoader } from "react-spinners";

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
  const measureTypes = [
    {
      value: "KG",
      label: "Kilogramos",
    },
    {
      value: "UNITS",
      label: "Unidades",
    },
    {
      value: "LITERS",
      label: "Litros",
    },
    {
      value: "POUNDS",
      label: "Libras",
    },
  ];

  const getUnitLabel = (value: string) => {
    const found = measureTypes.find((type) => type.value === value);
    return found ? found.label : "Unknown";
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
          <div className="my-[10px] grid grid-cols-3 gap-3">
            {currentItems?.map((product: Product) => (
              <Card
                key={product.id}
                index={product.id}
                name={product.name_product}
                description={product.description}
                units={product.stock + " " + getUnitLabel(product.measure_unit)}
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
  );
}

export default Inventory;
