'use client'
import {Form} from "@/components/Form";
import React from 'react'
function Test() {
  const documentTypes = [
    {
      value: 'CC',
      label: 'Cedula de Ciudadania',
    },
    {
      value: 'PP',
      label: 'Pasaporte',
    },
    {
      value: 'CE',
      label: 'Cedula de Extranjeria',
    },
    {
      value: 'TI',
      label: 'Tarjeta de Identidad',
    },
    {
      value: 'NIT',
      label: 'NIT',
    }]
  const onSubmit = (formData: any) => {
    console.log(formData)
  };
  return (
      <Form title="Añadir Usuario" onSubmit={onSubmit}>
        <div className="my-[10px] grid grid-cols-2 gap-4">
          <Form.ListBox
              name="type_document"
              label="Tipo de documento"
              options={documentTypes}
          />
          <Form.Input
              name="id_document"
              label="Número de documento"
              placeholder="Ingresa tu número de documento"
          />
          <Form.Input
              name="name"
              label="Nombre"
              placeholder="Ingresa tu nombre"
          />
          <Form.Input
              name="last_name"
              label="Apellido"
              placeholder="Ingresa tu apellido"
          />
          <Form.Input
              name="phone"
              label="Número de celular"
              placeholder="Ingresa tu número de celular"
          />
          <Form.Input
              name="email"
              label="Correo electrónico"
              placeholder="Ingresa tu correo electrónico"
          />
          <Form.Input
              name="username"
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
          ]}/>
        </div>
        <div className="my-[10px] grid grid-cols-2 gap-4">
          <Form.CancelButton buttonText="Cancelar" />
          <Form.SubmitButton buttonText="Aceptar" />
        </div>
      </Form>
  )
}

export default Test