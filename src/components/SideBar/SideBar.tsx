'use client';
import styles from './style.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { MdDashboard } from 'react-icons/md';
import { LuMousePointerClick } from "react-icons/lu";
import { BsBox } from 'react-icons/bs';
import {BsFillBarChartFill} from 'react-icons/bs';
import { TiContacts } from "react-icons/ti";
import { MdKeyboardArrowRight,MdKeyboardArrowLeft } from 'react-icons/md';
import { useSidebarContext } from '@/context/SidebarContext';

import { usePathname } from 'next/navigation';

const sidebarItems = [{
  name: "Dashboard",
  href: "/dashboard",
  icon: MdDashboard,
},
{
  name: "Estadisticas",
  href: "/stats",
  icon: BsFillBarChartFill,
},
{
  name: "Inventario Plus",
  href: "/inventory_plus",
  icon: LuMousePointerClick,
},
{
  name: "Usuarios",
  href: "/users",
  icon: TiContacts,
},
{
  name: "Inventario",
  href: "/inventory",
  icon: BsBox,
},
];



export default function SideBar() {

  const pathname = usePathname();
  

  const { isCollapsed, toggleSidebarcollapse } = useSidebarContext();
  
  return (
    <div className={styles.sidebar__wrapper}>
      <button className={styles.btn}
      onClick={toggleSidebarcollapse}>
        {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
      </button>
      <aside className={styles.sidebar}  data-collapse={isCollapsed}>
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
        <ul className={styles.sidebar__list}>
          {sidebarItems.map(({ name, href, icon: Icon }) => (
            <li className={styles.sidebar__item} key={name}>
              <Link
                className={`${styles.sidebar__link} 
                ${
                  pathname === href ? "styles.sidebar__link--active" : ""}`}
                href={href}
                >
                
                <div className={styles.sidebar__icon}>
                  <Icon />
                </div>
                <span className={styles.sidebar__name}>
                  {name}
                </span>
              </Link>
            </li>
          ))}
          
        </ul>
      </aside>
    </div>
  );
}
