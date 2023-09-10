

import React from "react";
import Link from "next/link";
import Button from "./Buttoms";
import SearchButton from "./SearchButtom"
import RoleUser from "./RoleUser";
import styles from "./style.module.css";
import Image from "next/image";

const Navbar = () => {
    return (
        <>
            <div className="w-full h-20  sticky top-0 bg-white">
                <nav className="container mx-auto px-4 h-full">
                    <div className="flex justify-between items-center h-full">
                        <div className={styles.sidebar__top}>
                            <Image
                                src="/logo.png"
                                alt="Logo"
                                width={90}
                                height={90}
                                className={styles.sidebar__logo}
                            />
                            <p className={styles.sidebar__logo_name}>Stock-Pro</p>
                        </div>
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
                </nav>
            </div>
        </>
    );
};

export default Navbar;