const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const dist = path.resolve(__dirname, "dist");

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
	entry: {
		bundle: ['./tp/src/main.ts']
	},
	resolve: {
		alias: {
			svelte: path.resolve('node_modules', 'svelte')
		},
		extensions: ['.mjs', '.js', '.svelte', ".tsx", ".ts"],
		mainFields: ['svelte', 'browser', 'module', 'main']
	},
	output: {
		path: __dirname + '/tp/static/public',
		filename: '[name].js',
		chunkFilename: '[name].[id].js'
	},
	module: {
		rules: [
			{
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						emitCss: true,
						hotReload: false,
						dev: !prod,
						// customElement: true
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					/**
					 * MiniCssExtractPlugin doesn't support HMR.
					 * For developing, use 'style-loader' instead.
					 * */
					prod ? MiniCssExtractPlugin.loader : 'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		]
	},
	mode,
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new WasmPackPlugin({
		  crateDirectory: ".",
		  extraArgs: ""
		}),
	],
	devtool: prod ? false: 'source-map'
};