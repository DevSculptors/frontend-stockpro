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

import { ClientContext } from "@/context/ClientContext";
import { ModalContext } from "@/context/ModalContext";
import { UserContext } from "@/context/UserContext";
import { CategoryContext } from "@/context/CategoryContext";
import { BrandContext } from "@/context/BrandContext";

import { Client } from "@/interfaces/Client";
import { Category } from "@/interfaces/Category";
import { Brand } from "@/interfaces/Brand";
import { User } from "@/interfaces/User";

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

  const modalContext = useMemo(
    () => ({
      open,
      setOpen,
      id,
      setId,
    }),
    [open, id]
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

      default:
        break;
    }
  }

  return (
    <div className={styles.main}>
      <NavBar {...NavBarData}/>
      <div className={styles.container}>
        <div className={styles.menuContainer}>
          <SideBar {...menuData}/>
        </div>
        <div className={styles.contentContainer}>
          <UserContext.Provider value={userContext}>
            <ClientContext.Provider value={clientContext}>
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
            </ClientContext.Provider>
          </UserContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
