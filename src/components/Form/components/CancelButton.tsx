import { Loader } from '@/components/Loader'
import styles from './styles.module.scss'

interface CancelButtonProps {
  buttonText: string
  isLoading?: boolean
  onClick?: () => void
}

export function CancelButton ({ buttonText, isLoading,onClick }: CancelButtonProps) {
  return (
    <button className={styles.cancelButton} type='button'  onClick={onClick} disabled={isLoading}>
      {isLoading ? <Loader /> : buttonText}
    </button>
  )
}