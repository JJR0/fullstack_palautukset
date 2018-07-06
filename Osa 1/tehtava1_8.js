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

  // Funktiot palauttavat toisen funktion, 'currying'
  // Koska ensimmäinen setState ei päivitä heti tilaa, niin kahteen seuraavaan setState kutsuun on lisätty +1, jotta laskenta menee oikein.
  kasvataHyvaYhdella = () => () => {
    this.setState({hyva: this.state.hyva + 1})
    this.setState({keskiarvo: ((this.state.hyva+1)*1+this.state.huono*-1)/(this.state.hyva+this.state.neutraali+this.state.huono+1) })
    this.setState({positiivisia: ((this.state.hyva+1)/(this.state.hyva+this.state.neutraali+this.state.huono+1))*100 })
  }

  kasvataNeutraaliYhdella = () => () => {
    this.setState({neutraali: this.state.neutraali + 1})
    this.setState({keskiarvo: (this.state.hyva*1+this.state.huono*-1)/(this.state.hyva+this.state.neutraali+this.state.huono+1) })
    this.setState({positiivisia: ((this.state.hyva)/(this.state.hyva+this.state.neutraali+this.state.huono+1))*100 })
  }

  kasvataHuonoYhdella = () => () => {
    this.setState({ huono: this.state.huono + 1})
    this.setState({keskiarvo: (this.state.hyva*1+(this.state.huono+1)*-1)/(this.state.hyva+this.state.neutraali+this.state.huono+1) })
    this.setState({positiivisia: ((this.state.hyva)/(this.state.hyva+this.state.neutraali+this.state.huono+1))*100 })
  }

  render() {
    return (
      <div>
        <h2>Anna palautetta</h2>
        <Button handleClick={this.kasvataHyvaYhdella()} text="hyvä" />
        <Button handleClick={this.kasvataNeutraaliYhdella()} text="neutraali" />
        <Button handleClick={this.kasvataHuonoYhdella()} text="huono" />

        <h2>Statistiikka</h2>
        <Statistics state={this.state}/>
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