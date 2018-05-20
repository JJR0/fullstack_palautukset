import React from 'react'

const Osa = ({ osa, tehtavia }) => <p>{osa} {tehtavia}</p>

const Otsikko = ({ kurssi }) => <h1>{kurssi.nimi}</h1>

const Sisalto = ({ kurssi }) => {
  const osat = kurssi.osat
  return (
    <div>
			{osat.map(osa => <Osa key={osa.id} osa={osa.nimi} tehtavia={osa.tehtavia}/>)}
    </div>
  )
}

const Yhteensa = ({ kurssi }) => {

	const osat = kurssi.osat
	const summa = osat.reduce( (accumulator, currentValue) => {
		return accumulator + currentValue.tehtavia
	}, 0)

	return (
		<div>
			<p>yhteensä {summa} tehtävää</p>
		</div>
	)
}

const Kurssi = ({ kurssi }) => {
	return (
		<div>
			<Otsikko kurssi={kurssi} />
			<Sisalto kurssi={kurssi} />
			<Yhteensa kurssi={kurssi} />
		</div>
	)
}

export default Kurssi