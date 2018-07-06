import React from 'react';
import personService from '../services/persons'
import '../index.css'

const Henkilo = ({ henkilo, handleDeleteClick }) => {
	return (
		<div>{henkilo.name} {henkilo.number} <button onClick={handleDeleteClick}>Poista</button></div>
	)
}

const LisaaLomake = (props) => {
	const data = props.data
	return (
		<div>
			<h2>Lisää uusi</h2>
			<form onSubmit={data.addPerson}>
				<div>
					Nimi: <input value={data.state.newName} onChange={data.handleNameChange} />
				</div>
				<div>
					Puhelinnumero: <input value={data.state.newNumber} onChange={data.handleNumberChange} />
				</div>
				<div>
					<button type="submit">Lisää</button>
				</div>
			</form>
		</div>
	)
}

const FilterLomake = (props) => {
	const data = props.data
	return (
		<div>
			Rajaa näytettäviä <input value={data.state.filter} onChange={data.handleFilterChange} />
		</div>
	)
}

const Notification = (props) => {
	if (props.message === null) {
		return null
	}

	if (props.type === 'new') {
		return (
			<div className="success">
				Lisättiin {props.message}
			</div>
		)
	} else if (props.type === 'remove') {
		return (
			<div className="success">
				Poistettiin {props.message}
			</div>
		)
	} else if (props.type === 'changed') {
		return (
			<div className="success">
				Henkilön {props.message} numero päivitetty
			</div>
		)
	}

}

class App extends React.Component {
  constructor(props) {
    super(props)
		this.state = {
			persons: [],
			newName: '',
			newNumber: '',
			filter: '',
			message: null,
			notification: ''
		}
	}

	componentDidMount() {
		personService
			.getAll()
			.then(persons => {
				this.setState({ persons })
			})
	}

	addPerson = (event) => {
		event.preventDefault()

		let onkoNimiLisatty = false
		let id

		const newPerson = {
			name: this.state.newName,
			number: this.state.newNumber
		}

		this.state.persons.forEach( (item) => {
			if (this.state.newName === item.name) {
				onkoNimiLisatty = true
				id = item.id
				newPerson.id = id
			}
		})


		// Jos nimi on jo luettelossa kysytään päivitetäänkö puhelinnumero
		if (onkoNimiLisatty) {
			if (window.confirm("Haluatko korvata olemassa olevan yhteystiedon?")) {
				personService
					.update(id, newPerson)
					.then(response => {
						this.setState({
							message: newPerson.name,
							notification: 'changed',
							persons: this.state.persons.map(person => person.id !== id ? person : newPerson)
						})

						setTimeout(() => {
							this.setState({ message: null})
						}, 1000)
					})
			}
			return
		}
		
		// Jos henkilöä ei ole vielä lisätty, luodaan uusi henkilö puhelinluetteloon
		personService
			.create(newPerson)
			.then(person => {
				this.setState({
					persons: this.state.persons.concat(person),
					newName: '',
					newNumber: '',
					message: person.name,
					notification: 'new'
				})

				setTimeout(() => {
					this.setState({ message: null})
				}, 1000)
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

	handleDelete = (id) => {
		return () => {
			if (window.confirm("Haluatko varmasti poistaa kyseisen yhteystiedon?")) {
				personService
				.remove(id)
				.then(response => {
					this.setState({
						message: this.state.persons.filter(person => person.id === id)[0].name,
						notification: 'remove'
					})
				})
				.then(response => {
					this.setState({
						persons: this.state.persons.filter(person => person.id !== id),
					})

					setTimeout(() => {
						this.setState({ message: null})
					}, 1000)
				})
			}
		}
	}

  render() {
		const personsToShow =
			this.state.filter === '' ?
				this.state.persons :
				this.state.persons.filter( person => person.name.toLowerCase().includes(this.state.filter.toLowerCase()))

    return (
      <div>
				
        <h2>Puhelinluettelo</h2>

				<Notification message={this.state.message} type={this.state.notification} />

				<FilterLomake data={this} />
				
				<LisaaLomake data={this} />

        <h2>Numerot</h2>

				{personsToShow.map(person => <Henkilo key={person.id} henkilo={person} handleDeleteClick={this.handleDelete(person.id)} />)}
      </div>
    )
  }
}

export default App