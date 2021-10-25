import {useState} from 'react'
import './App.css'
import Header from './Header'
import Page from './Page'


function App() {
	const [country, setCountry]= useState(null)

	return (
		<div className="App">
			<Header />
			<Page />
		</div>
	);
}



export default App;

