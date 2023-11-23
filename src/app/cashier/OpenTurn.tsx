
import { Form } from "@/components/Form";
import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "@/context/ModalContext";
import styles from "./style.module.scss";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ToasterSucess, ToasterError } from "@/helpers/useToaster";
import { openTurnAPI, getAllCashRegisterAPI } from "@/api/CashRegister";
import { CashRegister } from "@/interfaces/CashRegister";
import { useQuery } from "@tanstack/react-query";
import { CashRegisterContext } from "@/context/CashRegisterContext";
import { formatDate } from "@/helpers/Utils";


function OpenTurn() {
    const router = useRouter();

    const { setOpen } = useContext(ModalContext);
    const queryClient = useQueryClient();
    const { setSelectedCashRegister, setCashRegisters, cashRegisters } = useContext(CashRegisterContext);
    const [user_id, setUser_id] = useState("");
    let cashId="undifined";

    useEffect(() => {
        const storedUserId = sessionStorage.getItem("user_id");
        if (storedUserId) {
            setUser_id(storedUserId);
        }
    }, [])

    const { data, isLoading } = useQuery(["cashRegister"], getAllCashRegisterAPI, {
        onSuccess: (data) => {
            setCashRegisters(data);
        },
    });

    const openTurnMutation = useMutation({
        mutationFn: openTurnAPI,
        onSuccess: (result:any) => {
            queryClient.invalidateQueries(["cashRegister"]);
            ToasterSucess("Turno abierto correctamente");
            sessionStorage.setItem('id_turn', result.turn.id);
            setOpen(false);
        },
        onError: (error: any) => {
            error.response.data.forEach((error: any) => {
                ToasterError(error.message);
                router.push("/logout");
            });
        },
    });

    const onSubmit = (formData: any) => {
        if(cashId !== "undifined") {
            openTurnMutation.mutate({
                ...formData,
                id_cash: cashId,
                date_time_start: new Date(),
                id_user: user_id,
                base_cash: Number(formData.base_cash),
            });
            sessionStorage.setItem('id_cash', cashId);
            setOpen(false);
        }
    };
    const onCancel = () => {
        router.push("/logout");
    };
    const handleChange = (event:any) => {
        const newValue = event.target.value;
        cashId=newValue
    };
    return (
        <Form title="Abrir Turno" onSubmit={onSubmit}>
            <div className="my-[10px]">
                <select className={styles.selectStyle}
                    name="id_client"
                    onChange={handleChange}
                    required
                        defaultValue=""
                >
                    <option value="" hidden>
                        Seleccione una caja registradora
                    </option>
                    {cashRegisters?.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.name}
                        </option>
                    ))}
                </select>
                <Form.InputRequired
                    name="base_cash"
                    label="Dinero base Caja"
                    placeholder="Ingresa la base"
                    type="number"
                />
                <Form.SubmitButton buttonText="Aceptar" />
                <Form.CancelButton buttonText="Cancelar" onClick={onCancel} />
            </div>
        </Form>
    );
}
export default OpenTurn;
