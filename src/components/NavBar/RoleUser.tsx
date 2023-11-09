"use client";
import { IoIosArrowDown } from "react-icons/io";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./style.module.scss";
import {capitalizeFirstLetter} from "@/helpers/Utils";
import { useState, useEffect } from "react";
import { use } from "chai";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
export default function RoleUser() {
  const router = useRouter();

  const [formattedUsername, setFormattedUsername] = useState<string>("");
  const [formattedRole, setFormattedRole] = useState<string>("");
  const [role, setRol] = useState("");

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    const role = sessionStorage.getItem("role");
    if(role){
      setRol(role);
    }
    const formattedUsername = capitalizeFirstLetter(username);
    const formattedRole = capitalizeFirstLetter(role);
    setFormattedRole(formattedRole);
    setFormattedUsername(formattedUsername);

  },[]);

  const handleLogOut = () => {
    if(role=='cashier'){
      router.push("/cashier/logoutCashier");
    }else router.push("/logout")
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <div className={styles.divRole}>
            <span className={styles.nameUser}>{formattedUsername}</span>
            <span className={styles.roleUser}>{formattedRole}</span>
          </div>
          <IoIosArrowDown
            className="-mr-1 h-5 w-5 text-gray-800"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/dashboard/user"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Detalles Cuenta
                </Link>
              )}
            </Menu.Item>
            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={handleLogOut}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full px-4 py-2 text-left text-sm"
                    )}
                  >
                    Cerrar Sesion
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
