var twitter = require('twitter');
var sentiment = require('sentiment');
var helpers = require("./helperFunctions.js");
var server = require("./server.js");

var sentimentValue = 0;
var topFavorites = [];
var topRetweeted = [];
var topNegative = [];
var topPositive = [];

// Twitter client authentication
var client = new twitter({
  consumer_key: 'VzulziTssr4NUJkWdeVmqDok5',
  consumer_secret: 't2DjqFEo5mUIvoQnGd45EP2kJBTpv0QnrN8YpqJwiC8lFF8I3S',
  access_token_key: '791437941012692993-5dIXimeeAqUEZat8FWa4sfYaAHHjy9l',
  access_token_secret: 'NLAwEnN7cljeCCXjEs0CUS5sQ8TgLGeEdxMx1OidIfush'
});

var stream;

// Package functions to be exposed to our server in module.exports
module.exports = {

	getSentiment: function() {
    	return sentimentValue;
    },

    getTopFavorites: function() {
    	return topFavorites;
    },

    getTopRetweeted: function() {
    	return topRetweeted;
    },

    getTopPositive: function() {
    	return topPositive;
    },

    getTopNegative: function() {
    	return topNegative;
    },

    newStream: function(keywords) {
    	if (stream != null) {
    		stream.destroy();
    		stream = null;
    	}
    	if(keywords != "") {	
    		searchTweets(keywords);
    	}
    }
}

/* Private functions used to update local variables.
 * As the twitter stream is constant and does not return
 * we pass updated variables to functions outside the scope. */

function updateSentiment(newSentiment) {
	sentimentValue = newSentiment;
}

function updateTopFavorites(newTopTweets) {
	topFavorites = newTopTweets;
}

function updateTopRetweeted(newTopTweets) {
	topRetweeted = newTopTweets;
}

function updateTopPositive(newTopTweets) {
	topPositive = newTopTweets;
}

function updateTopNegative(newTopTweets) {
	topNegative = newTopTweets;
}

function updateStream(newStream) {
	stream = newStream;
}

/*	Creates a twitter stream using the twitter NPM package.
 *  Tweets are constantly streamed in and processed using helpFunctions.js. */
function searchTweets(keywords) {
	
	stream = client.stream('statuses/filter', {track: keywords});
	stream.on('data', function(tweet) {

		var sentimentData = sentiment(tweet.text);

		// Build a JSON string for each tweet
		var newTweetString = '{"twitterHandle": "' + tweet.user.screen_name +  '",' +
							' "name": "' + tweet.user.name + '",' +
							' "timeStamp": "' + tweet.created_at + '",' +
							' "retweets": "0",' +
							' "favorites": "0",' +
							' "text": "' + tweet.text + '",' +
							' "profilePic": "' + tweet.user.profile_image_url + '",' +
							' "sentiment": "' + sentimentData.comparative + '"}';

		var newTweetJSON = JSON.parse(newTweetString);

		// Only read favorites and retweets if the tweet has been retweeted
		if(tweet.hasOwnProperty('retweeted_status')){
			newTweetJSON.retweets = tweet.retweeted_status.retweet_count;
			newTweetJSON.favorites = tweet.retweeted_status.favorite_count;

			// Check if the tweet is in the top 10 favorites
			if (helpers.isTop(topFavorites, newTweetJSON, "favorites", false)) {
				topFavorites = helpers.sortAndAppend(topFavorites, newTweetJSON, "favorites", false);
				updateTopFavorites(topFavorites);
			}
			// Check if the tweet is in the top 10 retweeted
			if (helpers.isTop(topRetweeted, newTweetJSON, "retweets", false)) {
				topRetweeted = helpers.sortAndAppend(topRetweeted, newTweetJSON, "retweets", false);
				updateTopRetweeted(topRetweeted);
			}
			// Check if the tweet is in the top 10 Positive
			if (helpers.isTop(topPositive, newTweetJSON, "sentiment", false)) {
				topPositive = helpers.sortAndAppend(topPositive, newTweetJSON, "sentiment", false);
				updateTopPositive(topPositive);
			}
			// Check if the tweet is in the top 10 Negative
			if (helpers.isTop(topNegative, newTweetJSON, "sentiment", true)) {
				topNegative = helpers.sortAndAppend(topNegative, newTweetJSON, "sentiment", true);
				updateTopNegative(topNegative);
			}
		}
		updateSentiment(newTweetJSON.sentiment);
		updateStream(stream);
	});
	
	stream.on('error', function(error) {
	    //throw error;
	  });
}