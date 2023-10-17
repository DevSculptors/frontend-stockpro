
import { Form } from "@/components/Form";
import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "@/context/ModalContext";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


function CloseTurn() {
    const router = useRouter();

    const { setOpen } = useContext(ModalContext);
    const queryClient = useQueryClient();

    const closeTurn = useMutation({

    })

    const onSubmit = (formData: any) => {
        console.log()
        setOpen(false);
    };
    const onCancel = () => {
        setOpen(false);
    };
    return (
        <Form title="Cerrar Turno" onSubmit={onSubmit}>
            <div className="my-[10px]">
                <Form.InputRequired
                    name="cash"
                    label="Dinero en caja"
                    placeholder="Ingresa dinero en caja"
                    type="number"
                />
                <Form.InputRequired
                    name="cash"
                    label="Dinero base"
                    placeholder="Ingresa el monto de la base"
                    type="number"
                />

                <Form.SubmitButton buttonText="Aceptar" />
                <Form.CancelButton buttonText="Cancelar" onClick={onCancel} />
            </div>
        </Form>
    );
}
export default CloseTurn;
