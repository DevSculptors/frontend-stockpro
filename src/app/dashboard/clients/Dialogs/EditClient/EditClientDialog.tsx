'use client'
import {Form} from "@/components/Form";
import React, { useContext } from 'react';
import { ModalContext } from "@/context/ModalContext";


function EditClientDialog() {
    const { setOpen } = useContext(ModalContext);
    const onSubmit = (values: any) => {
        console.log("click en editar cliente");
        setOpen(false);
        console.log(values);
    };

    const onCancel = () => {
        console.log("click en cancelar");
        setOpen(false);

    }
    return (
        <Form
            title={"Editar Cliente"}
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

export default EditClientDialog