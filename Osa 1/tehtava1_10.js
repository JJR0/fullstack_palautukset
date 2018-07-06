import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0,
      keskiarvo: 0,
      positiivisia: 0
    }
  }

  annaPalautetta = (tyyppi) => {
    return () => {
      this.setState({ [tyyppi]:  this.state[tyyppi] + 1})
      this.teeLaskentaa(tyyppi)
    }
  }

  teeLaskentaa = (tyyppi) => {
    if (tyyppi === 'hyva') {
      this.setState({keskiarvo: ((this.state.hyva+1)*1+this.state.huono*-1)/(this.state.hyva+this.state.neutraali+this.state.huono+1) })
      this.setState({positiivisia: ((this.state.hyva+1)/(this.state.hyva+this.state.neutraali+this.state.huono+1))*100 })
    } else if (tyyppi === 'neutraali') {
      this.setState({keskiarvo: (this.state.hyva*1+this.state.huono*-1)/(this.state.hyva+this.state.neutraali+this.state.huono+1) })
      this.setState({positiivisia: ((this.state.hyva)/(this.state.hyva+this.state.neutraali+this.state.huono+1))*100 })
    } else if (tyyppi === 'huono') {
      this.setState({keskiarvo: (this.state.hyva*1+(this.state.huono+1)*-1)/(this.state.hyva+this.state.neutraali+this.state.huono+1) })
      this.setState({positiivisia: ((this.state.hyva)/(this.state.hyva+this.state.neutraali+this.state.huono+1))*100 })
    }
  }

  statistiikka = () => {
    if (this.state.hyva + this.state.neutraali + this.state.huono === 0) {
      return (
        <div>Yhtään palautetta ei ole vielä annettu.</div>
      )
    } else {
      return (
        <Statistics state={this.state}/>
      )
    }
  }

  render() {
    return (
      <div>
        <h2>Anna palautetta</h2>
        <Button handleClick={this.annaPalautetta('hyva')} text="hyvä" />
        <Button handleClick={this.annaPalautetta('neutraali')} text="neutraali" />
        <Button handleClick={this.annaPalautetta('huono')} text="huono" />

        <h2>Statistiikka</h2>
        <div>{this.statistiikka()}</div>
      </div>
    )
  }
}

// propsit välitetään destrukturoimalla
const Button = ({handleClick, text}) => (
  <button onClick={handleClick}> {text} </button>
)

// Tuodaan kaikki tilat propsina
const Statistics = ({state}) => (
  <div>
    <Statistic text="hyvä" state={state.hyva}/>
    <Statistic text="neutraali" state={state.neutraali}/>
    <Statistic text="huono" state={state.huono}/>
    <Statistic text="keskiarvo" state={Number(state.keskiarvo).toFixed(2)}/>
    <Statistic text="positiivisia" state={Number(state.positiivisia).toFixed(2)+"%"}/>
  </div>
)

const Statistic = ({text, state}) => (
  <div>
    {text} {state} <br />
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'));