import {StatusNotification} from '@/interfaces/Notifications'
import { Notification } from '@/components/Notification'

import { createContext, useState, useContext } from 'react'


interface IState{
  open: boolean
  status: StatusNotification
  msj: string | null
}

interface INotification extends IState{
  showNotification:(props: IState) => void
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

const defaultState: IState = {
  open: false,
  status: null,
  msj: null
}

const NotificationContext = createContext<INotification>(
  {} as INotification
)

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {

  const [notification, setNotification] = useState<IState>(defaultState)

  const showNotification = (props: IState) => {
    if (props) {
      setNotification(props)

      setTimeout(() => {
        setNotification({ open: false, msj: null, status: null })
      }, 3000)
    }
  }

  return (
    <NotificationContext.Provider value={{ ...notification, showNotification }}>
      {children}
      {notification.open && (
        <>
          <Notification status={notification.status} msj={notification.msj} />
        </>
      )}
    </NotificationContext.Provider>
  )
}

export default NotificationContext