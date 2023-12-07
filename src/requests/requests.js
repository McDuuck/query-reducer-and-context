import axios from 'axios'

export const getAll = () => 
    axios.get('http://localhost:3001/anecdotes').then(response => response.data)

export const createNew = (content) =>
    axios.post('http://localhost:3001/anecdotes', {content, votes: 0}).then(response => response.data)

export const update = (id, newObject) =>
    axios.put(`http://localhost:3001/anecdotes/${id}`, newObject).then(response => response.data)
    