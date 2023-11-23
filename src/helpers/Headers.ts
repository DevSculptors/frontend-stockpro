import { MdDashboard } from "react-icons/md";
import { LuMousePointerClick } from "react-icons/lu";
import { BsBox } from "react-icons/bs";
import { BsFillBarChartFill } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { FiTag } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
import { AiOutlineUser } from "react-icons/ai";
import { FaClipboardList } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaCashRegister } from "react-icons/fa6";

export const menuData = {
  datakey: "admin",
  menu: [
    {
      id: 1,
      title: "Principal",
      listItems: [
        {
          id: 1,
          title: "Dashboard",
          url: "/dashboard",
          icon: MdDashboard,
        },
        {
          id: 2,
          title: "Perfil",
          url: "/dashboard/user",
          icon: AiOutlineUser,
        },
      ],
    },
    {
      id: 2,
      title: "Analitica",
      listItems: [
        {
          id: 1,
          title: "Inventario Plus",
          url: "/dashboard/inventory_plus",
          icon: LuMousePointerClick,
        },
      ],
    },
    {
      id: 3,
      title: "Listas",
      listItems: [
        {
          id: 1,
          title: "Usuarios",
          url: "/dashboard/users",
          icon: FiUsers,
        },
        {
          id: 2,
          title: "Clientes",
          url: "/dashboard/clients",
          icon: HiOutlineUserCircle,
        },
        {
          id: 3,
          title: "Marcas y Categorias",
          url: "/dashboard/category",
          icon: FiTag,
        },
        {
          id: 4,
          title: "Inventario",
          url: "/dashboard/inventory",
          icon: BsBox,
        },
        {
          id: 5,
          title: "Compras",
          url: "/dashboard/buys",
          icon: AiOutlineShoppingCart,
        },
        {
          id: 6,
          title: "Ventas",
          url: "/dashboard/sales",
          icon: FaClipboardList,
        },
        {
          id: 7,
          title: "Registradoras",
          url: "/dashboard/cashRegister",
          icon: FaCashRegister,
        },
       
      ],
    },
    {
      id: 4,
      title: "Log out",
      listItems: [
      
        {
          id: 1,
          title: "Salir",
          url: "/logout",
          icon: CiLogout,
        },
      ],
    },
  ],
};
