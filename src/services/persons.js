//part-2-c ecercices 2.18 
//Extract the code that handles the communication with the backend into its own  
import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'


const getAll = () =>{
    return axios.get(baseUrl)
}

const create = newObject =>{
    return axios.post(baseUrl,newObject)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
  }

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default {
    getAll,
    create,
    update,
    remove
}