// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Create Instance of Express
var app = express();
// Sets an initial port
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Set the public assets
app.use(express.static("./public"));
// -------------------------------------------------

// -------------------------------------------------
// MongoDB Configuration with mongoose
var dbConnection = process.env.MONGODB_URI || "mongodb://localhost/nytreact";
mongoose.connect(dbConnection);
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
	console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
	console.log("Mongoose connection successful.");
});

/* Model Controllers
 * app.use(base_route,controller_name) is a middleware that will prepend
 * the base route base_route (in this case '/') to all the routes inside controller_name
 * controller_name returns a Router object with the routes
 */
var articles_controller = require('./controllers/articles_controller');
var notes_controller = require('./controllers/notes_controller');
app.use('/', articles_controller);
app.use('/', notes_controller);

module.exports = app;
