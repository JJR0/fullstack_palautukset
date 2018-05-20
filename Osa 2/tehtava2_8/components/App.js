import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { 
					name: 'Arto Hellas',
					number: '040-1234567'
				}
      ],
			newName: '',
			newNumber: ''
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

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleNameChange} />
          </div>
					<div>
    				numero: <input value={this.state.newNumber} onChange={this.handleNumberChange}/>
  				</div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
      
				{this.state.persons.map(person => <div key={person.name}>{person.name} {person.number} </div>)}
      </div>
    )
  }
}

export default App