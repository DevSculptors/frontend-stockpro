
import { Form } from "@/components/Form";

import React, { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";

import { useQueryClient, useMutation } from "@tanstack/react-query";

import { createCategoryAPI } from "@/api/Category";

import { toast } from "sonner";

function CreateCategoryDialog() {

    const { setOpen } = useContext(ModalContext);

    const queryClient = useQueryClient();

    const addCategoryMutation = useMutation({
        mutationFn: createCategoryAPI,
        onSuccess: () => {
            queryClient.invalidateQueries(["category"]);
            setOpen(false);
        },
        onError: (error: any) => {
            console.log(error.response.data);
            toast.error(error.response.data.message)
        }
    })

    const onSubmit = (formData: any) => {
        addCategoryMutation.mutate({
            ...formData,
            is_active: true,
        });
        // setOpen(false);
    };

    const onCancel = () => {
        setOpen(false);
    };
    return (
        <Form title="Añadir Categoria" onSubmit={onSubmit}>
            <div className="my-[10px]">
                <Form.InputRequired
                    name="name"
                    label="Nombre"
                    placeholder="Ingresa el nombre"
                    type="text"
                />
                <Form.TextArea
                    name="description"
                    label="Descripción"
                    placeholder="Ingresa la descripción"
                />
                <Form.SubmitButton buttonText="Aceptar" />
                <Form.CancelButton buttonText="Cancelar" onClick={onCancel} />
            </div>
        </Form>
    );
}
export default CreateCategoryDialog;
