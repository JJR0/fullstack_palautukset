import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      pisteet: [0, 0, 0, 0, 0, 0],
      aanet: 0
    }
  }

  arvoSeuraava = () => {
    return () => {
      this.setState({selected: Math.floor(Math.random() * 6)})
    }
  }

  annaAani = () => {
    return () => {
      const kopio = [...this.state.pisteet]
      kopio[this.state.selected] += 1
      this.setState({pisteet: kopio})
      this.setState({aanet: this.state.aanet + 1})
    }
  }

  naytaEniten = ({ anecdotes }) => {
    if (this.state.aanet === 0 ) {
      return (
        <div>
          Ei ole vielä annettu yhtään ääntä.
        </div>
      )
    } else {
      const a = this.state.pisteet
      const ind_max = a.reduce((ind_max, elem, ind, a) => {
        return elem >= a[ind_max] ? ind : ind_max
      }, 0)

      return (
        <div>
          {anecdotes[ind_max]} <br/>
          has {a[ind_max]} votes.<br />
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.props.anecdotes[this.state.selected]} <br />
        has {this.state.pisteet[this.state.selected]} votes. <br />
        <Button handleClick={this.annaAani()} text="Vote" />
        <Button handleClick={this.arvoSeuraava()} text="next anecdote"/><br />
        
        <h2>Anecdote with most votes</h2>
        <div>{this.naytaEniten(this.props)}</div>
      </div>
    )
  }
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}> {text}  </button>
)

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)