import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { 
					name: 'Arto Hellas'
				}
      ],
      newName: ''
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
				name: this.state.newName
			}
	
			const persons = this.state.persons.concat(newPerson)
			this.setState({ persons })
			this.setState({ newName: ''})
		}
	}

	handleInputChange = (event) => {
		this.setState({ newName: event.target.value })
	}

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleInputChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
      
				{this.state.persons.map(person => <div key={person.name}>{person.name}</div>)}
      </div>
    )
  }
}

export default App