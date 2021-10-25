# 2 - Analyze bundle


## 1. webpack-bundle-analyzer

Read about the [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) and by using its documentation, add it to your project and make it run.

By looking at the graphical analyzer...

- :camel: Which are the two biggest npm dependencies used?
- :camel: How big (KB) is react in this build? How are those KBs divided by it's submodules?
- :camel: Which is the bundles biggest file that is not a npm dependency?
- Open the panel on the left side and try searching for "url" and see how it's found in the graph.
- Open `App.js` and change the import of lodash from the full package to just the `values` function like so `import values from 'lodash/values'` and fix the old usage of `_.values` lower down in the code.
- :camel: How did that change effect the bundle size? How many KBs are lodash now in our bundle?



All done, let's move on!

[Continue](/walkthrough/3-separate-configs.md)
