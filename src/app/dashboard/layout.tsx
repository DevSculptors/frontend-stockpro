"use client";
import { ReactNode, useMemo, useState } from "react";
import styles from "./style.module.scss";

import SideBar from "@/components/SideBar/SideBar";

import NavBar from "@/components/NavBar/NavBar";

import ModalBase from "@/app/components/Modal/Modal";

import CreateUserDialog from "./users/Dialogs/CreateUser/CreateUserDialog";
import EditUserDialog from "./users/Dialogs/EditUser/EditUserDialog";

import CreateClientDialog from "./clients/Dialogs/CreateClient/CreateClientDialog";
import EditClientDialog from "./clients/Dialogs/EditClient/EditClientDialog";

import CreateCategoryDialog from "./category/Category/Dialogs/CreateCategory/CreateCategoryDialog";
import EditCategoryDialog from "./category/Category/Dialogs/EditCategory/EditCategoryDialog";

import CreateBrandDialog from "./category/Brand/Dialogs/CreateBrand/CreateBrandDialog";
import EditBrandDialog from "./category/Brand/Dialogs/EditBrand/EditBrandDialog";

import EditProductDialog from "./inventory/Dialogs/EditProduct/EditProductDialog";
import CreateProductDialog from "./inventory/Dialogs/CreateProduct/CreateProductDialog";

import CreateCashRegisterDialog from "./cashRegister/Dialogs/CreateCashRegister/CreateCashRegisterDialog";

import CreateBuyDialog from "./buys/create/CreateBuyDialog/CreateBuyDialog";

import { ClientContext } from "@/context/ClientContext";
import { ModalContext } from "@/context/ModalContext";
import { UserContext } from "@/context/UserContext";
import { CategoryContext } from "@/context/CategoryContext";
import { BrandContext } from "@/context/BrandContext";
import { ProductContext } from "@/context/ProductContext";
import { InventoryContext } from "@/context/InventoryContext";
import { CashRegisterContext } from "@/context/CashRegisterContext";
import { Sale, ProductDetailSale} from "@/interfaces/Sale";
import { CashRegister} from "@/interfaces/CashRegister";

import { Client } from "@/interfaces/Client";
import { Category } from "@/interfaces/Category";
import { Brand } from "@/interfaces/Brand";
import { User } from "@/interfaces/User";
import { Product } from "@/interfaces/Product";
import { Inventory, ProductBuyInventory } from "@/interfaces/Inventory";
import { SaleContext } from "@/context/SaleContext";


import { menuData } from "@/helpers/Headers";

const NavBarData = {
  logoHref: "/dashboard",
  settingsHref: "/dashboard/settings",
  notificationsHref: "/dashboard",
};

interface Props {
  children: ReactNode | ReactNode[];
}

function DashboardLayout({ children }: Props) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  const [selectedClient, setSelectedClient] = useState<Client>();
  const [clients, setClients] = useState<Client[] | undefined>([]);

  const [selectedUser, setSelectedUser] = useState<User>();
  const [users, setUsers] = useState<User[] | undefined>([]);

  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [category, setCategories] = useState<Category[] | undefined>([]);

  const [selectedBrand, setSelectedBrand] = useState<Brand>();
  const [brands, setBrands] = useState<Brand[] | undefined>([]);

  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [products, setProducts] = useState<Product[] | undefined>([]);

  const [selectedCashRegister, setSelectedCashRegister] = useState<CashRegister>();
  const [cashRegisters, setCashRegisters] = useState<CashRegister[] | undefined>([]);

  const [selectedInventory, setSelectedInventory] = useState<Inventory>();
  const [inventory, setInventory] = useState<Inventory[] | undefined>([]);

  const [productsBuy, setProductsBuy] = useState<
    ProductBuyInventory[] | undefined
  >([]);

  const [selectProductBuy, setSelectProductBuy] = useState<
    ProductBuyInventory | undefined
  >();

  const [selectedSale, setSelectedSale] = useState<Sale>();
  const [sales, setSales] = useState<Sale[] | undefined>([]);

  const [productsSale, setProductsSale] = useState<ProductDetailSale[] | undefined>([]);
  const [selectProductSale, setSelectProductSale] = useState<ProductDetailSale | undefined>();

  const userContext = useMemo(
    () => ({
      selectedUser,
      setSelectedUser,
      users,
      setUsers,
    }),
    [selectedUser, users]
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

  const categoryContext = useMemo(
    () => ({
      selectedCategory,
      setSelectedCategory,
      category,
      setCategories,
    }),
    [selectedCategory, category]
  );

  const brandContext = useMemo(
    () => ({
      selectedBrand,
      setSelectedBrand,
      brands,
      setBrands,
    }),
    [selectedBrand, brands]
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

  const cashRegisterContext = useMemo(
      () => ({
          selectedCashRegister,
          setSelectedCashRegister,
          cashRegisters,
          setCashRegisters,
        }),
      [selectedCashRegister, cashRegisters]
  );

  const inventoryContext = useMemo(
    () => ({
      selectedInventory,
      setSelectedInventory,
      inventory,
      setInventory,

      productsBuy,
      setProductsBuy,

      selectProductBuy,
      setSelectProductBuy,
    }),
    [selectedInventory, inventory, productsBuy, selectProductBuy]
  );

  const modalContext = useMemo(
    () => ({
      open,
      setOpen,
      id,
      setId,
    }),
    [open, id]
  );

  const saleContext = useMemo(
        () => ({
            selectedSale,
            setSelectedSale,
            sales,
            setSales,
            productsSale,
            setProductsSale,
            selectProductSale,
            setSelectProductSale,
        }),
        [selectedSale, sales, productsSale, selectProductSale]
    );

  function SelectModal() {
    switch (id) {
      case "addUser":
        return <CreateUserDialog />;

      case "editUser":
        return <EditUserDialog />;

      case "addClient":
        return <CreateClientDialog />;

      case "editClient":
        return <EditClientDialog />;

      case "addCategory":
        return <CreateCategoryDialog />;

      case "editCategory":
        return <EditCategoryDialog />;

      case "addBrand":
        return <CreateBrandDialog />;

      case "editBrand":
        return <EditBrandDialog />;

      case "editProduct":
        return <EditProductDialog />;

      case "addProduct":
        return <CreateProductDialog />;

      case "addBuy":
        return <CreateBuyDialog />;

        case "addCashRegister":
            return <CreateCashRegisterDialog />;

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
          <UserContext.Provider value={userContext}>
            <ClientContext.Provider value={clientContext}>
                <CashRegisterContext.Provider value={cashRegisterContext}>
                    <ProductContext.Provider value={productContext}>
                        <InventoryContext.Provider value={inventoryContext}>
                            <SaleContext.Provider value={saleContext}>
                                <CategoryContext.Provider value={categoryContext}>
                                    <BrandContext.Provider value={brandContext}>
                                        <ModalContext.Provider value={modalContext}>
                                            <ModalBase isOpen={open} id={id}>
                                                {SelectModal()}
                                            </ModalBase>
                                            <main className={styles.layout__main}>{children}</main>
                                        </ModalContext.Provider>
                                    </BrandContext.Provider>
                                </CategoryContext.Provider>
                            </SaleContext.Provider>
                        </InventoryContext.Provider>
                    </ProductContext.Provider>
                </CashRegisterContext.Provider>
            </ClientContext.Provider>
          </UserContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
