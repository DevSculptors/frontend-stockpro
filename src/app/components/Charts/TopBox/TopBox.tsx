import styles from "./style.module.scss";

import { topDealUsers } from "@/api/dataTest";

const TopBox = () => {
  return (
    <div className={styles.topBox}>
      <h1>Top Clientes</h1>
      <div className={styles.list}>
        {topDealUsers.map((user) => (
          <div className={styles.listItem} key={user.id}>
            <div className={styles.user}>
              <div className={styles.userTexts}>
                <span className={styles.username}>{user.username}</span>
                <span className={styles.email}>{user.email}</span>
              </div>
            </div>
            <span className={styles.amount}>${user.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBox;
