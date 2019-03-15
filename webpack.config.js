//basic vars
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const variables = require('variable.js');


//additional plugins
const Uglify = require('uglifyjs-webpack-plugin');

// const useDevServer = true;
// const publicPath = useDevServer ? 'http://localhost:8081/dist/' : 'dist/';


//module settings
let conf = {
	//базовый путь к проекту
	context: path.resolve(__dirname, 'src'),

	//Точки входа js
	entry: {
		app: [ 'babel-polyfill',
			'./js/index.js'
		],
	},
	//Путь для собранных файлов
	output: {
			filename: 'bundle.js',
			path: path.resolve(__dirname, 'dist'),
			publicPath:'dist/'
	},
	// devServer config
	devServer: {
		contentBase: '.',
		overlay: true,
	},

	plugins: [
    new HtmlWebpackPlugin({
      template: '../tamplate/index.html',
      title: 'HTML Webpack Plugin',
      filename: '../index.html'
    }),
    new HtmlWebpackPlugin({
      template: '../tamplate/builder-footer.php',
      title: 'HTML Webpack Plugin',
      filename: '../builder-footer.php'
    }),
    new HtmlWebpackPlugin({
      template: '../tamplate/location.html',
      title: 'HTML Webpack Plugin',
      filename: '../location.html'
    })
  ],

	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				//exclude: '/node_modules/'
			}
		]
	},
	devtool: 'eval-sourcemap'
};

module.exports = (env, options) => {
	let production = options.mode === 'production';


	conf.output.publicPath = production
														? 'dist/'
														: 'http://localhost:8080/dist/';

	conf.devtool = production
									? 'source-map'
									: 'eval-sourcemap';
									
	return conf;
}