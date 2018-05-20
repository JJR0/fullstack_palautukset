import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

// Syntax:
// axios.get(url[, config])
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// Syntax:
// axios.post(url, data[, config])
const create = (newPerson) => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(response => response.data)
}

// Syntax:
// axios.delete(url[, config])
const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

// Muut
// axios.put(url[, data[, config]])
// axios.patch(url[, data[, config]])

export default { getAll, create, remove, update }