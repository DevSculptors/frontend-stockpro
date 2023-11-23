"use client";
import styles from "./style.module.scss";
import Link from "next/link";


import { usePathname } from "next/navigation";

interface MenuItem {
  id: number;
  title: string;
  listItems: ListItem[];
}

interface ListItem {
  id: number;
  title: string;
  url: string;
  icon: any;
}

interface Props {
  datakey: string;
  menu: MenuItem[];
}

const Side = (props: Props) => {

  const pathname = usePathname();

  return (
    <div className={styles.menu}>
      {props.menu.map((item) => (
        <div className={styles.item} key={item.id}>
          <span className={styles.title}>{item.title}</span>
          {item.listItems.map((listItem) => (
            <Link href={listItem.url} className={
              pathname === listItem.url
                ? styles.listItem_active
                : styles.listItem
            } key={listItem.id}>
              <div>
                <listItem.icon />
              </div>
              <span className={styles.listItemTitle}>{listItem.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Side;