import styles from "./style.module.css";

const roleItem = [
  {
    name: "Andres Nausan ",
    roleName: "Admin ",
  },
];
export default function RoleUser() {
  return (
    <ul>
      {roleItem.map(({ name, roleName }, index) => (
        <li key={index} className={styles.nameUser}>
          <div className={styles.divRole}>
            <span className={styles.spanRole}>{name}</span>
            <span className={styles.spanRoleName}>{roleName}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
