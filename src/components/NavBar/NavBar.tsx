import React from "react";
import Link from "next/link";
import Button from "./Buttoms";
import SearchButton from "./SearchButtom"
import RoleUser from "./RoleUser";
import styles from "./style.module.css";

const Navbar = () => {
    return (
        <>
            <div className="w-full h-20  sticky top-0 bg-white">
                <div className="container mx-auto px-4 h-full">
                    <div className="flex justify-between items-center h-full">
                        <ul className="hidden md:flex gap-x-6 ">
                            <li>
                                <SearchButton />
                            </li>
                        </ul>
                        <ul className={styles.divButtomEnd}>
                            <Button />
                            <RoleUser/>
                        </ul>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;