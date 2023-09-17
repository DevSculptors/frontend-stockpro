"use client";
import React, { FormEvent, useContext, useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import styles from "./styles.module.scss";

import { ModalContext } from "@/context/ModalContext";
import { CategoryContext } from "@/context/CategoryContext";

import {Category} from "@/interfaces/Category"
import { updateCategoryAPI } from "@/api/Category";

import { ToasterEdit, ToasterError } from "@/helpers/useToaster";

function EditCategoryDialog() {
    const queryClient = useQueryClient();

    const updateCategoryMutation = useMutation({
        mutationFn: updateCategoryAPI,
        onSuccess: () => {
            queryClient.invalidateQueries(["category"]);
            ToasterEdit("Categoria editada correctamente");
            setOpen(false);
        },
        onError: (error: any) => {
          error.response.data.forEach((error: any) => {
            ToasterError(error.message);
          });
        }
    });

  const { setOpen } = useContext(ModalContext);

  const { selectedCategory, setSelectedCategory } = useContext(CategoryContext);
  

  const handleChange = ({ target: { name, value } }: any) => {
      if (name=="is_active"){
          value=="true"?value=true:value=false;
      }
    setSelectedCategory((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const onSubmit = async (e:  FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateCategoryMutation.mutate(selectedCategory as Category)
  };

  const onCancel = () => {
    console.log("click en cancelar");
    setOpen(false);
  };
  const state =[
        { value: "true", label: 'Activo' },
        { value: "false", label: 'Inactivo' }
  ]
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.descriptionContainer}>
        <h2>Editar Categoria</h2>
      </div>
      <div className="my-[10px]">
        <div className={styles.inputContainer}>
          <label htmlFor="name" className={styles.label}>
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Ingrese nombre de la categoria"
            value={selectedCategory?.name}
            onChange={handleChange}
            required
          />
        </div >
        <div className={styles.inputContainer}>
            <label htmlFor="description" className={styles.label}>
                Descripción
            </label>
            <input
                type="text"
                id="description"
                name="description"
                placeholder="Ingrese descripción de la marca"
                value={selectedCategory?.description}
                onChange={handleChange}
                required
            />
        </div>
          <div className={styles.listBox}>
              <label htmlFor="is_active">Estado</label>
              <select name="is_active" id="is_active" onChange={handleChange}
                      value={(selectedCategory?.is_active)?"true":"false"}>
                  {state.map((type) => (
                      <option key={type.value} value={type.value}>
                          {type.label}
                      </option>
                  ))}
              </select>
          </div>
      </div>
      <div className="my-[10px]">
          <button className={styles.submitButton}>Editar</button>
          <button
          onClick={onCancel}
          className={styles.cancelButton}
          type="button"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default EditCategoryDialog;
