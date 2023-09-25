"use client";
import styles from "./styles.module.scss";
import React, {useState} from "react";

interface CatalogProps {
    name: String;
    itemsPerPage: number;
    children: React.ReactNode;
}
export function Catalog({  name,children, itemsPerPage }: CatalogProps) {
    /**console.log({name})
    const { items } = children;

    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + {itemsPerPage};

    console.log(`Loading items from ${itemOffset} to ${endOffset}`);

    const currentItems = items.slice(itemOffset, endOffset);

    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };*/
    return (
        <div>
            <div>
                <div className={styles.containerTittle}>
                    <p className={styles.tittleList}>{name}</p>
                </div>
                {children}
            </div>
            <div>
                {/**<ReactPaginate
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
                />*/}
            </div>
        </div>
    );
}
