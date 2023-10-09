"use client";
import { ReactNode, useMemo, useState } from "react";
import NavBar from "@/components/NavBar/NavBar";
import styles from "./style.module.scss";
import SideBar from "@/components/SideBar/SideBar";
import { menuData } from "@/helpers/HeaderCashier";
import { ModalContext } from "@/context/ModalContext";
import { Product } from "@/interfaces/Product";
import { Sale, ProductBuySale} from "@/interfaces/Sale";
import { ProductContext } from "@/context/ProductContext";
import { SaleContext } from "@/context/SaleContext";
import DetailsProductDialog from "./products/Dialogs/DetailsProduct/DetailsProductDialog";
import ModalBase from "@/app/components/Modal/Modal";
import { Client } from "@/interfaces/Client";
import { ClientContext } from "@/context/ClientContext";

const NavBarData = {
  logoHref: "/dashboard",
  settingsHref: "/dashboard/settings",
  notificationsHref: "/dashboard",
};


interface Props {
  children: ReactNode | ReactNode[];
}

function CashierLayout({ children }: Props) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [products, setProducts] = useState<Product[] | undefined>([]);

  const [selectedSale, setSelectedSale] = useState<Sale>();
  const [sales, setSales] = useState<Sale[] | undefined>([]);

  const [selectedClient, setSelectedClient] = useState<Client>();
  const [clients, setClients] = useState<Client[] | undefined>([]);

  const modalContext = useMemo(
      () => ({
        open,
        setOpen,
        id,
        setId,
      }),
      [open, id]
  );
  const productContext = useMemo(
      () => ({
        selectedProduct,
        setSelectedProduct,
        products,
        setProducts,
      }),
      [selectedProduct, products]
  );

  const clientContext = useMemo(
        () => ({
            selectedClient,
            setSelectedClient,
            clients,
            setClients,
        }),
        [selectedClient, clients]
  );

    const saleContext = useMemo(
        () => ({
            selectedSale,
            setSelectedSale,
            sales,
            setSales,
        }),
        [selectedSale, sales]
    );

  function SelectModal() {
    switch (id) {
      case "detailsProduct":
        return <DetailsProductDialog />;

      default:
        break;
    }
  }

  return (
    <div className={styles.main}>
      <NavBar {...NavBarData} />
      <div className={styles.container}>
        <div className={styles.menuContainer}>
          <SideBar {...menuData} />
        </div>
          <div className={styles.contentContainer}>
            <ProductContext.Provider value={productContext}>
                <ClientContext.Provider value={clientContext}>
                    <SaleContext.Provider value={saleContext}>
                        <ModalContext.Provider value={modalContext}>
                            <ModalBase isOpen={open} id={id}>
                                {SelectModal()}
                            </ModalBase>
                            <main className={styles.layout__main}>{children}</main>
                        </ModalContext.Provider>
                    </SaleContext.Provider>
                </ClientContext.Provider>
            </ProductContext.Provider>
          </div>
      </div>
    </div>
  );
}

export default CashierLayout;