"use client";
import React, { FormEvent, useContext, useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import styles from "./styles.module.scss";

import { ModalContext } from "@/context/ModalContext";
import { ClientContext } from "@/context/ClientContext";

import {documentTypes, Client} from "@/interfaces/Client"
import { updateClientAPI } from "@/api/Clients";

import { ToasterEdit, ToasterError } from "@/helpers/useToaster";

function EditClientDialog() {
    const queryClient = useQueryClient();

    const updateClientMutation = useMutation({
        mutationFn: updateClientAPI,
        onSuccess: () => {
            queryClient.invalidateQueries(["client"]);
            ToasterEdit("Cliente editado correctamente");
            setOpen(false);
        },
        onError: (error: any) => {
          error.response.data.forEach((error: any) => {
            ToasterError(error.message);
          });
        }
    });

  const { setOpen } = useContext(ModalContext);

  const { selectedClient, setSelectedClient } = useContext(ClientContext);
  

  const handleChange = ({ target: { name, value } }: any) => {
    setSelectedClient((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const onSubmit = async (e:  FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateClientMutation.mutate(selectedClient as Client)
  };

  const onCancel = () => {
    // console.log("click en cancelar");
    setOpen(false);
  };
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.descriptionContainer}>
        <h2>Editar Clientes</h2>
      </div>
      <div className="my-[10px] grid grid-cols-2 gap-4">
        <div className={styles.listBox}>
          <label htmlFor="type_document">Tipo de documento</label>
          <select name="type_document" id="type_document" onChange={handleChange}
          value={selectedClient?.type_document}
          >
            {documentTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
          <div className={styles.inputContainer}>
              <label htmlFor="id_document" className={styles.label}>
                  Documento
              </label>
              <input
                  type="text"
                  id="id_document"
                  name="id_document"
                  placeholder="Escribe tu Documento..."
                  value={selectedClient?.id_document}
                  onChange={handleChange}
                  required
              />
          </div>
        <div className={styles.inputContainer}>
          <label htmlFor="name" className={styles.label}>
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Escribe tu Nombre..."
            value={selectedClient?.name}
            onChange={handleChange}
            required
          />
        </div >
        <div className={styles.inputContainer}>
            <label htmlFor="last_name" className={styles.label}>
                Apellido
            </label>
            <input
                type="text"
                id="last_name"
                name="last_name"
                placeholder="Escribe tu Apellido..."
                value={selectedClient?.last_name}
                onChange={handleChange}
                required
            />
        </div>
        <div className={styles.inputContainer}>
            <label htmlFor="email" className={styles.label}>
                Celular
            </label>
            <input
                type="number"
                id="phone"
                name="phone"
                placeholder="Escribe tu Nueoeuu..."
                value={selectedClient?.phone}
                onChange={handleChange}
                required
            />
            </div>
      </div>
      <div className="my-[10px] grid grid-cols-2 gap-4">
        <button
          onClick={onCancel}
          className={styles.cancelButton}
          type="button"
        >
          Cancelar
        </button>
        <button className={styles.submitButton}>Editar</button>
      </div>
    </form>
  );
}

export default EditClientDialog;
