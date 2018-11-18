var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var jsMinFile = 'app.min.js';
var cssMinFile = 'styles.min.css';

module.exports = [
	{
		entry: ['@babel/polyfill', './client/components/App.jsx'],
		output: {
			path: __dirname,
			filename: 'public/' + jsMinFile
		},
		devtool: 'development',
		mode: 'development',
		node: {
			fs: 'empty',
			net: 'empty'
		},
		watchOptions: {
			poll: true
		},
		plugins: [new ExtractTextPlugin('public/' + cssMinFile), new OptimizeCssAssetsPlugin()],
		watch: true,
		resolve: {
			extensions: ['.jsx', '.js', '.json', '.svg']
		},
		module: {
			rules: [
				{
					test: /\.(jsx?)$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				},
				{
					test: /\.scss?$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: 'css-loader!sass-loader'
					})
				}
			]
		}
	}
];
