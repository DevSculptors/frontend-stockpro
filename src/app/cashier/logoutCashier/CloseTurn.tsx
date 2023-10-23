
import { Form } from "@/components/Form";
import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "@/context/ModalContext";

import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getSalesAPI, closeTurnAPI} from "@/api/CashRegister";
import { SaleContext } from "@/context/SaleContext";
import { SaleTurn } from "@/interfaces/Sale";
import { ToasterSucess, ToasterError } from "@/helpers/useToaster";
import styles from "../style.module.scss";
import { LogoutAPI } from "@/api/Auth";

function CloseTurn() {
    const router = useRouter();
    const logout = LogoutAPI();

    const { setOpen } = useContext(ModalContext);
    const queryClient = useQueryClient();
    const { setSelectedSale, setSales, sales } = useContext(SaleContext);
    const [id_turn, setId_Turn] = useState("");
    const [id_cash, setId_Cash] = useState("");

    useEffect(() => {
        const storedTunrId = sessionStorage.getItem("id_turn");
        const storedCashId = sessionStorage.getItem("id_cash");
        if (storedTunrId) {
            setId_Turn(storedTunrId);
        }
        if (storedCashId) {
            setId_Cash(storedCashId);
        }
    }, [])


    const closeTurnMutation = useMutation({
        mutationFn: closeTurnAPI,
        onSuccess: (result:any) => {
            queryClient.invalidateQueries(["cashRegister"]);
            ToasterSucess("Turno cerrado correctamente");
            setOpen(false);
        },
        onError: (error: any) => {
            error.response.data.forEach((error: any) => {
                ToasterError(error.message);
            });
        },
    })

    const onSubmit = (formData: any) => {
        closeTurnMutation.mutate({
            ...formData,
            date_time_end: new Date(),
            id_turn: id_turn,
            id_cash: id_cash,
            final_cash: Number(formData.final_cash),
        });
        logout;
        router.push("/");
        setOpen(false);
    };
    const onCancel = () => {
        setOpen(false);
    };
    return (
        <Form title="Cerrar Turno" onSubmit={onSubmit}>
            <div className="my-[10px]">
                <div className={`${styles.inputConainerTest} mr-4`}>
                    <h3 className={styles.label}>Total de ventas:</h3>
                    <p className={styles.text}> {10000}</p>
                </div>
                <Form.InputRequired
                    name="final_cash"
                    label="Dinero en caja"
                    placeholder="Ingresa dinero en caja"
                    type="number"
                />
                <Form.SubmitButton buttonText="Aceptar" />
                <Form.CancelButton buttonText="Cancelar" onClick={onCancel} />
            </div>
        </Form>
    );
}
export default CloseTurn;
