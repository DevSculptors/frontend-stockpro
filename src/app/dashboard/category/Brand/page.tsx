"use client";
import { Table } from "@/components/Table";
import { LuSearch } from "react-icons/lu";
import React, { useContext } from "react";

import { useQuery } from "@tanstack/react-query";

import { ModalContext } from "@/context/ModalContext";
import {getAllBrandsAPI} from "@/api/Brand";
import {BrandContext} from "@/context/BrandContext";
import styles from "./style.module.scss";
import { Brand } from "@/interfaces/Brand";


function BrandPage() {

    const { setOpen, setId } = useContext(ModalContext);
    const { setSelectedBrand, setBrands } = useContext(BrandContext);

    const { data, isLoading } = useQuery(["brand"], getAllBrandsAPI, {
        onSuccess: (data) => {
            setBrands(data);
        },
    });
    const typeStatus = (status: boolean) => {
        return status ? 'Activo' : 'Inactivo';
    };

    const handleRow = (id: string) => {
        const brand = data?.find((brand) => brand.id === id);
        if (brand) {
            setSelectedBrand(brand);
        }
        if (setId) {
            setOpen(true);
            setId("editBrand");
        }
    };

    return (
        <div className={styles.containerBrand}>
            <div className={styles.containerTittle}>
                <p className={styles.tittleList}>Marcas</p>
                <div className={styles.divSearch}>
                    <LuSearch className={styles.iconSearch} />
                    <input
                        type="text"
                        placeholder="Buscar marca"
                        className={styles.inputSearch}
                    />
                </div>
                <div>
                    <button
                        className={styles.buttonCreate}
                        onClick={() => {
                            if (setId) {
                                setOpen(true);
                                setId("addBrand");
                            }
                        }}
                    >
                        Crear Marca
                    </button>
                </div>
            </div>
            <Table
                name="brands"
                columnNames={[
                    "Nombre",
                    "Descripción",
                    "Estado",
                ]}>
                {data?.map((brand: Brand) => (
                    <Table.Row
                        key={brand.id}
                        indexRow={brand.id}
                        rowData={[
                            brand.name,
                            brand.description,
                            typeStatus(brand.is_active),
                        ]}
                        handleRow={() => handleRow(brand.id)}
                    />
                ))}
            </Table>
        </div>
    );
}

export default BrandPage