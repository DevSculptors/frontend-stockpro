"use client";
import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { ModalContext } from "@/context/ModalContext";
import { getAllBrandsAPI } from "@/api/Brand";
import { BrandContext } from "@/context/BrandContext";
import { Brand } from "@/interfaces/Brand";

import styles from "./style.module.scss";

import { GridLoader } from "react-spinners";
import DataTable from "@/components/DataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nombre",
      width: 200,
      type: "string",
    },
    {
      field: "description",
      headerName: "Descripción",
      width: 600,
      type: "string",
    },
    {
      field: "is_active",
      headerName: "Estado",
      width: 100,
      type: "boolean",
    },
  ];

function BrandPage() {
  const { setOpen, setId } = useContext(ModalContext);
  const { setSelectedBrand, setBrands, brands} = useContext(BrandContext);

  const { data, isLoading } = useQuery(["brand"], getAllBrandsAPI, {
    onSuccess: (data) => {
      setBrands(data);
    },
  });

  const rows =
  brands?.map((brand: Brand) => ({
    id: brand.id,
    name: brand.name,
    description: brand.description,
    is_active: brand.is_active,
  })) || [];
  
  
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
      {isLoading ? (
        <div className={styles.loading}>
          <GridLoader color="#1E9189" size={125} />
        </div>
      ) : (
        <div>
          <div className={styles.containerTittle}>
            <p className={styles.tittleList}>Marcas</p>

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
          <DataTable
            slug="brands"
            columns={columns}
            rows={rows}
            pagination={5}
            handleRow={(params) => handleRow(params)}
          />
        </div>
      )}
    </div>
  );
}

export default BrandPage;
