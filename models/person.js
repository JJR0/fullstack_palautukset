const mongoose = require('mongoose')
const Schema = mongoose.Schema

const url = 'mongodb://fullstackuser:salainen@ds137600.mlab.com:37600/fullstack-persons'

mongoose.connect(url)

const personSchema = new Schema({
	name: String,
	number: String
})

personSchema.statics.format = function(person) {
	return { name: person.name, number: person.number, id: person._id }
}

const Person = mongoose.model('Person', personSchema)

module.exports = Person