const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

morgan.token('data', (req, res) =>  {
	return JSON.stringify({ name: req.body.name, number: req.body.number })
})

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())
app.use(morgan(':method :url :data :status :res[content-length] - :response-time ms'))

// GET pyyntö, joka palauttaa henkilöt JSON-muotoisena merkkijonona
app.get('/api/persons', (req, res) => {
	Person
		.find({})
		.then(persons => {
			res.json(persons.map(Person.format))
		})
		.catch(error => {
			console.log(error)
		})
})

app.get('/info', (req, res) => {
	Person
		.find({})
		.then(persons => {
			res.send(`puhelinluettelossa on ${persons.length} henkilon tiedot <br> ${new Date()}`)
		})
		.catch(error => {
			console.log(error)
		})
})

app.get('/api/persons/:id', (req, res) => {
	Person
		.findById(req.params.id)
		.then(person => {
			if (person) {
				res.json(Person.format(person))
			} else {
				res.status(404).end()
			}
		})
		.catch(error => {
			console.log(error)
			res.status(400).send({ error: 'malformatted id ' })
		})
})

app.delete('/api/persons/:id', (req, res) => {
	Person
		.findByIdAndRemove(req.params.id)
		.then(result => {
			res.status(204).end()
		})
		.catch(error => {
			console.log(error)
			res.status(400).send({ error: 'malformatted id' })
		})
})

app.post('/api/persons', (req, res) => {
	const body = req.body

	if (body.name === undefined) {
		return res.status(400).json({ error: 'name is missing' })
	} else if (body.number === undefined) {
		return res.status(400).json({ error: 'number is missing' })
	}

	const person = new Person({
		name: body.name,
		number: body.number
	})

	person
		.save()
		.then(savedPerson => {
			res.json(Person.format(savedPerson))
		})
		.catch(error => {
			console.log(error)
		})
})

app.put('/api/persons/:id', (req, res) => {
	const body = req.body

	const person = {
		name: body.name,
		number: body.number
	}

	Person
		.findByIdAndUpdate(req.params.id, person, { new: true })
		.then(updatedPerson => {
			res.json(Person.format(updatedPerson))
		})
		.catch(error => {
			console.log(error)
			res.status(400).send({ error: 'malformatted id' })
		})
})

const error = (req, res) => {
	res.status(404).send({ error: 'unknown endpoint' })
}

app.use(error)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})