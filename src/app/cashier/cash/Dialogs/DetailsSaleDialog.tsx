"use client"
import styles from "./styles.module.scss";
import React, { FormEvent, useContext, useState } from "react";
import { ModalContext } from "@/context/ModalContext";


function DetailsSaleDialog(){

    const { setOpen } = useContext(ModalContext);


    const onCancel = () => {
        console.log("click en cerrar");
        setOpen(false);
    };

    return (
        <div className={styles.containerDetail}>
            <div className={styles.descriptionContainer}>
                <h2>Detalles Venta</h2>
            </div>
            <div className="my-[10px] grid grid-cols-2 gap-4">
                <div className={styles.detailContainer}>
                    <label htmlFor="price_sale" className={styles.label}>
                        Total Venta
                    </label>
                    <input
                        type="number"
                        id="price_sale"
                        name="price_sale"
                        value={1000}
                        readOnly
                    /></div>
                <div className={styles.detailContainer}>
                    <label htmlFor="money" className={styles.label}>
                        Unidad de medida
                    </label>
                    <input
                        type="number"
                        id="money"
                        name="money"
                        value={1000}
                    /></div>
            </div>
            <div className="my-[10px] grid grid-cols-1 gap-4">
                <button
                    className={styles.submitButton}
                    type="submit"
                >
                    Aceptar
                </button>
            </div>
        </div>
    );
}
export default DetailsSaleDialog;