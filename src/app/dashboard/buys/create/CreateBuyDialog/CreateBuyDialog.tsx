"use client";
import React, { useContext, useState, ChangeEvent } from "react";
import { InventoryContext } from "@/context/InventoryContext";
import { useQuery } from "@tanstack/react-query";
import { createInventory } from "@/api/Inventory";
import { InventoryCreate } from "@/interfaces/Inventory";
import { ToasterSucess, ToasterError } from "@/helpers/useToaster";
import SearchBar from "@/components/SearchBar/SearchBar";
import { ProductContext } from "@/context/ProductContext";
import { getAllProductsAPI } from "@/api/Products";
import { Product } from "@/interfaces/Product";
import { ModalContext } from "@/context/ModalContext";

import styles from "../style.module.scss";
import { GridLoader } from "react-spinners";

function CreateBuyDialog() {
  const [productName, setProductName] = useState("");
  const [inputDisabled, setInputDisabled] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  const { setOpen, setId } = useContext(ModalContext);
  // Hay que arreglar este Context
  const { setProductsBuy, productsBuy } = useContext(InventoryContext);

  const { data: products, isLoading } = useQuery(
    ["products"],
    getAllProductsAPI
  );

  const filteredProducts =
    (products &&
      products
        .filter((product) =>
          product.name_product.toLowerCase().includes(productName.toLowerCase())
        )
        .slice(0, 4)) ||
    [];

  const handleProductNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const addProduct = (product: Product) => {
    console.log("addProduct");
    // console.log(product);
    setProductName(product.name_product);
    setInputDisabled(true);
    setSelectedProduct(product.id);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };

  const onCancel = () => {
    setOpen(false);
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loading}>
          <GridLoader color="#1E9189" loading={isLoading} size={180} />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.containerTittle}>
            <p className={styles.tittleList}>Agregar Producto a la Compra</p>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="productSearch" className={styles.label}>
              Buscar Producto
            </label>
            <input
              type="text"
              id="productSearch"
              name="productSearch"
              placeholder="Buscar..."
              value={productName}
              onChange={handleProductNameChange}
              disabled={inputDisabled}
            />
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => {
                setInputDisabled(false);
                setProductName("");
                setSelectedProduct("");
              }}
            >
              X
            </button>
          </div>
          <div className={styles.containerSearch}>
            <ul>
              {productName &&
                filteredProducts.map((product) => (
                  <li
                    key={product.id}
                    className={
                      selectedProduct && selectedProduct === product.id ? styles.hidden : ""
                    }
                  >
                    <button type="button" onClick={() => addProduct(product)}>
                      {product.name_product}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
          <div className="my-[10px]">
            <button className={styles.submitButton}>Agregar Producto</button>
            <button
              onClick={onCancel}
              className={styles.cancelButton}
              type="button"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default CreateBuyDialog;
