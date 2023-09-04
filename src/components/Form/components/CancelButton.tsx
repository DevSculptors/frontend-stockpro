import { Loader } from '@/components/Loader'
import styles from './styles.module.scss'

interface CancelButtonProps {
  buttonText: string
  isLoading?: boolean
}

export function CancelButton ({ buttonText, isLoading }: CancelButtonProps) {
  return (
    <button className={styles.cancelButton} type='submit' disabled={isLoading}>
      {isLoading ? <Loader /> : buttonText}
    </button>
  )
}