"use client";
import { Form } from "@/components/Form";
import React, { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";
import { CategoryContext } from "@/context/CategoryContext";
import { BrandContext } from "@/context/BrandContext";

import {useQueryClient, useMutation, useQuery} from "@tanstack/react-query";

import { createProductAPI } from "@/api/Products";
import { ToasterSucess, ToasterError } from "@/helpers/useToaster";

import {getAllCategoriesAPI} from "@/api/Category";
import {getAllBrandsAPI} from "@/api/Brand";

function CreateProductDialog() {
  const { setOpen } = useContext(ModalContext);

  const queryClient = useQueryClient();

  const addProductMutation = useMutation({
    mutationFn: createProductAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["product"]);
      setOpen(false);
      ToasterSucess("Producto creado exitosamente");
    },
    onError: (error: any) => {
      console.log(error.response.data);
      error.response.data.forEach((error: any) => {
        ToasterError(error.message);
      });
    },
  });

  const { setBrands, brands } = useContext(BrandContext);
  const { setCategories, category } = useContext(CategoryContext);

  const {} = useQuery(["category"], getAllCategoriesAPI, {
    onSuccess: (data) => {
      setCategories(data);
    },
  });
  const {} = useQuery(["brands"], getAllBrandsAPI, {
    onSuccess: (data) => {
      setBrands(data);
    },
  });

  const onSubmit = (formData: any) => {
    console.log("formData", formData);
    addProductMutation.mutate({
      ...formData,
      isActive: true,
    });
  };

  const onCancel = () => {
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
    <Form title="Añadir Producto" onSubmit={onSubmit}>
      <div className="my-[10px] grid grid-cols-2 gap-4">
        <Form.InputRequired
            name="name_product"
            label="Nombre"
            placeholder="Ingresa el nombre"
            type="text"
        />
        <Form.ListBox
            name="measure_unit"
            placeholder="Seleccione la unidad de medida"
            label="Unidad de medida"
            options={measureTypes}
        />
        <Form.InputRequired
          name="sale_price"
          label="Precio de venta"
          placeholder="Ingresa precio de venta"
          type="number"
        />
        <Form.ListBox
            name="brand_id"
            placeholder="Seleccione la marca"
            label="Marca"
            options={brands}
        />
        <Form.ListBox
            name="category_id"
            placeholder="Seleccione la categoria"
            label="Categoria"
            options={category}
        />
        <Form.InputRequired
          name="description"
          label="Descripción"
          placeholder="Ingresa la descripción"
          type="text"
        />
      </div>
      <div className="my-[10px] grid grid-cols-2 gap-4">
        <Form.CancelButton buttonText="Cancelar" onClick={onCancel} />
        <Form.SubmitButton buttonText="Aceptar" />
      </div>
    </Form>
  );
}

interface RegisterFields {
  type_document?: string;
  id_document?: string;
  name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  username?: string;
  password?: string;
  rol?: string;
}

export default CreateProductDialog;
