const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


export default {
	entry: './src/index.js',
	plugins: [
		new HtmlWebpackPlugin({
			hash: true,
			template: './src/index.html',
		}),
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
	},
}
