import {useState} from 'react'
import './Modal.css'

function Modal({country, onClose}) {
	return (
		<div className="modal">
			<div className="modal-header">
				<div className="f32 p4"><div className={`flag ${country.code.toLowerCase()}`}></div></div>
				<div className="fs9 fw5 p4">{country.name}</div>
				<div className="modal-button fw4 fs6" onClick={onClose}>Close</div>
			</div>
			<div className="fs6 fw4 p4">No data available</div>
		</div>
	);
}


export default Modal;
