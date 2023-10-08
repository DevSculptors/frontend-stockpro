"use client";
import { Inventory } from "@/interfaces/Inventory";
import DataTable from "@/components/DataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { useContext } from "react";
import { InventoryContext } from "@/context/InventoryContext";

import styles from "../style.module.scss";

import { useRouter } from "next/navigation";
import {AiOutlineArrowLeft} from "react-icons/ai";


function ShowInventory({ id }: { id: string }) {

  const { selectedInventory } = useContext(InventoryContext);

  console.log(selectedInventory);
  
  

  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.containerTittle}>
        <p className={styles.tittleList}>Detalles de Compra</p>
        <div>
          <button
            type="button"
            className={styles.submitButton}
            onClick={() => {
              router.push("/dashboard/buys");
            }}
          >
            <AiOutlineArrowLeft />
            Atras
          </button>
        </div>
      </div>
      <div className="my-[10px] grid grid-cols-2 gap-4">

      </div>
    </div>
  );
}

export default ShowInventory;
