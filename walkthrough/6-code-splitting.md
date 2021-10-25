# 6 - Code splitting
A frontend application can get rather big if it's not very simple, especially if we're using many libraries to help us build it. At the same time, it's not really necessary to load the full app from the beginning. What if we could split our app into smaller parts and only load the part that's needed?

## 1. Check the size
Run `build:prod` and check the size of the bundle.js

## 2. Add some code
Replace the code in `Modal.js` with the following:

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

## 3. Explore the change
- Run `npm run dev` and try clicking on some countries. You can now explore each country in more detail with data going back to 2000.
- :camel: Run your `analyze:prod` script, did the bundle.js get any bigger?

## 4. Let's split the code
Skim through [webpack/code-splitting](https://webpack.js.org/guides/code-splitting/) to get an idea of how the feature works.

- Make the following changes to your `webpack.config.js`

		- entry: './src/index.js',
		+ entry: {
		+    index: './src/index.js',
		+    modal: './src/Modal.js'
		+  },
		...
		- filename: 'bundle.js',
		+ filename: '[name].bundle.js',
		...
		+ optimization: {
		+ 	runtimeChunk: 'single',
		+ },

- :camel: Re-run `npm run dev` and have a look in the output in your terminal. Can you see the two files being generated?
- :camel: Open devtools in your browser and have a look in the Network tab. Can you see both .js files there?


## Continued reading
Code-splitting is quite a big subject and there are a couple of different ways of doing it. If you're interested in learning more about it, have a look at [webpack/lazy-loading](https://webpack.js.org/guides/lazy-loading/) and specifically in relation to react [react/code-splitting](https://reactjs.org/docs/code-splitting.html).


---

All done, let's move on!

[Continue](/walkthrough/7-optimize-react-components.md)
