import { useContext } from "react"
import { NotificationContext } from "../NotificationContext";


const AnecdoteForm = ({ onCreate }) => {
  const { dispatch } = useContext(NotificationContext);

  const handleSubmit = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    try {
      await onCreate(content)
      console.log('new anecdote')
    } catch (error) {
      dispatch({ type: 'SHOW_NOTIFICATION', payload: `Too short anecdote, must have length 5 or more` })
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={handleSubmit}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
