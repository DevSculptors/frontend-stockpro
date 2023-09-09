"use client";
import styles from "./style.module.css";
import Image from "next/image";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { LuMousePointerClick } from "react-icons/lu";
import { BsBox } from "react-icons/bs";
import { BsFillBarChartFill } from "react-icons/bs";
import { TiContacts } from "react-icons/ti";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { FiTag } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { BiCart } from "react-icons/bi";
import { BiFileBlank } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";
import { useSidebarContext } from "@/context/SidebarContext";

import { usePathname } from "next/navigation";

const sidebarItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: MdDashboard,
  },
  {
    name: "Estadisticas",
    href: "/dashboard/stats",
    icon: BsFillBarChartFill,
    text: "ANALITICA",
  },
  {
    name: "Inventario Plus",
    href: "/dashboard/inventory_plus",
    icon: LuMousePointerClick,
  },
  {
    name: "Usuarios",
    href: "/dashboard/users",
    icon: TiContacts,
    text: "Administracion",
  },
  {
    name: "Clientes",
    href: "/dashboard/clients",
    icon: FiUsers,
  },
  {
    name: "Inventario",
    href: "/dashboard/inventory",
    icon: BsBox,
    text: "INVENTARIO",
  },
  {
    name: "Proveedores",
    href: "/dashboard/providers",
    icon: BiCart,
  },
  {
    name: "Reportes",
    href: "/dashboard/reports",
    icon: BiFileBlank,
  },
  {
    name: "Marcas y Categorias",
    href: "/dashboard/category",
    icon: FiTag,
  },
  {
    name: "Configuracion",
    href: "/dashboard/settings",
    icon: FiSettings,
    text: (
      <>
        <br />
        <br />
        <br />
        <br />
        <br />
        <h1>Settings</h1>
      </>
    ),
  },
  {
    name: "Salir",
    href: "/logout",
    icon: CiLogout,
  },
];

export default function SideBar() {
  const pathname = usePathname();

  const { isCollapsed, toggleSidebarcollapse } = useSidebarContext();

  // console.log(isCollapsed);

  return (
    <div className={styles.sidebar__wrapper}>
      <button className={styles.btn} onClick={toggleSidebarcollapse}>
        {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
      </button>
      <aside className={styles.sidebar} data-collapse={isCollapsed}>
        <div className={styles.sidebar__top}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={80}
            height={80}
            className={styles.sidebar__logo}
          />
          <p className={styles.sidebar__logo_name}>Stock-Pro</p>
        </div>
        <br />
        <ul className={styles.sidebar__list}>
          {sidebarItems.map(({ name, href, icon: Icon, text }) => (
            <li className={styles.sidebar__item} key={name}>
              <span className={styles.sidebar__text}>{text}</span>
              <Link
                className={
                  pathname === href
                    ? styles.sidebar__link_active
                    : styles.sidebar__link
                }
                href={href}
              >
                <div className={styles.sidebar__icon}>
                  <Icon />
                </div>
                <span className={styles.sidebar__name}>{name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
