import React from 'react';

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
			persons: [
				{ name: 'Arto Hellas', number: '040-123456' },
				{ name: 'Martti Tienari', number: '040-123456' },
				{ name: 'Arto Järvinen', number: '040-123456' },
				{ name: 'Lea Kutvonen', number: '040-123456' }
			],
			newName: '',
			newNumber: '',
			filter: ''
		}
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
		} else {
			const newPerson = {
				name: this.state.newName,
				number: this.state.newNumber
			}
	
			const persons = this.state.persons.concat(newPerson)
			this.setState({ persons })
			this.setState({ newName: ''})
			this.setState({ newNumber: ''})
		}
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
		const personsToShow =
			this.state.filter === '' ?
				this.state.persons :
				this.state.persons.filter( person => person.name.includes(this.state.filter))

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