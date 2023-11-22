
import { Form } from "@/components/Form";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { ModalContext } from "@/context/ModalContext";

import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { saveWithdrawalAPI,getInfoTurn, getSalesAPI, saveWithdrawl, getWithdrawals} from "@/api/CashRegister";
import { SaleContext } from "@/context/SaleContext";
import { SaleTurn } from "@/interfaces/Sale";
import { ToasterSucess, ToasterError } from "@/helpers/useToaster";
import styles from "../style.module.scss";
import { formatPrice } from "@/helpers/Utils";

function CreateWithdrawl() {
    const [id_turn, setId_Turn] = useState("");
    const [mutationCall, setMutationCall] = useState(true);
    const [totalSale,setTotalSale] =useState(0);
    let hasFunctionBeenCalled = true;

    const getSalesMutation = useMutation({
        mutationFn: getSalesAPI,
        onSuccess: (result:any) => {
            //queryClient.invalidateQueries(["cashRegister"]);
            if (result.length>0){
                result.map((item:any) =>{
                    setTotalSale(Number(item.price_sale)+totalSale);
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
            //queryClient.invalidateQueries(["cashRegister"]);
            setTotalSale(totalSale+Number(result.base_cash))
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
                setTotalSale(totalSale-total)
            }
        },
        onError: (error: any) => {
            error.response.data.forEach((error: any) => {
                ToasterError(error.message);
            });
        },
    });
    const getAllSales = useCallback(() => {
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
        setMutationCall(false);
    },[])
    useEffect(() => {
        getAllSales();
        const storedTunrId = sessionStorage.getItem("id_turn");
        if (storedTunrId) {
            setId_Turn(storedTunrId);
        }
    },[getAllSales])
    const router = useRouter();
    const { setOpen } = useContext(ModalContext);
    const queryClient = useQueryClient();
    const { setSelectedSale, setSales, sales } = useContext(SaleContext);
    const [withdrawl, setWithdrawl] = useState(0);


    const saveWithdrawlMutation = useMutation({
        mutationFn: saveWithdrawalAPI,
        onSuccess: (result:any) => {
            queryClient.invalidateQueries(["cashRegister"]);
            ToasterSucess("Creación de retiro exitosa");
            setOpen(false);
            setTotalSale(0);
            router.push("/cashier")
        },
        onError: (error: any) => {
            error.response.data.forEach((error: any) => {
                ToasterError(error.message);
            });
        },
    })

    const onSubmit = (formData: any) => {
        saveWithdrawlMutation.mutate({
            withdrawal_date: new Date(),
            id: id_turn,
            value: Number(withdrawl),
        });
    };
    const onCancel = () => {
        router.push("/cashier");
        setTotalSale(0);
        setOpen(false);
    };
    const handleChangeSearch = ({ target: { name, value } }: any) => {
        setWithdrawl(value)
    };
    return (
        <div>
        <Form title="Crear Retiro" onSubmit={onSubmit}>
            <div className="my-[10px]">
                <div className={`${styles.inputContainerTest} mr-4`}>
                    <h3 className={styles.label}>Dinero en caja:</h3>
                    <p className={styles.text}> {formatPrice(totalSale)}</p>
                </div>
                <div className={styles.inputContainerTest}>
                    <label htmlFor="amount_product" className={styles.label}>
                        Cantidad
                    </label>
                    <input
                        type="number"
                        id="amount_product"
                        name="amount_product"
                        placeholder="Ingrese cantidad"
                        onChange={handleChangeSearch}
                        max={totalSale ||100}
                        min="1"
                        required
                    />
                </div>
                <Form.SubmitButton buttonText="Aceptar" />
                <Form.CancelButton buttonText="Cancelar" onClick={onCancel} />
            </div>
        </Form>
        </div>
    );
}
export default CreateWithdrawl;
