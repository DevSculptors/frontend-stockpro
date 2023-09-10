import styles from "./style.module.css";
import { IoIosArrowDown } from 'react-icons/io';

const roleItem = [
  {
    name: "Andres Nausan ",
    roleName: "Administrador",
  },
];

export default function RoleUser() {
  return (
    <ul>
      {roleItem.map(({ name, roleName }, index) => (
        <li key={index} className={styles.nameUser}>
          <div className={styles.divNameRol}>
            <div className={styles.divRole}>
              <span className={styles.nameUser}>{name}</span>
              <span className={styles.roleUser}>{roleName}</span>
            </div>
            <div>
              <a href= "/dashboard">
                <IoIosArrowDown size={24} />
              </a>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
