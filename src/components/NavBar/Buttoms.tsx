"use client";
import Link from "next/link";
import styles from "./style.module.css";
import {AiOutlineQuestionCircle} from "react-icons/Ai";
import {AiOutlineSetting} from "react-icons/Ai";
import {IoNotificationsOutline} from "react-icons/io5";
const searchItems = [
    {
        name: '',
        href: "/dashboard",
        icon: AiOutlineQuestionCircle,
    },
    {
        name: '',
        href: "/dashboard",
        icon: AiOutlineSetting,
    },
    {
        name: '',
        href: "/dashboard",
        icon: IoNotificationsOutline,
    },
]
export default function Buttoms() {
    return (
        searchItems.map(({ name,href, icon: Icon}) => (
            <ul>
                <li>
                    <Link
                        className={
                            href
                                ? styles.sidebar__link_active
                                : styles.sidebar__link
                        }
                        href={href}
                    >
                        <div className={styles.sidebar__icon}>
                            <Icon />
                        </div>
                        <span className={styles.sidebar__name}>{name}</span>
                    </Link>
                </li>
            </ul>
        )
    ))
};
