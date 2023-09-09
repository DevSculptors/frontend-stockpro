"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LuSearch } from "react-icons/lu";
import styles from "./style.module.css";

const searchItems = [
  {
    href: "/dashboard",
    icon: LuSearch,
  },
];
export default function SearchButton() {
  return (
    <ul>
      {searchItems.map(({ href, icon: Icon }, index: number) => (
        <li key={index}>
          <form>
            <div className={styles.divSearch}>
              <Icon className={styles.iconSearch} />
              <input
                type="text"
                placeholder="Buscar, producto,usuario,cliente "
                className={styles.inputSearch}
              />
            </div>
          </form>
        </li>
      ))}
    </ul>
  );
}
