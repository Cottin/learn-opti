# 7 - Optimize React Component
When we use React, we don't have to manipulate and handle dom-nodes like in the jQuery days. And we typically trust React to do this in the most efficient way, and React really does! However, the calculations react is doing in order to ensure not to unnessesarilly update DOM-nodes can get a bit expensive at times. This is called "reconciliation" in react and you can [read about it here](https://reactjs.org/docs/optimizing-performance.html).

# 1. Setup
In most areas of our application, reacts calculations are more than fast enough but some components that renders often and/or are heavy can degrade the UI sometimes. Our app doesn't natrually have this problem so let's make our `Country` component artificially heavy to render.

- Add the following code to `Page.js`:

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

- And then update your `Country` component with the following:


		function Country({name, code, series, onChoose}) {
		  console.log('Rendering country...') // <------ New line
		  return (
		    <tr className="country" onClick={(x) => onChoose(code)}>
		      <td className="cell-a">
		        <div className="f32"><div className={`flag ${code.toLowerCase()}`}></div></div>
		        <div className="p4 fw4">{name}</div>
		        <SlowComponent iterations={10} multiplier={10000000} />   // <------ New line
		      </td>


- Now run your app and the chrome devtools and make sure to have the console open so you can see console.logs
- :camel: Click a country. Why is it so slow and why are 217 countries rerendered just to open the modal?


# 2. Optimize the country component
We are now going to optimize our country component to not re-render so often.

This is a open exercise so read about [optimizing performance](https://reactjs.org/docs/optimizing-performance.html) and specifically [React.memo](https://reactjs.org/docs/react-api.html#reactmemo).

Try yourselves first and ask for help if you are stuck.


:metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal:

Well done! Let's wait for your fellow classmates to catch up and do a walk through of everything so far. In the mean time, try out the extra task below.

:metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: 


# Extra: filter the countries
There is an input field on top of the application. Implement it so that the list of countries is filtered base on the user input.

If you manage to do a simple implementation, remove the `React.memo` and make sure the `SlowComponent` makes your `Country` component slow enough that when you type "stan" in the filter input (to get all the ..stan countries Kazakstan, etc.) it should noticably lag. Use the `debounce` function in `lodash` to help the problem. That is, not making it faster, but to make sure we're not trying to filter on every keystroke but instead wait until we've finished typing.


---
