# 4 - Tree shaking
Some years ago, it was considered bad to add a library like lodash if you only used one functions so people started to only add the functions they needed from libraries in order not to bloat their bundle, eg. `import values from 'lodash/values'`. But since Webpack 4 we've gotten tree shaking which in essense eliminates any dead code for us and takes the responsibility of manual optimization away from the developer.


## 1. Setup
- In `Page.js` change the import of `lodash` to `import {values} from 'lodash'`.
- :camel: Run `build:prod` and look in the graph, how big is lodash now (KB)?

## 2. Shake some trees
Tree shaking is enabled by default in webpack 4 and 5 BUT NOT DEVELOPMENT? However, tree shaking is based on then static structure of ES2015 module syntax, eg. `import` and `export`. This means webpack will not be able to tree shake any library that uses the commonjs style of exports, eg. `module.exports = ...`.

- Have a look at the [lodash website](https://lodash.com/) and check the section of "Module Formats". Seems lodash comes in a variaty of formats: `lodash`, `per method packages`, `lodash-es`, `lodash/fp` and `lodash-amd`.
- Realize which one of those is able to be tree shaken and install that package and switch to use that instead in `App.js`. eg. `import {values} from 'lodash-the-package-you-choose'`
- :camel: Now rerun `build:prod`, how big is lodash in the bundle now? What is happening?
- Make the following change in `App.js`: `import _ from 'lodash-the-package-you-choose'` and make sure to change the lines lower down to `const countries = _.values(data)`
- :camel: Rerun `build:prod`, is a big lodash module back? Has the total bundle size increased?

When you're done, switch back to `import {values} from 'the-right-lodash-package'` and `const countries = values(data)` so we're not bloating our bundle.

:metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: 
Well done! Let's wait for your fellow classmates to catch up and do a walk through of everything so far. In the mean time, try out the extra task below.
:metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: :metal: 

## Extra: Sort the countries
The five series of country are: Pop, Pop Growth, Life exp., Fertility, School but there are no easy way of quickly seeing which countries are at the top and the bottom in each series. Using your previous knowledge about react, make the series headings clickable so you can sort the list based on what series you clicked. You might benefit from some functions in lodash.

- If you manage basic sorting, make sure you can click a heading more than one time to sort: ascending, descending, no sort (three different modes).
- Also make sure to add a visual marker so that the user knows what (s)he is sorting and in what direction.

---

All done, let's move on!

[Continue](/walkthrough/5-minify-and-sourcemaps.md)
