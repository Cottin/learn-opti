import React, {useState} from 'react'
import './Page.css'
import Modal from './Modal'
import countryMap from '../data/country_data_summery.js'
import {values} from 'lodash-es'

const countries = values(countryMap)

function Page({filter}) {
	console.log('Rendering Page...')
	const [chosenCountry, setChosenCountry] = useState(null)

	const chosenCountryObj = countryMap[chosenCountry]

	const onCountryChosen = useCallback((countryCode) => {
		setChosenCountry(countryCode)
	}, [])

	return (
		<div>
			{chosenCountryObj && <Modal country={chosenCountryObj} onClose={(x) => setChosenCountry(null)}/>}
			<table className="page">
				<thead className="thead">
					<tr className="fw4 fs3 country-header">
						<th className="cell-a"></th>
						<th className="cell-c">Pop</th>
						<th className="cell-b">Pop Growth</th>
						<th className="cell-b">Life exp.</th>
						<th className="cell-b">Fertility</th>
						<th className="cell-b">School</th>
					</tr>
				</thead>
				<tbody className="tbody">
					{countries && countries.map((c) => <MemoizedCountry key={c.code} {...c} onChoose={onCountryChosen} />)}
				</tbody>
			</table>
		</div>
	);
}

function Country({name, code, series, onChoose}) {
	console.log('Rendering country...')
	return (
		<tr className="country" onClick={(x) => onChoose(code)}>
			<td className="cell-a">
				<div className="f32"><div className={`flag ${code.toLowerCase()}`}></div></div>
				<div className="p4 fw4">{name}</div>
				<SlowComponent iterations={10} multiplier={10000000} />
			</td>
			<td className="cell-c">{shortenLargeNumberNicely(series["SP.POP.TOTL"])}</td>
			<td className="cell-b"><Percent change={true} value={series["SP.POP.GROW"]} /></td>
			<td className="cell-b">{smallNum(series["SP.DYN.LE00.IN"])}</td>
			<td className="cell-b">{decNum(series["SP.DYN.TFRT.IN"])}</td>
			<td className="cell-b"><Percent divBy100={true} value={series["SE.SEC.ENRR"]} /></td>
		</tr>
	)
}

const MemoizedCountry = React.memo(Country)

const shortenLargeNumberNicely = (n) => {
	if (n > 1000000000) return `${Math.floor(n/1000000)} M`
	else if (n > 1000000) return `${(n/1000000).toFixed(1)} M`
	else return n.toLocaleString('sv-SE')
}

const percent = (n) => {
	return `${Math.floor(n*100)}%`
}

const smallNum = (n) => {
	if (isNaN(n)) return '..'
	else return Math.floor(n)
}

const decNum = (n, decimals = 1) => {
	if (isNaN(n)) return '..'
	else return n.toFixed(decimals)
}


function Percent({change, divBy100=false, value}) {
	if (isNaN(value)) return '..'

	let color = 'inherit'
	let extra = ''
	if (change) {
		color = value > 0 ? 'green' : 'red'
		extra = value > 0 ? '+' : ''
	}
	return (
		<div style={{color}}>{`${extra}${percent(divBy100 ? value / 100 : value)}`}</div>
	)
}

function calculatePrimes(iterations, multiplier) {
    var primes = [];
    for (var i = 0; i < iterations; i++) {
      var candidate = i * (multiplier * Math.random());
      var isPrime = true;
      for (var c = 2; c <= Math.sqrt(candidate); ++c) {
        if (candidate % c === 0) {
            // not prime
            isPrime = false;
            break;
         }
      }
      if (isPrime) {
        primes.push(candidate);
      }
    }
    return primes;
  }

  function SlowComponent({iterations, multiplier}) {
    calculatePrimes(iterations, multiplier)
    return null
  }

export default Page;
