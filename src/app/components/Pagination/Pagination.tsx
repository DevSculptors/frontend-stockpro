'use client'
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Table } from "@/components/Table";
import { Client } from "@/interfaces/Client";

import styles from "./style.module.scss";
interface Props {
  items: any | undefined;
}

function Pagination(props: Props) {
  const { items } = props;

  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 9;

  const endOffset = itemOffset + itemsPerPage;

  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);

  const currentItems = items.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  

  return (
    <>
      
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName={styles.pagination}
        pageLinkClassName={styles.page_num}
        previousClassName={styles.page_num}
        nextClassName={styles.page_num}
        activeClassName={styles.active}
      />
    </>
  );
}

export default Pagination;
