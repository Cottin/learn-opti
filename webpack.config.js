const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const {merge} = require('webpack-merge');

const isAnalyze = typeof process.env.BUNDLE_ANALYZE !== "undefined"

const common = {
	entry: './src/index.js',
	mode: 'development',
	plugins: [
		new HtmlWebpackPlugin({
			hash: true,
			template: './src/index.html',
		}),
		isAnalyze && new BundleAnalyzerPlugin()
	].filter(Boolean),
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
	},
}

const production = {
	devtool: 'source-map',
}

const development = {
	devtool: 'eval-source-map',
}


module.exports = (env, args) => {
  switch(args.mode) {
    case 'development':
      return merge(common, development);
    case 'production':
      return merge(common, production);
    default:
      throw new Error('No matching configuration was found!');
  }
}
