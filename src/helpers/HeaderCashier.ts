import { BsFillBarChartFill } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
import { AiOutlineUser } from "react-icons/ai";
import { FaClipboardList } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";
import { BsBox } from "react-icons/bs";


export const menuData = {
  datakey: "cashier",
  menu: [
    {
      id: 1,
      title: "Principal",
      listItems: [
        {
          id: 1,
          title: "Perfil",
          url: "/cashier/user",
          icon: AiOutlineUser,
        },
      ],
    },
    {
      id: 2,
      title: "Caja",
      listItems: [
        {
          id: 1,
          title: "Ventas",
          url: "/cashier/cash",
          icon: FaClipboardList,
        },
        {
          id: 2,
          title: "Productos",
          url: "/cashier/products",
          icon: BsBox,
        },
      ],
    },
    {
      id: 3,
      title: "Mantenimiento",
      listItems: [
        {
          id: 1,
          title: "Configuracion",
          url: "/cashier/settings",
          icon: FiSettings,
        },
        {
          id: 2,
          title: "Salir",
          url: "/cashier/logoutCashier",
          icon: CiLogout,
        },
      ],
    },
  ],
};
