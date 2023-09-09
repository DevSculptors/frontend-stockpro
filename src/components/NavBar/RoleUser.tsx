import styles from './style.module.css';
const roleItem = [
    {
        name : 'Andres Nausan ',
        roleName : 'Admin ',
    }
]
export default function RoleUser(){
    return (
        roleItem.map(({name, roleName}) => (
            <ul>
                <li className={styles.nameUser}>
                    <span>{name}</span>
                </li>
                <li className={styles.roleUser}>
                    <span>{roleName}</span>
                </li>
            </ul>

        ))
    )
}