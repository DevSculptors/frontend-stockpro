"use client";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "@/components/DataTable/DataTable";
import { userRows } from "@/api/dataTest";
import { BsFillTrashFill } from "react-icons/bs";

import styles from "./style.module.scss";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    type: "string",
    headerName: "First name",
    width: 150,
  },
  {
    field: "lastName",
    type: "string",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phone",
    type: "string",
    headerName: "Phone",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "string",
  },
  {
    field: "verified",
    headerName: "Verified",
    width: 150,
    type: "boolean",
  },
  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          <div className="delete">
            <BsFillTrashFill />
          </div>
        </div>
      );
    },
  },
];

function TestTable() {
  const handle = () => {
    console.log("handle");
  };

  return (
    <div className={styles.table}>
      <div className={styles.info}>
        <h1>Table</h1>
        <button onClick={handle}>Botton</button>
      </div>
      <DataTable
        slug="users"
        columns={columns}
        rows={userRows}
        pagination={5}
        
      />
      {/* TEST THE API */}

      {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="users" columns={columns} rows={data} />
      )} */}
    </div>
  );
}

export default TestTable;
