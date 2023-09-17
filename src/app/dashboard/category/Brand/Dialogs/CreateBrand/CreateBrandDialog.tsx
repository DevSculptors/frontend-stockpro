
import { Form } from "@/components/Form";

import React, { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";

import { useQueryClient, useMutation } from "@tanstack/react-query";

import { createBrandAPI } from "@/api/Brand";

import { toast } from "sonner";

function CreateBrandDialog() {

    const { setOpen } = useContext(ModalContext);

    const queryClient = useQueryClient();

    const addBrandMutation = useMutation({
        mutationFn: createBrandAPI,
        onSuccess: () => {
            queryClient.invalidateQueries(["brand"]);
            setOpen(false);
        },
        onError: (error: any) => {
            console.log(error.response.data);
            toast.error(error.response.data.message)
        }
    })

    const onSubmit = (formData: any) => {
        addBrandMutation.mutate({
            ...formData,
            is_active: true,
        });
        // setOpen(false);
    };

    const onCancel = () => {
        setOpen(false);
    };
    return (
        <Form title="Añadir Marca" onSubmit={onSubmit}>
            <div className="my-[10px]">
                <Form.InputRequired
                    name="name"
                    label="Nombre"
                    placeholder="Ingresa el nombre"
                    type="text"
                />
                <Form.InputRequired
                    name="description"
                    label="Descripción"
                    placeholder="Ingresa la descripción"
                    type="text"
                />
                <Form.SubmitButton buttonText="Aceptar" />
                <Form.CancelButton buttonText="Cancelar" onClick={onCancel} />
            </div>
        </Form>
    );
}
export default CreateBrandDialog;
