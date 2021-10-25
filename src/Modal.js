import {useState} from 'react'
import './Modal.css'
import fullData from '../data/country_data_full'

function Modal({country, onClose}) {
	return (
		<div className="modal">
			<div className="modal-header">
				<div className="f32 p4"><div className={`flag ${country.code.toLowerCase()}`}></div></div>
				<div className="fs9 fw5 p4">{country.name}</div>
				<div className="modal-button fw4 fs6" onClick={onClose}>Close</div>
			</div>
			<div className="fs6 fw4 p4">All available data</div>
			<div>
				{Object.entries(fullData[country.code].series).map(([name, values])=> <Serie key={name} name={name} values={values} />)}
			</div>
		</div>
	);
}

function Serie({name, values}) {
	return (
		<div>
			<div className="fw4">{name}</div>
			<table>
				<thead>
					<tr>
						<th className="fw2">2000</th>
						<th className="fw2">2001</th>
						<th className="fw2">2002</th>
						<th className="fw2">2003</th>
						<th className="fw2">2004</th>
						<th className="fw2">2005</th>
						<th className="fw2">2006</th>
						<th className="fw2">2007</th>
						<th className="fw2">2008</th>
						<th className="fw2">2009</th>
						<th className="fw2">2010</th>
						<th className="fw2">2011</th>
						<th className="fw2">2012</th>
						<th className="fw2">2013</th>
						<th className="fw2">2014</th>
						<th className="fw2">2015</th>
					</tr>
				</thead>
				<tbody>
					<tr className="modal-row">
						{values.map((x, i) => <td key={i} className="modal-cell">{prettyNum(x)}</td>)}
					</tr>
				</tbody>
			</table>
		</div>
	)
}

const prettyNum = (n) => {
	if (isNaN(n)) return ''
	else if (n > 1000000000) return `${Math.floor(n/1000000)} M`
	else if (n > 1000000) return `${(n/1000000).toFixed(1)} M`
	else if (n > 999) return n.toLocaleString('sv-SE')
	else return n.toFixed(1)
}

export default Modal;