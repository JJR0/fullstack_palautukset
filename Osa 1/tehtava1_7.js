import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0,
    }
  }

  laskeKeskiarvo() {
    return (this.state.hyva*1+this.state.huono*-1)/(this.state.hyva+this.state.neutraali+this.state.huono)
  }

  laskePosiitivisia() {
    return (this.state.hyva/(this.state.hyva+this.state.neutraali+this.state.huono))*100
  }

  render() {
    return (
      <div>
        <h2>Anna palautetta</h2>
  
        <button onClick={() => this.setState({ hyva: this.state.hyva + 1})}>hyvä</button>
        <button onClick={() => this.setState({ neutraali: this.state.neutraali + 1})}>neutraali</button>
        <button onClick={() => this.setState({ huono: this.state.huono + 1})}>huono</button>
  
        <h2>Statistiikka</h2>
        hyvä {this.state.hyva}<br/>
        neutraali {this.state.neutraali}<br/>
        huono {this.state.huono}<br/>
        keskiarvo {Number(this.laskeKeskiarvo()).toFixed(2)} <br/>
        positiivia {Number(this.laskePosiitivisia()).toFixed(2)}% <br/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

