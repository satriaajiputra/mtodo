import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getUser(username) {
    return request.get('/users', {
      params: {
        username
      }
    })
  },
  saveUser({ username, name }) {
    return request.post('/users', {
      username,
      name
    })
  },
  getToDos(authorID) {
    return request.get('/todos', {
      params: {
        author: authorID,
        _sort: 'id',
        _order: 'desc'
      }
    })
  },
  setCompleted(id, todo) {
    return request.put('/todos/' + id, {
      ...todo
    })
  },
  deleteToDo(id) {
    return request.delete('/todos/' + id)
  },
  saveToDo(todo) {
    return request.post('/todos', todo)
  }
}
