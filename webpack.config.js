var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: { main: './src/index.js' },
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index_bundle.js'
	},
	module: { 
		rules: [
			{ 
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: [
					{ loader: 'babel-loader' }, 
					{ 
					  loader: 'eslint-loader',
					  options: { fix: true } 
					}
				] 
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			},
			{
				test: /\.(woff|svg|ttf|eot|otf)([\?]?.*)$/,
				loader: "file-loader?name=fonts/[name].[ext]"
			},
			{
				test: /\.(png|jpg|jpeg)([\?]?.*)$/,
				loader: "file-loader?name=img/[name].[ext]"
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({template: 'public/index.html'})
	],

}