import { useContext, useEffect } from "react"
import {NotificationContext} from "../NotificationContext"

const initialState = {
  showNotification: false,
  message: ''
}

export const NotificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        ...state,
        showNotification: true,
        message: action.payload
      }
    case 'HIDE_NOTIFICATION':
      return { ...state, showNotification: false }
    default:
      return state
  }
}

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  const { state, dispatch } = useContext(NotificationContext);

  useEffect(() => {
    if (state.showNotification) {
      const timer = setTimeout(() => {
        dispatch({ type: 'HIDE_NOTIFICATION' });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [state.showNotification, dispatch]);

  if (state.showNotification) {
    return (
      <div style={style}>
        {state.message}
      </div>
    )
  }
  return null
}

export default Notification