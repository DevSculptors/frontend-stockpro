"use client";
import React, { FormEvent, useContext, useState, useEffect } from "react";
import { InventoryContext } from "@/context/InventoryContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createInventoryAPI } from "@/api/Inventory";
import { InventoryCreate } from "@/interfaces/Inventory";
import { ToasterSucess, ToasterError } from "@/helpers/useToaster";
import { ModalContext } from "@/context/ModalContext";
import { Loader } from "@/components/Loader";

import styles from "./style.module.scss";

import DataTable from "@/components/DataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";

import { ClientContext } from "@/context/ClientContext";
import { getAllPersons } from "@/api/Clients";

import { formatPrice } from "@/helpers/Utils";
import { BsFillTrashFill } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { useRouter } from "next/navigation";

import { useLoading } from "@/hook/useLoading";

function CreateBuyInventory() {
  const router = useRouter();

  const { finishLoading, isLoading: loadingHook, startLoading } = useLoading();

  const { setOpen, setId } = useContext(ModalContext);
  const { setProductsBuy, productsBuy } = useContext(InventoryContext);

  const { clients, setClients } = useContext(ClientContext);

  const [createInventoryBuyFields, setCreateInventoryBuyFields] =
    useState<InventoryCreate>();

  const { isLoading } = useQuery(["client"], getAllPersons, {
    onSuccess: (data) => {
      setClients(data);
    },
  });

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
      field: "quantity",
      headerName: "Cantidad",
      width: 100,
      type: "number",
    },
    {
      field: "due_date",
      headerName: "Fecha Vencimiento",
      width: 150,
      type: "string",
    },
    {
      field: "purchase_unit_price",
      headerName: "Costo Unitario",
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
          >
            Eliminar-
            <BsFillTrashFill />
          </button>
        </div>
      ),
    },
  ];

  const queryClient = useQueryClient();

  const addBuyInventory = useMutation({
    mutationFn: createInventoryAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["inventory"]);
      ToasterSucess("Compra registrada correctamente");
      router.push("/dashboard/buys");
    },
    onError: (error: any) => {
      ToasterError("Error al registrar la compra");
      console.log(error);
    },
  });

  const handleDelete = (id: string) => {
    const updatedProductsBuy = productsBuy?.filter((product) => {
      return product.product.id !== id;
    });
    setProductsBuy(updatedProductsBuy);
  };

  const totalProducts = productsBuy?.reduce((acc, product) => {
    return acc + Number(product.quantity);
  }, 0);

  const totalPrice =
    productsBuy?.reduce((acc, product) => {
      return (
        acc + Number(product.purchase_unit_price) * Number(product.quantity)
      );
    }, 0) || 0;

  const purchase_details =
    productsBuy?.map((product: any) => ({
      product_id: product.product.id,
      quantity: Number(product.quantity),
      due_date: new Date(product.due_date),
      purchase_unit_price: Number(product.purchase_unit_price),
    })) || [];

  // useEffect(() => {
  //   const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  //     event.preventDefault();

  //     event.returnValue = "";

  //     const confirmationMessage =
  //       "Tiene cambios sin guardar. Estás seguro que quieres irte?";
  //     event.returnValue = confirmationMessage;
  //     return confirmationMessage;
  //   };
  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  const [user_id, setUser_id] = useState("");

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("user_id");
    if (storedUserId) {
      setUser_id(storedUserId);
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startLoading();
    addBuyInventory.mutate({
      ...createInventoryBuyFields,
      user_id: user_id,
      purchase_detail: purchase_details,
    });
    finishLoading();
  };

  const handleChange = ({ target: { name, value } }: any) => {
    const transformedValue = name === "date_purchase" ? new Date(value) : value;
    console.log(transformedValue);

    setCreateInventoryBuyFields((prevValues: any) => ({
      ...prevValues,
      [name]: transformedValue,
    }));
  };

  const rows =
    productsBuy?.map((product) => ({
      id: product.product.id,
      name_product: product.product.name_product,
      brand: product.product.brand.name,
      category: product.product.category.name,
      quantity: product.quantity,
      due_date: product.due_date,
      purchase_unit_price: formatPrice(product.purchase_unit_price),
    })) || [];

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div>
          <div className={styles.containerTittle}>
            <p className={styles.tittleList}>Registrar Compra</p>
            <div>
              <button
                type="button"
                className={styles.submitButton}
                onClick={() => {
                  router.push("/dashboard/buys");
                }}
              >
                <AiOutlineArrowLeft />
                Atras
              </button>
            </div>
          </div>
          <div className="my-[10px] grid grid-cols-2 gap-4">
            <div className={`${styles.inputConainerTest} mr-4`}>
              <label htmlFor="date_purchase" className={styles.label}>
                Fecha de Compra
              </label>
              <input
                type="date"
                id="date_purchase"
                name="date_purchase"
                onChange={handleChange}
                required
              />
            </div>
            <div className={`${styles.listBox} ml-4`}>
              <label htmlFor="person_id">Seleccione Proveedor</label>
              <select
                name="person_id"
                id="person_id"
                onChange={handleChange}
                required
              >
                <option hidden>Seleccione el Proveedor</option>
                {clients?.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name} {type.last_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="my-[10px] grid grid-cols-2 gap-11 ">
            <button
              type="button"
              className={`${styles.buttonCreate} mr-4`}
              onClick={() => {
                if (setId) {
                  setOpen(true);
                  setId("addBuy");
                }
              }}
            >
              Agregar Producto
            </button>
            <button
              type="button"
              className={`${styles.submitButton} ml-4`}
              onClick={() => {
                if (setId) {
                  setOpen(true);
                  setId("addProduct");
                }
              }}
            >
              Registrar Nuevo Producto
            </button>
          </div>
        </div>
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
              <button
                type="submit"
                className={styles.buttonCreate}
                disabled={loadingHook}
              >
                {loadingHook ? <Loader /> : "Registrar Compra"}
              </button>
            </div>
          </div>
        ) : null}
      </form>
    </div>
  );
}

export default CreateBuyInventory;
