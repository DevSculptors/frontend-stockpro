'use client'
import {Form} from "@/components/Form";
import React, { useContext } from 'react';
import { ModalContext } from "@/context/ModalContext";

import { UserContext } from "@/context/UserContext";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";

import { updateUser } from "@/api/Users";

function EditUserDialog() {
    const { setOpen } = useContext(ModalContext);
    const { selectedUser } = useContext(UserContext);

    const queryClient = useQueryClient();

    const updateUserMutation = useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
            setOpen(false);
        },
        onError: (error: any) => {
            console.log(error.response.data);
            toast.error(error.response.data.message)
        }
    })

    const onSubmit = (values: any) => {
        console.log(values)
        {/*updateUserMutation.mutate({
            ...values,
            isActive: true
        });*/}
    };

    const onCancel = () => {
        console.log("click en cancelar");
        setOpen(false);

    }
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
    const roles =[
        { value: 'cashier', label: 'Cajero' },
        { value: 'admin', label: 'Administrador' },
        { value: 'superAdmin', label: 'Super Administrador' }
    ]
    const status = [
        { value: 'active', label: 'Activo' },
        { value: 'inactive', label: 'Inactivo' }
    ]
    const typeStatus = (status) => {
        return status ? 'active' : 'inactive';
    };
    return (
        <Form
            title={"Editar Usuario"}
            onSubmit={onSubmit}
        ><div>
            <div className='my-[10px] grid grid-cols-2 gap-4'>
                <Form.ListBox
                    name="type_document"
                    label="Tipo de documento"
                    options={documentTypes}
                    defaultValue={selectedUser.person.type_document}
                />
                <Form.InputRequired
                    name="id_document"
                    label="Número de documento"
                    type="number"
                    defaultValue={selectedUser.person.id_document}
                />
                <Form.InputRequired
                    name="name"
                    label="Nombre"
                    type="text"
                    defaultValue={selectedUser.person.name}
                />
                <Form.InputRequired
                    name="last_name"
                    label="Apellido"
                    type="text"
                    defaultValue={selectedUser.person.last_name}
                />
                <Form.InputRequired
                    name="phone"
                    label="Número de celular"
                    type="number"
                    defaultValue={selectedUser.person.phone}
                />
                <Form.InputRequired
                    name="email"
                    label="Correo electrónico"
                    type="email"
                    defaultValue={selectedUser.email}
                />
                <Form.InputRequired
                    name="username"
                    label="Usuario"
                    type="text"
                    defaultValue={selectedUser.username}
                />
                <Form.ListBox
                    name="rol"
                    label="Rol"
                    options={roles}
                    defaultValue={selectedUser.roles_user[0].name}
                />
                <Form.ListBox
                    name="isActive"
                    label="Estado"
                    options={status}
                    defaultValue={typeStatus(selectedUser.isActive)}
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