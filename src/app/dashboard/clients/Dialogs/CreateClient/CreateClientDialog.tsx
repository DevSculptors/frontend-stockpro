import { Form } from "@/components/Form";
import styles from "./style.module.css";

import React, { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";

import { useQueryClient, useMutation } from "@tanstack/react-query";

import { createClientAPI } from "@/api/Clients";

import { documentTypes } from "@/interfaces/Client";

import { ToasterSucess, ToasterError } from "@/helpers/useToaster";

function CreateClientDialog() {
  const { setOpen } = useContext(ModalContext);

  const queryClient = useQueryClient();

  const addClientMutation = useMutation({
    mutationFn: createClientAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["client"]);
      ToasterSucess("Cliente creado correctamente");
      setOpen(false);
    },
    onError: (error: any) => {
     // Esto se puede mejorar
      error.response.data.forEach((error: any) => {
        ToasterError(error.message);
      });
    },
  });

  const onSubmit = (formData: any) => {
    addClientMutation.mutate({
      ...formData,
    });
  };

  const onCancel = () => {
    setOpen(false);
  };

  return (
    <Form title="Añadir Cliente" onSubmit={onSubmit}>
      <div className="my-[10px] grid grid-cols-2 gap-4">
        <Form.ListBox
          name="type_document"
          label="Tipo de documento"
          placeholder="Selecciona tu tipo de documento"
          options={documentTypes}
        />
        <Form.InputRequired
          name="id_document"
          label="Número de documento"
          placeholder="Ingresa tu número de documento"
          type="number"
        />
        <Form.InputRequired
          name="name"
          label="Nombre"
          placeholder="Ingresa tu nombre"
          type="text"
        />
        <Form.InputRequired
          name="last_name"
          label="Apellido"
          placeholder="Ingresa tu apellido"
          type="text"
        />
        <Form.InputRequired
          name="phone"
          label="Número de celular"
          placeholder="Ingresa tu número de celular"
          type="number"
        />
      </div>
      <div className="my-[10px] grid grid-cols-2 gap-4">
        <Form.CancelButton buttonText="Cancelar" onClick={onCancel} />
        <Form.SubmitButton buttonText="Aceptar" />
      </div>
    </Form>
  );
}

export default CreateClientDialog;
