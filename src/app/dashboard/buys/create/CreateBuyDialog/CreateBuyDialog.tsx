"use client";
import React, { useContext, useState, useEffect } from "react";
import { InventoryContext } from "@/context/InventoryContext";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ProductBuyInventory } from "@/interfaces/Inventory";
import { ToasterSucess, ToasterError } from "@/helpers/useToaster";
import { getAllProductsAPI } from "@/api/Products";
import { Product } from "@/interfaces/Product";
import { ModalContext } from "@/context/ModalContext";

import styles from "../style.module.scss";
import { GridLoader } from "react-spinners";

function CreateBuyDialog() {

  const {setProductsBuy, productsBuy} = useContext(InventoryContext);

  const [selectedProduct, setSelectedProduct] = useState<Product>();

  const [productBuy, setproductBuy] = useState<ProductBuyInventory>();

  const [inputDisabled, setInputDisabled] = useState(false);

  const [productName, setProductName] = useState("");

  const { setOpen } = useContext(ModalContext);

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

  const handleChange = ({ target: { name, value } }: any) => {
    if (name === "productSearch") {
      setProductName(value);
      setSelectedProduct(undefined);
    }
    setproductBuy((prevValues: any) => ({
      ...prevValues,
      [name]: value,
      product: selectedProduct,
    }));
  };

  const addProduct = (product: Product) => {
    const isProductAlreadyAdded = productsBuy?.some(
      (productBuy) => productBuy.product.id === product.id
    );
    if (isProductAlreadyAdded) {
      ToasterError("El producto ya se encuentra agregado");
      return;
    }
    setProductName(product.name_product);
    setInputDisabled(true);
    setSelectedProduct(product);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedProduct) {
      setproductBuy((prevValues: any) => ({
        ...prevValues,
        id: selectedProduct.id,
        product: selectedProduct,
      }));

      setProductsBuy((prevValues: any) => [...prevValues, productBuy]);
      setOpen(false);
      ToasterSucess("Producto agregado correctamente");      
    } else {
      ToasterError("Debe seleccionar un producto");
    }
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
          <div className={styles.inputConainerTest}>
            <label htmlFor="productSearch" className={styles.label}>
              Buscar Producto
            </label>
            <input
              type="text"
              id="productSearch"
              name="productSearch"
              placeholder="Buscar..."
              value={productName}
              onChange={handleChange}
              disabled={inputDisabled}
              autoComplete="off"
              required
            />
          </div>
          <div className={styles.containerSearch}>
            <ul>
              {productName &&
                filteredProducts.map((product) => (
                  <li
                    key={product.id}
                    className={
                      selectedProduct && selectedProduct.id === product.id
                        ? styles.hidden
                        : ""
                    }
                  >
                    <button type="button" onClick={() => addProduct(product)}>
                      {product.name_product}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
          <div className={styles.inputConainerTest}>
            <label htmlFor="quantity" className={styles.label}>
              Cantidad
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              placeholder="Ingrese la cantidad de productos"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputConainerTest}>
            <label htmlFor="due_date" className={styles.label}>
              Fecha vencimiento
            </label>
            <input
              type="date"
              id="due_date"
              name="due_date"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputConainerTest}>
            <label htmlFor="purchase_unit_price" className={styles.label}>
              Valor de compra
            </label>
            <input
              type="number"
              id="purchase_unit_price"
              name="purchase_unit_price"
              onChange={handleChange}
              required
            />
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
