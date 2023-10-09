"use client";
import React, { FormEvent, useContext, useState, useEffect } from "react";
import { SaleContext } from "@/context/SaleContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSaleAPI } from "@/api/Sale";
import { SaleCreate, ProductBuySale } from "@/interfaces/Sale";
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
import { formatPrice, formatDate } from "@/helpers/Utils";
import { BsFillTrashFill } from "react-icons/bs";

import { useRouter } from "next/navigation";

function Cash() {
  // const router = useRouter();

  // const { setProductsBuy, productsBuy } = useContext(SaleContext);
  // const [inputDisabled, setInputDisabled] = useState(false);
  // const [productName, setProductName] = useState("");
  // const [selectedProduct, setSelectedProduct] = useState<Product>();
  const { setClients, clients } = useContext(ClientContext);
  // const { products, setProducts } = useContext(ProductContext);

  // const [createSaleBuyFields, setCreateSaleBuyFields] = useState<SaleCreate>();
  // const [productBuy, setproductBuy] = useState<ProductBuySale>();

  // const [user_id, setUser_id] = useState("");


  // useEffect(() => {
  //   const storedUserId = sessionStorage.getItem("user_id");
  //   if (storedUserId) {
  //     setUser_id(storedUserId);
  //   }
  // }, [])

  // const {} = useQuery(["product"], getAllProductsAPI, {
  //   onSuccess: (data) => {
  //     setProducts(data);
  //   },
  // });

  const { isLoading: isLoading } = useQuery(["clients"], getAllPersons, {
    onSuccess: (data) => {
      setClients(data);
    },
  });

  // const columns: GridColDef[] = [
  //   {
  //     field: "name_product",
  //     headerName: "Nombre",
  //     width: 300,
  //     type: "string",
  //   },
  //   {
  //     field: "brand",
  //     headerName: "Marca",
  //     width: 150,
  //     type: "string",
  //   },
  //   {
  //     field: "category",
  //     headerName: "Categoria",
  //     width: 150,
  //     type: "string",
  //   },
  //   {
  //     field: "amount_product",
  //     headerName: "Cantidad",
  //     width: 100,
  //     type: "number",
  //   },
  //   {
  //     field: "sale_price",
  //     headerName: "Precio venta",
  //     width: 200,
  //     type: "string",
  //   },
  //   {
  //     field: "acciones",
  //     headerName: "Acciones",
  //     width: 150,
  //     renderCell: (params) => (
  //         <div className="flex justify-center align">
  //           <button
  //               type="button"
  //               className={styles.buttonCancel}
  //               onClick={() => handleDelete(params.row.id)}
  //           > Eliminar 
  //             <BsFillTrashFill />
  //           </button>
  //         </div>
  //     ),
  //   },
  // ];


  // const queryClient = useQueryClient();

  // const addBuySale = useMutation({
  //   mutationFn: createSaleAPI,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["sales"]);
  //     ToasterSucess("Venta registrada correctamente");
  //     router.push("/cashier/sale");
  //   },
  //   onError: (error: any) => {
  //     console.log(error);
  //   },
  // });

  // const handleDelete = (id: string) => {
  //   const updatedProductsBuy = productsBuy?.filter((product) => {
  //     return product.product.id !== id;
  //   });
  //   setProductsBuy(updatedProductsBuy);
  // };

  // const sale_details =
  //     productsBuy?.map((product: any) => ({
  //       id: product.product.id,
  //       amount_product: Number(product.quantity),
  //     })) || [];


  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   //Crear venta
  // };

  // const handleChange = ({ target: { name, value } }: any) => {
  //   console.log("Fecha " + new Date());
  //   setCreateSaleBuyFields((prevValues: any) => ({
  //     ...prevValues,
  //   }));
  // };

  // const rows =
  //     productsBuy?.map((product) => ({
  //       id: product.product.id,
  //       name_product: product.product.name_product,
  //       brand: product.product.brand.name,
  //       category: product.product.category.name,
  //       amount_product: product.amount_product,
  //       sale_price: formatPrice(product.product.sale_price),
  //     })) || [];

  // const handleChangeSearch = ({ target: { name, value } }: any) => {
  //   if (name === "productSearch") {
  //     setProductName(value);
  //     setSelectedProduct(undefined);
  //   }
  //   setproductBuy((prevValues: any) => ({
  //     ...prevValues,
  //     [name]: value,
  //     product: selectedProduct,
  //   }));

  // };
  // const addProduct = (id: string) => {
  //   //Agregar el producto a la tabla
  // };
  // const handleSelectProduct = () => {

  // };

  // const onCancel = () => {
  //     removeInputs();
  // };
  // const removeInputs = () => {
  // };
  return (
      <div className={styles.container}>
        {isLoading ? (
            <div className={styles.loading}>
              <GridLoader color="#1E9189" loading={isLoading} size={180} />
            </div>
        ) : (
            <div className={styles.container}>
              {/** Tengo 1 problema
               No tocar
               Yo puedo
               Claro que si

               <div className={styles.containerTittle}>
                    <p className={styles.tittleList}>Registrar Venta</p>
                  </div>
                  <div>
                    <div className="my-[10px] grid grid-cols-2 gap-4">
                      <div className={`${styles.listBox} ml-4`}>
                        <label htmlFor="person_id">Seleccione Cliente</label>
                        <select
                            name="person_id"
                            id="person_id"
                            onChange={handleChange}
                            required
                        >
                          <option hidden>Seleccione el Cliente</option>
                          {clients?.map((type) => (
                              <option key={type.id} value={type.id}>
                                {type.name} {type.last_name}
                              </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <form onSubmit={handleSelectProduct} className="my-[10px] grid grid-cols-4 gap-4">
                      <div id="searchElemnts">
                        <div className={styles.inputConainerTest}>
                          <label htmlFor="productSearchL" className={styles.label}>
                            Buscar Producto
                          </label>
                          <select>

                          </select>
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
                            max={selectedProduct?.stock ?? 10}
                            min="1"
                            required
                        />
                      </div>
                      <div className="my-[10px]">
                        <button
                            className={styles.buttonCreate}
                            type="submit">
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
                    </form>
                  </div>
              <form onSubmit={handleSubmit}>
              
                {productsBuy && productsBuy.length > 0 ? (
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
                      <div>
                        <h1>Total de la compra:</h1>
                        <h3>Total de productos: 14</h3>
                      </div>
                      <div>
                        <button type="submit" className={styles.buttonCreate}>
                          Registrar Compra
                        </button>
                      </div>
                    </div>
                ) : null}
              </form>
              */}
            </div>
            )}
        </div>
  )
}

export default Cash;