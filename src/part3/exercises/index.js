const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express()
//exercise 3.7 and 3.8 loging posts to the console 
app.use(express.json())
app.use(morgan('tiny'))
morgan.token('body', (request)=> JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

//
app.use(cors())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
//exercise 3.1 diplayine the persons as a hardcoded json 
app.get('/api/persons' , (request , response)=>{
    response.json(persons)
})
//exercise 3.2 implementing info page to show the time that the request was received and how many entries are in the phonebook
//using response.send() 
app.get('/api/info', (request,response) =>{
    const currentTime = new Date()
    const phoneBookCount = persons.length;

    const responseMessage = `
    <p>Phone book has info for ${phoneBookCount} people</p>
    <p>${currentTime}</p>
    `

    response.send(responseMessage)
})
//exercise 3.3 displaying single persons information using the ids
app.get('/api/persons/:id' , (request,response) =>{
    const id = request.params.id;
    const person = persons.find(person => person.id == id)
    if(person){
        response.json(person)
    }else{
        response.status(404).end()
    }
})
//exercise 3.4 deleting from the phonebook using the delete http request using postman 
app.delete('/api/persons/:id',(request,response)=>{
    const id = request.params.id;
    const person = persons.filter(person => person.id !== id)

    response.status(204).end()
  })

//exercise 3.5 adding persons informations to the phoneBook threw the post method
//first we generate the new id for the new person
const generatedId = ()=>{
    const maxId = persons.length > 0
    ? Math.max(...persons.map(n=>Number(n.id)))
    :0
    return String(maxId + 1)
}

app.post('/api/persons',(request,response) =>{
    const body = request.body

    // Check if the name or number is missing
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number is missing'
        });
    }

    // Check if the name already exists in the phonebook
    const nameExists = persons.some(person => person.name === body.name);
    if (nameExists) {
        return response.status(400).json({
            error: 'name must be unique'
        });
    }

    const person = {
        number: body.number,
        name:body.name,
        id:generatedId()
    }
    persons = persons.concat(person)

    response.json(person)
})

const PORT = proccess.env.PORT || 3001;
app.listen(PORT,()=>{
    console.log(`server runing on ${PORT}`)
})