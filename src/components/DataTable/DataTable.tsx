
import {
  DataGrid,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import Link from "next/link";
import {AiFillEdit} from "react-icons/ai";
import {BsFillTrashFill } from "react-icons/bs";

// import { useMutation, useQueryClient } from "@tanstack/react-query";

import styles from './style.module.scss'

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
};

const DataTable = (props: Props) => {

  // TEST THE API

  // const queryClient = useQueryClient();
  // const mutation = useMutation({
  //   mutationFn: (id: number) => {
  //     return fetch(`http://localhost:8800/api/${props.slug}/${id}`, {
  //       method: "delete",
  //     });
  //   },
  //   onSuccess: ()=>{
  //     queryClient.invalidateQueries([`all${props.slug}`]);
  //   }
  // });

  const handleDelete = (id: number) => {
    console.log(id);
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className={styles.action}>
          <Link href={`/${props.slug}/${params.row.id}`}>
            <AiFillEdit/>
          </Link>
          <div className={styles.delete} onClick={() => handleDelete(params.row.id)}>
            <BsFillTrashFill/>
          </div>
        </div>
      );
    },
  };

  return (
    <div className={styles.dataTable}>
      <DataGrid
        className={styles.dataGrid}
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTable;
