'use client'
import {Form} from "@/components/Form";
import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from "../style.module.css";

interface EditProps {
    title: string
}


function EditUser({title}:EditProps) {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const onSubmit = (values) => {
        console.log(values);
        closeModal();
    };
    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Add User Modal"
            className={styles.modalAddUsers}
            overlayClassName={styles.overlay}
        >
        <Form
            title={title}
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
                />
                <Form.SubmitButton
                    buttonText="Editar"
                />
            </div>

        </div>
        </Form>
        </Modal>
    )
}

export default EditUser