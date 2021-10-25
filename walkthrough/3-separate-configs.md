# 3 - Separate configs
As you can see, we have one config file for webpack in our project called `webpack.config.js`. But we often want to bundle our code differently for development and for production. When we're developing we typically want good error messages, analytics and meta data and we want our code to be compiled/transpiles/bundled as fast as possible so we get quick feedback when typing in our editor. However, we don't care how big the bundle.js is getting since we're serving it locally anyway.


## 1. Separate your configs
 It's common to instead of only having one `webpack.config.js` have 3 like so `webpack.common.js`, `webpack.production.js` and `webpack.development.js`. But since there's not that much configuration in most projects we can also split the config in the same file.

- Read about the [webpack-merge](https://github.com/survivejs/webpack-merge) package and spit your configs into 3 object litterals in `webpack.config.js`.


## 2. Mode
Read about the [mode configuration option](https://webpack.js.org/configuration/mode/) and add the correct mode to your production and development config objects.

Your `webpack.config.js` should now look like so (or similar):

	const common = {
	  entry: './src/index.js',
	  plugins: [
	    new HtmlWebpackPlugin({
	      hash: true,
	      template: './src/index.html',
	    }),
	    new BundleAnalyzerPlugin(),
	  ],
	  output: {
	    path: path.resolve(__dirname, 'dist'),
	    filename: 'bundle.js',
	  },
	  module: {
	    rules: [
	      {
	        test: /\.m?js$/,
	        exclude: /node_modules/,
	        use: {
	          loader: 'babel-loader',
	          options: {}
	        }
	      },
	      {
	        test: /\.css$/i,
	        use: ["style-loader", "css-loader"],
	      },
	    ]
	  }
	}

	const production = {
	  mode: 'production',
	}

	const development = {
	  mode: 'development',
	}

	module.exports = (env, args) => {
	  switch(args.mode) {
	    case 'development':
	      return merge(common, development)
	    case 'production':
	      return merge(common, production)
	    default:
	      throw new Error('No matching configuration was found!')
	  }
	}

Update your `package.json` to have include a couple of new scripts like so:


	//package.json
	"scripts": {
	  "dev": "webpack serve --mode development --open --progress",
	  "build:prod": "cross-env NODE_ENV=production webpack --mode production",
	},

- Note that we added the --mode options to separate the configs.
- If you'd have separate files, you'd e.g. do webpack serve --config webpack.development.js  --open --progress 
- We also setting the environmental variable NODE_ENV=production. Many libraries include extra debug information or similar if we're running node.js in development environment (which is the default).
- Note that we're using the cross-env package to set the environment variables. This is because windows behaves differently than unix/mac when it comes to env vars unless you're using bash in Windows. You will need to `npm i -D cross-env` to your project.

## 3. Specific analyze script
Bundle analyzing is interesting to keep track of what is added to our project and to make sure we're not bloating our bundle. But it's typically not something we're looking at every time we're working so let's create separate analyze scripts.

- Modify scripts in your `package.json` to include two specific analyze scripts like so

	"dev": "webpack serve --mode development --open --progress",
	"build:prod": "cross-env NODE_ENV=production webpack --mode production",
	"analyze:prod": "cross-env NODE_ENV=production BUNDLE_ANALYZE=true webpack --mode production",
	"analyze:dev": "cross-env BUNDLE_ANALYZE=true webpack --mode development"

- We're here setting a made up environment variable `BUNDLE_ANALYZE` to true for the `analyze` scripts.

- Update your `webpack.config.js` to make use of that variable and only add the analyzer plugin when we want it.

	const isAnalyze = typeof process.env.BUNDLE_ANALYZE !== "undefined";

	const common = {
		entry: './src/index.js',
		plugins: [
			new HtmlWebpackPlugin({
				hash: true,
				template: './src/index.html',
			}),
			isAnalyze && new BundleAnalyzerPlugin()
		].filter(Boolean),

	// Note the `.filter(Boolean)` at the bottom. A trick to get rid of the `false` value when isAnalyze is not set (we cannot run false as a plugin).

- Run your `build:prod` script. You should not get a window opening in the browser with the analyzer graph. You should se a `learn-opti/dist` folder though, containing the output of the build.
- Now run `analyze:prod` and you should see the graph opening in your browser. 
- Now run `analyze:dev` and you should see the graph opening in your browser. Compare the results with the :prod script.
- :camel: How big is the difference in size between the two?
- :camel: What file or module is making up the biggest part of that differance?



---

All done, let's move on!

[Continue](/walkthrough/4-tree-shaking.md)
