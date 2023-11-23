"use client";
import React, {
  useContext,
  useState,
} from "react";
import { Sale } from "@/interfaces/Sale";
import DataTable from "@/components/DataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { SaleContext } from "@/context/SaleContext";
import { jsPDF } from "jspdf";

import styles from "../styles.module.scss";
import { toPng } from 'html-to-image';

import { useRouter } from "next/navigation";
import { formatPrice, formatDate, formatDatetoString,formatTimetoString } from "@/helpers/Utils";
import { AiOutlineArrowLeft } from "react-icons/ai";
import html2canvas from 'html2canvas';

const PrintSale = () => {
  const [pdf, setPDF] = useState(new jsPDF);
  const { selectedSale } = useContext(SaleContext);

  const router = useRouter();

  const date = selectedSale?.date_sale || "";
  const totalSale = selectedSale?.price_sale || 0;

  const rows =
    selectedSale?.oders.map((item) => ({
      id: item.product.id,
      name_product: item.product.name_product,
      brand: item.product.brand.name,
      category: item.product.category.name,
      amount_product: item.amount_product,
      unit_price: formatPrice(Number(item.price)),
    })) || [];

  const totalQuantity = rows.reduce((total, row) => total + Number(row.amount_product), 0);

  const generatePDF = () => {
    var pdf = new jsPDF();

    var printContent = document.getElementById("displayDiv") as HTMLElement;

    html2canvas(printContent).then(canvas => {
      var imgData = canvas.toDataURL('image/png');

      var pdf = new jsPDF();
      // @ts-ignore
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save();
    });
  };
  const printElement = () => {
    generatePDF();
    router.push("/cashier/cash")
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerTittle}>
        <p className={styles.tittleList}>Detalles de Venta</p>
        <div>
          <button
            type="button"
            id="buttonBack"
            className={styles.submitButton}
            onClick={() => {
              router.push("/cashier/cash");
            }}
          >
            <AiOutlineArrowLeft />
            Atras
          </button>
          <button
              id="buttonPrint"
              type="button" className={styles.buttonCreate}
              onClick={()=>printElement()}
          >
            Imprimir
          </button>
        </div>
      </div>
      <div>

      <div id="displayDiv">
        <div className="p-10">
          <h1 className=" pl-4 pb-4 flex-1 inline-block font-bold text-2xl pb-1 ">Supermecado JJ Camacho</h1>

          <div className="flex items-start justify-center">
            <div className="flex-1">
              <div className=" pl-4 pb-6">
                <p>Maliria Plazas Avila</p>
                <p>NIT: 33377016</p>
                <p>Calle 49 9-44</p>
                <p>Tunja, Boyacá</p>
              </div>
              <div>

              </div>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-1 pl-4 pb-20 w-55">
              <p className="text-gray-500">Factura a:</p>
              <h3 className="font-bold">{selectedSale?.person.name +" "+selectedSale?.person.last_name}</h3>
              <p>{selectedSale?.person.type_document +" "+selectedSale?.person.id_document}</p>
              <p>{selectedSale?.person.phone}</p>
            </div>
            <div className="w-45">
              <p className="flex text-black-500 py-1"> # {selectedSale?.id}</p>
              <div className="flex flex-col items-end">
                <p className="text-black-500 "> <strong>Fecha:</strong>  {formatDatetoString(selectedSale?.date_sale || new Date().toString())}</p>
                <p className="text-black-500 "> <strong>Hora:</strong>  {formatTimetoString(selectedSale?.date_sale || new Date().toString())}</p>
              </div>
            </div>
          </div>

          <div className="table w-full">
            <div className=" table-header-group bg-gray-500 text-white ">
              <div className=" table-row ">
                <div className=" table-cell w-6/12 text-left py-2 px-4 rounded-m-lg border-x-[1px]">Nombre Producto</div>
                <div className=" table-cell w-[10%] text-center border-x-[1px]">Cantidad</div>
                <div className=" table-cell w-2/12 text-center border-x-[1px]">Vr. Unidad</div>
                <div className=" table-cell w-2/12 text-center rounded-m-lg border-x-[1px]">Total</div>
              </div>
            </div>
            <div className="table-row-group">
              {selectedSale?.oders.map((item) => (
                  <div key={item.product.id} className="table-row">
                    <div className=" table-cell w-6/12 text-left font-bold py-1 px-4">{item.product.name_product}</div>
                    <div className=" table-cell w-[10%] text-center">{item.amount_product}</div>
                    <div className=" table-cell w-2/12 text-center">{formatPrice(item.product.sale_price)}</div>
                    <div className=" table-cell w-2/12 text-center">{formatPrice(Number(item.price))}</div>
                  </div>
              ))}
            </div>
          </div>

          <div className=" pt-20 pr-10 text-right">
            <p className="text-gray-600"><strong>Total:</strong>  <span className="pl-24 text-black">
              {formatPrice(Number(selectedSale?.price_sale))}</span></p>
          </div>
          <div className="py-6">
            <p className="text-gray-400 pb-2">Factura generada por:</p>
            <p>Stock Pro</p>
            <p>Nit: 1002396991</p>
            <p>stockpro@gmail.com</p>
          </div>
        </div>
      </div>

      </div>
    </div>
  );
};

export default PrintSale;
