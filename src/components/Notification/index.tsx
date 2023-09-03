import { StatusNotification } from '@/interfaces/Notifications'
import styles from './styles.module.scss'

interface Props {
  status: StatusNotification
  msj: string | null
}

export const Notification = ({ status, msj }: Props) => {
  return (
    <div className={`${styles.notification} ${styles[status!]}`}>
      <p className={styles.text}>{msj}</p>
    </div>
  )
}