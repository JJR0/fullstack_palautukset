const express = require('express')
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

morgan.token('data', (req, res) =>  {
	return JSON.stringify({name: req.body.name, number: req.body.number })
})

app.use(cors())
app.use(bodyParser.json())
app.use(morgan(':method :url :data :status :res[content-length] - :response-time ms'))

let persons = [
	{
		name: 'Arto Hellas',
		number: '040-123456',
		id: 1
	},
	{
		name: 'Martti Tienari',
		number: '040-123456',
		id: 2
	},
	{
		name: 'Arto Järvinen',
		number: '040-123456',
		id: 3
	},
	{
		name: 'Lea Kutvonen',
		number: '040-123456',
		id: 4
	}
]

// GET pyyntö, joka palauttaa henkilöt JSON-muotoisena merkkijonona
app.get('/api/persons', (req, res) => {
	res.json(persons)
})

app.get('/info', (req, res) => {
	const lukumaara = persons.length
	res.send(`puhelinluettelossa on ${lukumaara} henkilon tiedot <br> ${new Date()}`)
})

app.get('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	const person = persons.find(person => person.id === id)

	if (person) {
			res.send(person)
	} else {
			res.status(404).end()
	}
})

app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	persons = persons.filter(person => person.id !== id)
	res.status(204).end()
})

app.post('/api/persons', (req, res) => {
	const body = req.body

	if (body.name === undefined) {
		return res.status(400).json({error: 'name is missing'})
	} else if (body.number === undefined) {
		return res.status(400).json({error: 'number is missing'})
	} else if (persons.filter(person => person.name === body.name).length === 1) {
		return res.status(400).json({error: 'name must be unique'})
	}

	const person = {
		name: body.name,
		number: body.number,
		id: Math.floor(Math.random() * 9999 + 1)
	}

	console.log("lisätty henkilö", person.name)
	persons.concat(person)
	res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})