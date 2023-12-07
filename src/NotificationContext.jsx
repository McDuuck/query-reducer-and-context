import React, { useReducer, createContext } from 'react'
import { NotificationReducer } from './components/Notification.jsx'

const NotificationContext = createContext()

const initialState = {
  showNotification: false,
  message: ''
}

const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(NotificationReducer, initialState)

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  )
}


export { NotificationContext, NotificationProvider }