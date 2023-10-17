"use client";
import React, { FormEvent, useContext, useState, useRef, useEffect } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import styles from "./styles.module.scss";

import { ModalContext } from "@/context/ModalContext";
import { BrandContext } from "@/context/BrandContext";

import {Brand} from "@/interfaces/Brand"
import { updateBrandAPI } from "@/api/Brand";

import { ToasterEdit, ToasterError } from "@/helpers/useToaster";

function EditBrandDialog() {
    const queryClient = useQueryClient();

    const updateBrandMutation = useMutation({
        mutationFn: updateBrandAPI,
        onSuccess: () => {
            queryClient.invalidateQueries(["brand"]);
            ToasterEdit("Marca editada correctamente");
            setOpen(false);
        },
        onError: (error: any) => {
          error.response.data.forEach((error: any) => {
            ToasterError(error.message);
          });
        }
    });

  const { setOpen } = useContext(ModalContext);

  const { selectedBrand, setSelectedBrand } = useContext(BrandContext);
  const ref = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.style.height = "auto";
            ref.current.style.height = `${ref.current.scrollHeight }px`;
        }
    });


    const handleChange = ({ target: { name, value } }: any) => {
      if (name=="is_active"){
          value=="true"?value=true:value=false;
      }
    setSelectedBrand((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };
    const handleChangeTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (ref.current) {
            ref.current.style.height = "auto";
            ref.current.style.height = `${event.target.scrollHeight +6}px`;
        }
        const { value } = event.target;
        setSelectedBrand((prevValues: any) => ({
            ...prevValues,
            ['description']: value,
        }));
    };
  const onSubmit = async (e:  FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateBrandMutation.mutate(selectedBrand as Brand)
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
        <h2>Editar Marca</h2>
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
            placeholder="Ingrese nombre de la marca"
            value={selectedBrand?.name}
            onChange={handleChange}
            required
          />
        </div >
        <div className={styles.inputContainer}>
            <label htmlFor="description" className={styles.label}>
                Descripción
            </label>
            <textarea
                id="description"
                name="description"
                onInput={handleChangeTextArea}
                value={selectedBrand?.description}
                ref={ref}
                required
            />
        </div>
          <div className={styles.listBox}>
              <label htmlFor="is_active">Estado</label>
              <select name="is_active" id="is_active" onChange={handleChange}
                      value={(selectedBrand?.is_active)?"true":"false"}>
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

export default EditBrandDialog;
