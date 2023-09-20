import React from "react";
import Button from "./Buttoms";
import RoleUser from "./RoleUser";
import styles from "./style.module.scss";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 h-full">
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
          <div className={styles.divButtomEnd}>
            <Button />
            <RoleUser />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
