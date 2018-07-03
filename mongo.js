const mongoose = require('mongoose')

const url = 'mongodb://fullstackuser:salainen@ds137600.mlab.com:37600/fullstack-persons'

mongoose.connect(url)

const Person = mongoose.model('Person', {
	name: String,
	number: String
})

if (process.argv[2] === undefined && process.argv[3] === undefined) {
	Person
		.find({})
		.then(result => {
			result.forEach(person => {
				console.log(`${person.name} ${person.number}`)
			})
			mongoose.connection.close()
		})
} else {
	const person = new Person({
		name: process.argv[2],
		number: process.argv[3]
	})

	person
		.save()
		.then(response => {
			console.log(`lisätään henkilö ${person.name} numero ${person.number} luetteloon`)
			mongoose.connection.close()
		})
}