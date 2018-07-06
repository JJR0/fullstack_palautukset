import React from 'react';
import axios from 'axios'

import personService from '../services/persons'

const Henkilo = ({ henkilo }) => <div>{henkilo.name} {henkilo.number}</div>

const LisaaLomake = (props) => {
	const data = props.data
	return (
		<div>
			<h2>Lisää uusi</h2>
			<form onSubmit={data.addPerson}>
				<div>
					nimi: <input value={data.state.newName} onChange={data.handleNameChange} />
				</div>
				<div>
					numero: <input value={data.state.newNumber} onChange={data.handleNumberChange} />
				</div>
				<div>
					<button type="submit">lisää</button>
				</div>
			</form>
		</div>
	)
}

const FilterLomake = (props) => {
	const data = props.data
	return (
		<div>
			rajaa näytettäviä <input value={data.state.filter} onChange={data.handleFilterChange} />
		</div>
	)
}

class App extends React.Component {
  constructor(props) {
    super(props)
		this.state = {
			persons: [],
			newName: '',
			newNumber: '',
			filter: ''
		}
		console.log('constructor')
	}

	componentDidMount() {
		console.log('will mount')

		personService
			.getAll()
			.then(persons => {
				this.setState({ persons })
			})
	}

	addPerson = (event) => {
		event.preventDefault()

		let onkoNimiLisatty = false

		this.state.persons.forEach( (item) => {
			if (this.state.newName === item.name) {
				onkoNimiLisatty = true
			}
		})

		if (onkoNimiLisatty) {
			return
		} 
		
		const newPerson = {
			name: this.state.newName,
			number: this.state.newNumber
		}
	
		personService
			.create(newPerson)
			.then(person => {
				this.setState({
					persons: this.state.persons.concat(person),
					newName: '',
					newNumber: ''
				})
			})
	}

	handleNameChange = (event) => {
		this.setState({ newName: event.target.value })
	}

	handleNumberChange = (event) => {
		this.setState({ newNumber: event.target.value })
	}

	handleFilterChange = (event) => {
		this.setState({ filter: event.target.value })
	}

  render() {
		console.log('render')
		const personsToShow =
			this.state.filter === '' ?
				this.state.persons :
				this.state.persons.filter( person => person.name.toLowerCase().includes(this.state.filter.toLowerCase()))

    return (
      <div>
        <h2>Puhelinluettelo</h2>

				<FilterLomake data={this} />
				
				<LisaaLomake data={this} />

        <h2>Numerot</h2>
				{personsToShow.map(person => <Henkilo key={person.name} henkilo={person} />)}
      </div>
    )
  }
}

export default App