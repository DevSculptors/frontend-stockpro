
import { Form } from "@/components/Form";

import React, { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";

import { useQueryClient, useMutation } from "@tanstack/react-query";

import { createCashRegisterAPI } from "@/api/CashRegister";

import { toast } from "sonner";
import { ToasterEdit, ToasterError } from "@/helpers/useToaster";


function CreateCashRegisterDialog() {

    const { setOpen } = useContext(ModalContext);

    const queryClient = useQueryClient();

    const addCashRegisterMutation = useMutation({
        mutationFn: createCashRegisterAPI,
        onSuccess: () => {
            queryClient.invalidateQueries(["cashRegister"]);
            ToasterEdit("Caja registradora añadida correctamente");
            setOpen(false);
        },
        onError: (error: any) => {
            error.response.data.forEach((error: any) => {
                ToasterError(error.message);
            });
        }
    })

    const onSubmit = (formData: any) => {
        addCashRegisterMutation.mutate({
            ...formData,
        });
        // setOpen(false);
    };

    const onCancel = () => {
        setOpen(false);
    };
    return (
        <Form title="Crear Caja Registradora" onSubmit={onSubmit}>
            <div className="my-[10px]">
                <Form.InputRequired
                    name="name"
                    label="Nombre"
                    placeholder="Ingresa el nombre"
                    type="text"
                />
                <Form.TextArea
                    name="location"
                    label="Locación"
                    placeholder="Ingresa la locación"
                />
                <Form.SubmitButton buttonText="Aceptar" />
                <Form.CancelButton buttonText="Cancelar" onClick={onCancel} />
            </div>
        </Form>
    );
}
export default CreateCashRegisterDialog;
