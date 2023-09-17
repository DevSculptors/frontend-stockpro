"use client";
import React, { FormEvent, useContext, useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import styles from "./styles.module.scss";

import { ModalContext } from "@/context/ModalContext";
import { UserContext } from "@/context/UserContext";

import {UpdateUser, User} from "@/interfaces/User"
import { updateUserAPI } from "@/api/Users";

import { ToasterEdit, ToasterError } from "@/helpers/useToaster";

function EditUserDialog() {
    const queryClient = useQueryClient();

    const updateUserMutation = useMutation({
        mutationFn: updateUserAPI,
        onSuccess: () => {
            queryClient.invalidateQueries(["user"]);
            ToasterEdit("Usuario editado correctamente");
            setOpen(false);
        },
        onError: (error: any) => {
            error.response.data.forEach((error: any) => {
                ToasterError(error.message);
            });
        }
    });
    const { setOpen } = useContext(ModalContext);

    const { selectedUser, setSelectedUser} = useContext(UserContext);

    const updateUserValues = {
        id: selectedUser?.id,
        username: selectedUser?.username,
        email: selectedUser?.email,
        isActive: selectedUser?.isActive,
        personId: selectedUser?.person.id,
        id_document: selectedUser?.person.id_document,
        type_document: selectedUser?.person.type_document,
        name: selectedUser?.person.name,
        last_name: selectedUser?.person.last_name,
        phone: selectedUser?.person.phone,
        roleName: selectedUser?.role,
    };
    const handleChange = ({ target: { name, value } }: any) => {
        if (name=="is_active"){
            value=="true"?value=true:value=false;
        }
        setSelectedUser((prevValues: any) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const onSubmit = async (e:  FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateUserMutation.mutate(updateUserValues as UpdateUser)
    };

    const onCancel = () => {
        console.log("click en cancelar");
        setOpen(false);
    };
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
    const state =[
        { value: 'active', label: 'Activo' },
        { value: 'inactive', label: 'Inactivo' }  
    ]

    const getIsActive = (isActive: any) => {
        return isActive? "active" : "inactive";
    };

    return (
        <form onSubmit={onSubmit} className={styles.form}>
            <div className={styles.descriptionContainer}>
                <h2>Editar Usuario</h2>
            </div>
            <div className="my-[10px] grid grid-cols-2 gap-4">
            <div className={styles.listBox}>
                    <label htmlFor="type_document">Tipo de documento</label>
                    <select name="type_document" id="type_document" onChange={handleChange}
                    value={selectedUser?.person.type_document}
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
                    type="number"
                    id="id_document"
                    name="id_document"
                    placeholder="Escribe el número de documento"
                    value={selectedUser?.person.id_document}
                    onChange={handleChange}
                    required
            /></div>
            <div className={styles.inputContainer}>
                <label htmlFor="name" className={styles.label}>
                    Nombre
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Escribe el nombre"
                    value={selectedUser?.person.name}
                    onChange={handleChange}
                    required
            /></div>
            <div className={styles.inputContainer}>
                <label htmlFor="last_name" className={styles.label}>
                    Nombre
                </label>
                <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    placeholder="Escribe el apellido"
                    value={selectedUser?.person.last_name}
                    onChange={handleChange}
                    required
            /></div>
            <div className={styles.inputContainer}>
                <label htmlFor="phone" className={styles.label}>
                    Celular
                </label>
                <input
                    type="number"
                    id="phone"
                    name="phone"
                    placeholder="Escribe el número de celular"
                    value={selectedUser?.person.phone}
                    onChange={handleChange}
                    required
            /></div>
            <div className={styles.inputContainer}>
                <label htmlFor="email" className={styles.label}>
                    Correo electrónico
                </label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Escribe el correo electrónico"
                    value={selectedUser?.email}
                    onChange={handleChange}
                    required
            /></div>
            <div className={styles.inputContainer}>
                <label htmlFor="username" className={styles.label}>
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Escribe el username"
                    value={selectedUser?.username}
                    onChange={handleChange}
                    required
            /></div>
            <div className={styles.listBox}>
                <label htmlFor="role">Rol</label>
                <select name="role" id="role" onChange={handleChange}
                value={selectedUser?.role}>
                    {roles.map((type) => (
                    <option key={type.value} value={type.value}>
                        {type.label}
                    </option>
                    ))}
                </select>
            </div>
            <div className={styles.listBox}>
                <label htmlFor="isActive">Estado usuario</label>
                <select name="isActive" id="isActive" onChange={handleChange}
                value={getIsActive(selectedUser?.isActive)}>
                    {state.map((type) => (
                    <option key={type.value} value={type.value}>
                        {type.label}
                    </option>
                    ))}
                </select>
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

export default EditUserDialog;
