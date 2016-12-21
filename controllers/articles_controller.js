/* articles_controller.js
 *
 * This file will control all the operations
 * associated with articles
 *
*/
// Dependencies
var express = require('express');
var router  = express.Router();
var models  = require('../models');
var Article = models.Article;
var Note = models.Note;

// Main "/" Route. This will redirect the user to the rendered React application
router.get("/", function(req, res) {
	res.sendFile(__dirname + "/public/index.html");
});

// This route will receive GET requests and send the articles stored in the db.
// This route will be called at the moment the page gets rendered
router.get("/api/saved", function(req, res) {
	// Find all the records, sort them in descending order, then limit the records to 10
	Article.find({}).sort([
		["date", "descending"]
	]).limit(10)
    .populate('note')
	.exec(function(err, articles) {
		if (err) throw err;
		res.send(articles);
	});
});

// This route will receive POST requests and store articles into the db.
router.post("/api/saved", function(req, res) {
	var entry = new Article({title:req.body.title,url:req.body.url,date:Date.now()});
	// Now, save that article to the db
	entry.save(function(err, doc) {
		// Log any errors
		if (err)
        {
            console.log(err);
        }
        else
        {
            res.json(doc);
        }
	});
});

module.exports = router;
