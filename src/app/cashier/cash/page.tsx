"use client";
import React, { FormEvent, useContext, useState, useEffect, useRef } from "react";
import { SaleContext } from "@/context/SaleContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSaleAPI } from "@/api/Sale";
import { SaleCreate, ProductDetailSale} from "@/interfaces/Sale";
import { ToasterSucess, ToasterError } from "@/helpers/useToaster";

import styles from "./styles.module.scss";

import { GridLoader } from "react-spinners";
import DataTable from "@/components/DataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";

import { ClientContext } from "@/context/ClientContext";
import { getAllPersons } from "@/api/Clients";

import { ProductContext } from "@/context/ProductContext";
import { getAllProductsAPI } from "@/api/Products";
import { Product } from "@/interfaces/Product";
import { Client } from "@/interfaces/Client";
import { formatPrice, formatDate } from "@/helpers/Utils";
import { BsFillTrashFill } from "react-icons/bs";

function Cash() {

  const [inputDisabled, setInputDisabled] = useState(false);
  const [productName, setProductName] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const { setClients, clients } = useContext(ClientContext);
  const { products, setProducts } = useContext(ProductContext);
  const [inputAmount, setInputAmount] = useState('');

  const [createSaleFields, setCreateSaleFields] = useState<SaleCreate>();
  const {setProductsSale, productsSale } = useContext(SaleContext);
  const [productSale, setProductSale] = useState<ProductDetailSale>();

  const [user_id, setUser_id] = useState("");


  useEffect(() => {
    const storedUserId = sessionStorage.getItem("user_id");
    if (storedUserId) {
      setUser_id(storedUserId);
    }
  }, [])

  const {} = useQuery(["product"], getAllProductsAPI, {
    onSuccess: (data) => {
      setProducts(data);
    },
  });

  const { isLoading } = useQuery(["clients"], getAllPersons, {
    onSuccess: (data) => {
      setClients(data);
    },
  });

  const defaultClient = clients?.find(client => client.name === 'Varios');

  const columns: GridColDef[] = [
    {
      field: "name_product",
      headerName: "Nombre",
      width: 300,
      type: "string",
    },
    {
      field: "brand",
      headerName: "Marca",
      width: 150,
      type: "string",
    },
    {
      field: "category",
      headerName: "Categoria",
      width: 150,
      type: "string",
    },
    {
      field: "amount_product",
      headerName: "Cantidad",
      width: 100,
      type: "number",
    },
    {
      field: "sale_price",
      headerName: "Precio venta",
      width: 200,
      type: "string",
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => (
          <div className="flex justify-center align">
            <button
                type="button"
                className={styles.buttonCancel}
                onClick={() => handleDelete(params.row.id)}
            > Eliminar 
              <BsFillTrashFill />
            </button>
          </div>
      ),
    },
  ];


  const queryClient = useQueryClient();

  const addSale = useMutation({
    mutationFn: createSaleAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["sales"]);
      ToasterSucess("Venta registrada correctamente");
    },
    onError: (error: any) => {
      ToasterError("Error al registrar la venta");
      console.log(error);
    },
  });

  const handleDelete = (id: string) => {
    const updatedProductsSale = productsSale?.filter((product) => {
      return product.product.id !== id;
    });
    setProductsSale(updatedProductsSale);
  };
  const products_details =
      productsSale?.map((product: any) => ({
        id: product.product.id,
        amount_product: Number(product.amount_product),
      })) || [];
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addSale.mutate({
      id_client:defaultClient?.id,
      id_user: user_id,
      date_sale: new Date(),
      products: products_details,
      price_sale:totalPrice,
    });
    handleCleanInputs();
  };
  const handleCleanInputs =() =>{
    removeInputs();
    totalPrice:0;
    totalProducts:0;
    setProductsSale([]);

  };
  const totalProducts = products_details?.reduce((acc, product) => {
    return acc + Number(product.amount_product);
  }, 0);

  const totalPrice =
      productsSale?.reduce((acc, product) => {
        return (
            acc + Number(product.product.sale_price) * Number(product.amount_product)
        );
      }, 0) || 0;
  const handleChange = ({ target: { name, value } }: any) => {
    setCreateSaleFields((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const rows =
      productsSale?.map((product) => ({
        id: product.product.id,
        name_product: product.product.name_product,
        brand: product.product.brand.name,
        category: product.product.category.name,
        amount_product: product.amount_product,
        sale_price: formatPrice(product.product.sale_price),
      })) || [];

  const handleChangeSearch = ({ target: { name, value } }: any) => {
    if (name === "productSearch") {
      setProductName(value);
      setSelectedProduct(undefined);
    }
    setProductSale((prevValues: any) => ({
      ...prevValues,
      [name]: value,
      product: selectedProduct,
    }));

  };
  const addProduct = (product: Product) => {
    const isProductAlreadyAdded = productsSale?.some(
      (productsSale) => productsSale.product.id === product.id
    );
    if (isProductAlreadyAdded) {
      ToasterError("El producto ya se encuentra agregado");
      return;
    }
    setProductName(product.name_product);
    setInputDisabled(true);
    setSelectedProduct(product);
  };
  const handleSelectProduct = () => {
    if (selectedProduct) {
      setProductSale((prevValues: any) => ({
        ...prevValues,
        id: selectedProduct.id,
        product: selectedProduct,
      }));
      setProductsSale((prevValues: any) => [...prevValues, productSale]);
      ToasterSucess("Producto agregado correctamente"); 
    } else {
      ToasterError("Debe seleccionar un producto");
    }
    removeInputs();
  };

  const onCancel = () => {
      removeInputs();
  };
  const removeInputs = () => {
    setInputDisabled(false);
    setProductName("");
    setSelectedProduct(undefined);
    (document.getElementById('amount_product') as HTMLInputElement).value='';
  };
  const filteredProducts =
    (products &&
      products
        .filter((product) =>
          product.name_product.toLowerCase().includes(productName.toLowerCase())
        )
        .slice(0, 4)) ||
    []; 
  return (
      <div className={styles.container}>
        {isLoading ? (
          <div className={styles.loading}>
          </div>
        ) : (
            <div className={styles.container}>
              <form onSubmit={handleSubmit}>
              <div className={styles.containerTittle}>
                    <p className={styles.tittleList}>Registrar Venta</p>
                <div className={styles.listBox}>
                  <label htmlFor="id_client">Categoria</label>
                  <select name="id_client" id="id_client" onChange={handleChange}
                          value={defaultClient?.id}
                  >
                    {clients?.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}{type.last_name}
                        </option>
                    ))}
                  </select>
                </div>
                  </div>
                  <div className="my-[10px] grid grid-cols-4 gap-4">
                    <div>
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
                            onChange={handleChangeSearch}
                            disabled={inputDisabled}
                            autoComplete="off"
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
                    </div>
                    <div className={styles.inputConainerTest}>
                      <label htmlFor="amount_product" className={styles.label}>
                        Cantidad
                      </label>
                      <input
                          type="number"
                          id="amount_product"
                          name="amount_product"
                          placeholder="Ingrese cantidad"
                          onChange={handleChangeSearch}
                          max={selectedProduct?.stock || 5}
                          min="1"
                      />
                    </div>
                    <div className="my-[10px]">
                      <button
                          onClick={handleSelectProduct}
                          className={styles.buttonCreate}
                          type="button">
                        Agregar
                      </button>
                    </div>
                    <div className="my-[10px]">
                      <button
                          onClick={onCancel}
                          className={styles.cancelButton}
                          type="button">
                        Cancelar
                      </button>
                    </div>
                  </div>
                {productsSale && productsSale.length > 0 ? (
                    <div>
                      <div>
                        <DataTable
                            slug="buys"
                            pagination={5}
                            columns={columns}
                            rows={rows}
                            handleRow={() => {}}
                        />
                      </div>
                      <div className="my-[10px] grid grid-cols-2 gap-4">
                        <div className={`${styles.inputConainerTest} mr-4`}>
                          <h3 className={styles.label}>Total de la compra:</h3>
                          <p className={styles.text}> {formatPrice(totalPrice)}</p>
                        </div>
                        <div className={`${styles.inputConainerTest} mr-4`}>
                          <h3 className={styles.label}>Total de productos:</h3>
                          <p className={styles.text}> {totalProducts}</p>
                        </div>
                      </div>
                      <div>
                        <button type="submit" className={styles.buttonCreate}>
                          Registrar Compra
                        </button>
                      </div>
                    </div>
                ) : null}
              </form>
            </div>
            )}
        </div>
  )
}

export default Cash;