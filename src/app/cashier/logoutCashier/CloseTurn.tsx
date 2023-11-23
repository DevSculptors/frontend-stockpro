
import { Form } from "@/components/Form";
import React, { useContext, useEffect, useState,useRef } from "react";
import { ModalContext } from "@/context/ModalContext";

import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getSalesAPI, closeTurnAPI, getInfoTurn, getWithdrawals} from "@/api/CashRegister";
import { SaleContext } from "@/context/SaleContext";
import { SaleTurn } from "@/interfaces/Sale";
import { ToasterSucess, ToasterError } from "@/helpers/useToaster";
import styles from "../style.module.scss";
import { LogoutAPI } from "@/api/Auth";
import Cookies from "js-cookie";
import { formatPrice } from "@/helpers/Utils";

function CloseTurn() {
    const [id_turn, setId_Turn] = useState("");
    const [id_cash, setId_Cash] = useState("");
    const [mutationCall, setMutationCall] = useState(true);
    const [totalSale,setTotalSale] = useState(0);
    let hasFunctionBeenCalled = true;

    useEffect(() => {
        if(mutationCall) {getAllSales()};
        setMutationCall(false);
        const storedTunrId = sessionStorage.getItem("id_turn");
        const storedCashId = sessionStorage.getItem("id_cash");
        if (storedTunrId) {
            setId_Turn(storedTunrId);
        }
        if (storedCashId) {
            setId_Cash(storedCashId);
        }
    },[id_turn,id_cash])
    const router = useRouter();
    const logout = LogoutAPI();
    const [valueCash,setValueCash] =useState(0);
    const { setOpen } = useContext(ModalContext);
    const queryClient = useQueryClient();
    const { setSelectedSale, setSales, sales } = useContext(SaleContext);
    const [imbalance, setImbalance] = useState(false);
    let salesDate = [];
    const [isInputDisabled, setIsInputDisabled] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const getSalesMutation = useMutation({
        mutationFn: getSalesAPI,
        onSuccess: (result:any) => {
            if (result.length>0){
                result.map((item:any) =>{
                    setTotalSale(Number(item.price_sale) + Number(totalSale));
                });
            }
        },
        onError: (error: any) => {
            error.response.data.forEach((error: any) => {
                ToasterError(error.message);
            });
        },
    });
    const getInfoTurnMutation = useMutation({
        mutationFn: getInfoTurn,
        onSuccess: (result:any) => {
            setTotalSale(totalSale+Number(result.base_cash));
        },
        onError: (error: any) => {
            error.response.data.forEach((error: any) => {
                ToasterError(error.message);
            });
        },
    });
    const getWithdrawalMutation= useMutation({
        mutationFn: getWithdrawals,
        onSuccess: (result:any) => {
            let total = 0;
            if(result.length>0) {
                result.map((item: any) => {
                    total += Number(item.value)
                });
                setTotalSale(totalSale - total)
            }
        },
        onError: (error: any) => {
            error.response.data.forEach((error: any) => {
                ToasterError(error.message);
            });
        },
    });
    const getAllSales = () => {
        if(hasFunctionBeenCalled) {
            hasFunctionBeenCalled=false;
            setTotalSale(0);
            getSalesMutation.mutate(
                sessionStorage.getItem("id_turn")!.toString(),
            );
            getInfoTurnMutation.mutate(
                sessionStorage.getItem("id_turn")!.toString(),
            );
            getWithdrawalMutation.mutate(
                sessionStorage.getItem("id_turn")!.toString(),
            );
        }
    }
    const closeTurnMutation = useMutation({
        mutationFn: closeTurnAPI,
        onSuccess: (result:any) => {
            queryClient.invalidateQueries(["cashRegister"]);
            logout;
            Cookies.remove("token");
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("userData");
            sessionStorage.removeItem("role");
            sessionStorage.removeItem("user_id");
            sessionStorage.removeItem("modalShown");
            sessionStorage.removeItem("id_turn");
            sessionStorage.removeItem("id_cash");
            router.push("/");
            ToasterSucess("Cierre de sesión de cajero exitoso");
            setOpen(false);
        },
        onError: (error: any) => {
            error.response.data.forEach((error: any) => {
                ToasterError(error.message);
            });
        },
    })
    const closeTurn = (formData: any, final_cash:string) =>{
        closeTurnMutation.mutate({
            ...formData,
            date_time_end: new Date(),
            id_turn: id_turn,
            id_cash: id_cash,
            final_cash: Number(final_cash),
        });
    }

    const onSubmit = (formData: any) => {
        if(inputRef.current!=null) {
            if (totalSale != Number(formData.final_cash) && !isInputDisabled) {
                setIsInputDisabled(true);
                setValueCash(totalSale - Number(inputRef.current.value));
            } else {
                closeTurn(formData, inputRef.current.value)
            }
        }

    };
    const onCancel = () => {
        setTotalSale(0);
        setOpen(false);
        router.push("/cashier");
    };
    return (
        <div>
        <Form title="Cerrar Turno" onSubmit={onSubmit}>
            <div className="my-[10px]">
                <div className={`${styles.inputContainerTest} mr-4`}>
                    <h3 className={styles.label}>Total de ventas:</h3>
                    <p className={styles.text}> {formatPrice(totalSale)}</p>
                </div>
                <div id="inputCash" className={styles.inputContainerTest}>
                    <label htmlFor="final_cash" className={styles.label}>
                        Dinero en caja
                    </label>
                    <input
                        type="number"
                        id="final_cash"
                        name="final_cash"
                        placeholder="Ingrese el dinero de caja"
                        required
                        disabled={isInputDisabled}
                        ref={inputRef}
                    />
                </div>
                <Form.InputRequired
                    name="admin_email"
                    label="Correo del Administrador"
                    placeholder="Ingresa el correo del administrador"
                    type="email"
                />
                <Form.InputRequired
                    name="password"
                    label="Contraseña del Administrador"
                    placeholder="Ingresa la contraseña"
                    type="password"
                />
                {valueCash != 0? (
                    <div>
                    <p className="text-red-500 text-xs">La diferencia en caja es de {valueCash}</p>
                    <Form.TextArea
                        name="description"
                        label="Descripción de Descuadre"
                        placeholder="Ingresa la descripción"
                    />
                    </div>
                ):null}
                <Form.SubmitButton buttonText="Aceptar" />
                <Form.CancelButton buttonText="Cancelar" onClick={onCancel} />
            </div>
        </Form>
        </div>
    );
}
export default CloseTurn;
