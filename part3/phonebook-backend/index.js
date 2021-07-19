import express, { request, response } from 'express'
const app = express()
app.use(express.json())

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/', (request, response) => {
  response.send('<h1>dummy checks</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const length = persons.length
  response.send(`<p>Phonebook has info for ${length} people</p> <p>${new Date}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  console.log(person)
  if(person){
    response.json(person)
  }else{
    response.statusCode(404).end()
  }
})

app.delete('/api/persons/:id',(request,response)=>{
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  console.log("sending req")
  const body = request.body

  if (!body.name || !body.number) {
      return response.status(400).json({
          error: 'name or number is missing'
      })
  } else if (persons.find(person => person.name === body.name)) {
      response.status(400).json({
          error: 'name must be unique'
      })
  }

  const person = {
      id: Math.floor(Math.random() * 9999),
      name: body.name,
      number: body.number,
  }

  persons = persons.concat(person)

  response.json(person)
})
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})