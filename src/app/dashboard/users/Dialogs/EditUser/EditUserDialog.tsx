'use client'
import {Form} from "@/components/Form";
import React, { useContext } from 'react';
import { ModalContext } from "@/context/ModalContext";

import { UserContext } from "@/context/UserContext";

function EditUserDialog() {
    const { setOpen } = useContext(ModalContext);
    const { selectedUser } = useContext(UserContext);

    console.log("selectedUser", selectedUser);
    
    
    const onSubmit = (values: any) => {
        console.log("click en editar usuario");
        setOpen(false);
        console.log(values);
    };

    const onCancel = () => {
        console.log("click en cancelar");
        setOpen(false);

    }
    return (
        <Form
            title={"Editar Usuario"}
            onSubmit={onSubmit}
        ><div>
            <div className='my-[10px] grid grid-cols-2 gap-4'>
                <Form.ListBox
                    name="typeDoc"
                    label="Tipo de documento"
                    placeholder="Selecciona tu tipo de documento"
                    options={[
                        { value: 'CC', label: 'Cédula de Ciudadanía' },
                        { value: 'CE', label: 'Cédula de Extranjería' },
                        { value: 'TI', label: 'Tarjeta de Identidad' }
                    ]}
                />
                <Form.Input
                    name="document"
                    label="Número de documento"
                    placeholder="Número de documento"
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
                    label="Usuarior"
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
                        { value: 'cashier', label: 'Cajero' },
                        { value: 'admin', label: 'Administrador' },
                        { value: 'superAdmin', label: 'Super Administrador' }
                    ]}
                />
                <Form.CheckBox
                    //Toca cambiarlo
                    name="status"
                    label="Estado"
                    options={[
                        { value: 'active', label: 'Activo' },
                        { value: 'inactive', label: 'Inactivo' }
                    ]}
                />
            </div>
            <div className='my-[10px] grid grid-cols-2 gap-4'>
                <Form.CancelButton
                    buttonText="Cancelar"
                    onClick={onCancel}
                />
                <Form.SubmitButton
                    buttonText="Editar"
                />
            </div>

        </div>
        </Form>
    )
}

export default EditUserDialog