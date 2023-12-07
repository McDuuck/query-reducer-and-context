import { useQuery } from '@tanstack/react-query'
import { useState, useEffect, useReducer } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {NotificationContext, NotificationProvider} from './NotificationContext'
import { NotificationReducer } from './components/Notification'
import { getAll, createNew, update } from './requests/requests'

const initialState = {
  showNotification: false,
  message: ''
};

const App = () => {
  const [anecdoteVotes, setAnecdoteVotes] = useState(false)
  const [refetchToggle, setRefetchToggle] = useState(false)
  const [state, dispatch] = useReducer(NotificationReducer, initialState)


  const handleVote = (anecdote) => {
    anecdote.votes++
    update(anecdote.id, anecdote)
    setAnecdoteVotes(!anecdoteVotes)
    console.log('vote ', anecdote)
    dispatch({ type: 'SHOW_NOTIFICATION', payload: `You voted ${anecdote.content}` })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: 1
  })

  const handleCreate = async (content) => {
    await createNew(content)
    setRefetchToggle(!refetchToggle)
    dispatch({ type: 'SHOW_NOTIFICATION', payload: `You created ${content}` })
  }

  useEffect(() => {
    result.refetch()
  }
  , [refetchToggle, anecdoteVotes])


  if ( result.isLoading ) {
    return <div>Loading data...</div>
  }

  if ( result.isError ) {
    return <div>anecdote service not avaible due to problems in server</div>
  }

  const anecdotes = result.data
  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm onCreate={handleCreate}/>
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
    </NotificationContext.Provider>
  )
}

export default App
