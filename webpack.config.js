module.exports = {

	// This is the entry point or start of our react applicaton
	entry: "./app/app.js",

	// The plain compiled Javascript will be output into this file
	output: {
		path: __dirname + '/public',
		filename: 'bundle.js',
	},

	// This section desribes the transformations we will perform
	module: {
		rules: [
			{
				// Only working with files that in in a .js or .jsx extension
				test: /\.jsx?$/,
				// Webpack will only process files in our app folder. This avoids processing
				// node modules and server files unnecessarily
				include: /app/,
				loader: "babel-loader",
				options: {
					// These are the specific transformations we'll be using.
					presets: ["env", "react", "stage-2"]
				}
			},
			{
				// For all .css files except from node_modules
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					'style-loader',
					{ loader: 'css-loader', options: { modules: true } }
				]
			},
			{
				// For all .css files in node_modules
				test: /\.css$/,
				include: /node_modules/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	// This lets us debug our react code in chrome dev tools. Errors will have lines and file names
	// Without this the console says all errors are coming from just coming from bundle.js
	devtool: "eval-source-map"
};
