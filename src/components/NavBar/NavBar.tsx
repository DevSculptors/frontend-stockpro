import React from "react";
import RoleUser from "./RoleUser";
import styles from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";

import { AiOutlineSetting } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";

interface Props {
  logoHref: string;
  settingsHref: string;
  notificationsHref: string;
}

const Navbar = (props:Props) => {

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Link href={props.logoHref}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={50}
            height={50}
            className={styles.logo}
          />
          <span>Stock Pro</span>
        </Link>
      </div>
      <div className={styles.icons}>
        <Link href={props.settingsHref}>
          <AiOutlineSetting className={styles.icon} />
        </Link>
        <Link href={props.notificationsHref}>
          <div className={styles.notification}>
            <IoNotificationsOutline className={styles.icon} />
            <span>1</span>
          </div>
        </Link>
        <RoleUser />
      </div>
    </div>
  );
};

export default Navbar;
