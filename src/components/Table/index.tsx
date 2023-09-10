"use client";

import { Row } from "./components";
import { createContext } from "react";
import styles from "./styles.module.scss";

type TableValues = Record<string, string>;

interface TableContextType {
  tableValues: TableValues;
  setTableValues: React.Dispatch<React.SetStateAction<TableValues>>;
}

interface TableProps {
  name: String;
  columnNames: string[];
  children: React.ReactNode;
}

export function Table({  columnNames, children }: TableProps) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columnNames.map((columnName, index) => (
            
            <th key={index}>{columnName}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

Table.Row = Row;
