
import { Form } from "@/components/Form";
import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "@/context/ModalContext";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


function OpenTurn() {
    const router = useRouter();

    const { setOpen } = useContext(ModalContext);
    const queryClient = useQueryClient();

    const openTurn = useMutation({

    })

    const onSubmit = (formData: any) => {
        console.log()
        setOpen(false);
        router.push("/cashier/cash");
    };
    const onCancel = () => {
        setOpen(false);
    };
    return (
        <Form title="Abrir Turno" onSubmit={onSubmit}>
            <div className="my-[10px]">
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
export default OpenTurn;
