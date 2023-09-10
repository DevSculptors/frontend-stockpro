import React, { useState, useContext } from "react";

import { Form } from "@/components/Form";
import styles from "./style.module.css";

import { ModalContext } from "@/context/ModalContext";


function CreateUserDialog() {


  const { setOpen } = useContext(ModalContext);


  const onSubmit = (values: any) => {
    // Cuando se le da Cancelar tambien lo manda acá
    console.log("click en crear usuario");
    setOpen(false);

    console.log(values);
  };

  const onCancel = () => {
    console.log("click en cancelar");
    setOpen(false);

  }

  return (
    <Form title="Añadir Usuario" onSubmit={onSubmit}>
      <div>
        <div className="my-[10px] grid grid-cols-2 gap-4">
          <Form.ListBox
            name="typeDoc"
            label="Tipo de documento"
            placeholder="Selecciona tu tipo de documento"
            options={[
              { value: "CC", label: "Cédula de Ciudadanía" },
              { value: "CE", label: "Cédula de Extranjería" },
              { value: "TI", label: "Tarjeta de Identidad" },
            ]}
          />
          <Form.Input
            name="document"
            label="Número de documento"
            placeholder="Ingresa tu número de documento"
          />
          <Form.Input
            name="name"
            label="Nombre"
            placeholder="Ingresa tu nombre"
          />
          <Form.Input
            name="lastName"
            label="Apellido"
            placeholder="Ingresa tu apellido"
          />
          <Form.Input
            name="cellphone"
            label="Número de celular"
            placeholder="Ingresa tu número de celular"
          />
          <Form.Input
            name="email"
            label="Correo electrónico"
            placeholder="Ingresa tu correo electrónico"
          />
          <Form.Input
            name="user"
            label="Usuario"
            placeholder="Ingresa tu usuario"
          />
          <Form.Input
            name="password"
            type="password"
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
          />
          <Form.CheckBox
            //Toca cambiarlo
            name="rol"
            label="Rol"
            options={[
              { value: "cashier", label: "Cajero" },
              { value: "admin", label: "Administrador" },
              { value: "superAdmin", label: "Super Administrador" },
            ]}
          />
        </div>
        <div className="my-[10px] grid grid-cols-2 gap-4">
          <Form.CancelButton buttonText="Cancelar" onClick={onCancel}/>
          <Form.SubmitButton buttonText="Aceptar" />
        </div>
      </div>
    </Form>
  );
}

export default CreateUserDialog;
