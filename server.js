// npm modules 
var fs = require("fs");
var express = require('express');
var bodyParser = require('body-parser');
var path = require("path");
var twitter = require("./twitter.js");

// Server variables
var topFavorites = [];
var topRetweeted = [];
var topPositive = [];
var topNegative = [];
var sentiment = 0;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", express.static(__dirname + '/public'));

// Handle requests 
app.get('/', function(req, res) {
	
    res.sendFile(path.join(__dirname, '../cab432/public', 'index.html'));
    console.log("Client request recieved...");
});

// Start server 
app.listen(3000, function () {
 	console.log('Listening on port 3000...');
});

// Handle the search data entered by the user
app.post('/getSearchData', function(req, res) {
    var searchTerm = req.body.searchTerm;
    twitter.newStream(searchTerm);
});

// Return JSON array of top 10 favorite tweets 
app.post('/GetFavouriteTweets', function(req, res) {
    // Array of JSON objects
    topFavorites = twitter.getTopFavorites();
    res.send(topFavorites);
});

// Return JSON array of top 10 retweeted tweets 
app.post('/GetTopRetweeted', function(req, res) {
    topRetweeted = twitter.getTopRetweeted();
    res.send(topRetweeted);
});

// Return JSON array of top 10 positive tweets 
app.post('/GetTopPositive', function(req, res) {
    // Array of JSON objects
    topPositive = twitter.getTopPositive();
    res.send(topPositive);
});

// Return JSON array of 10 negative tweets
app.post('/GetTopNegative', function(req, res) {
    // Array of JSON objects
    topNegative = twitter.getTopNegative();
    res.send(topNegative);
});

// Return the 'sentiment' reading at the current moment
app.post('/getSentiment', function(req, res) {
    sentiment = twitter.getSentiment();
    res.send(String(sentiment));
});
