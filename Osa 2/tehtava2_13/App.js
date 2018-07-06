import React from 'react'
import axios from 'axios'

const Valtio = (props) => {
  return (
    <div>
      <h2>{props.country.name}</h2>
      <p>Pääkaupunki: {props.country.capital}</p>
      <p>Väkiluku: {props.country.population}</p>
      <p><img src={props.country.flag} alt={props.country.name} width="400"></img></p>
    </div>
  )
}

const FilterLomake = (props) => {
  return (
    <div>
      <h2>Maailman valtiot</h2>
      Hae valtioita: <input value={props.data.state.filter} onChange={props.data.handleFilterChange} />
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  handleClick = (country) => {
    this.setState({ filter: country.name })
  } 

  render() {
    const countriesToShow =
      this.state.filter === '' ?
      [] :
      this.state.countries.filter(countries => countries.name.toLowerCase().includes(this.state.filter.toLowerCase()))

    return (
      <div>
        <FilterLomake data={this} />
        <div>
          {(() => {
            switch (true) {
              case (countriesToShow.length > 10): 
                return <p>Liian monta valtiota löydetty, tarkenna hakua</p>
              case (countriesToShow.length > 1 && countriesToShow.length <= 10): 
                return <div>{countriesToShow.map(country => <div key={country.name} onClick={() => this.handleClick(country)}>{country.name}</div> )}</div>
              case (countriesToShow.length === 1):
                return <div><Valtio country={countriesToShow[0]} /></div>
              default:
                return
            }
          })()}
        </div>
      </div>
    )
  }
}

export default App