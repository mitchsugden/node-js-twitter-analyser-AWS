module.exports = {
	isTop: function(topTweets, newTweet, attribute, isNegative) {

		// Return true for the first 10 tweets
		if (topTweets.length < 10) {
			return true;
		}

		// Check if we are looking at top negative tweets and switch the operand to 'less than' 
		if (isNegative) {
			for (var i = 0; i < topTweets.length; i++) {
		        if (newTweet[attribute] < topTweets[i][attribute]) {
		        	return true;
		    	}
		    }
		}

		// Iterate through top tweets. Return true if it has a higher favourite count than any current favourite.
		for (var i = 0; i < topTweets.length; i++) {
	        if (newTweet[attribute] > topTweets[i][attribute]) {
	        	return true;
		    }
		}
		return false;
	},

	/* Pushes a new tweet onto the array and sorts it using bubblesort.
	 * We can then say that the last value in the array is the lowest
	 * and remove it using pop() before returning the new array. */
	sortAndAppend: function(topTweets, newTweet, attribute, isNegative) {
		topTweets.push(newTweet);

		if (isNegative) {
			topTweets = bubbleSortAscending(topTweets, attribute);
		}
		else {
			topTweets = bubbleSortDescending(topTweets, attribute);
		}

		if(topTweets.length > 10) {
			topTweets.pop();
		}

		return topTweets;
	}
};

function bubbleSortDescending(topTweets, attribute) {

	var swapped;
	do {
		swapped = false;
		for (var i = 0; i < topTweets.length - 1; i++) {
			if (topTweets[i][attribute] < topTweets[i + 1][attribute]) {
				var temp = topTweets[i];
				topTweets[i] = topTweets[i + 1];
				topTweets[i + 1] = temp;
				swapped = true;
			}
		}
	} while(swapped);

	return topTweets;
}

function bubbleSortAscending(topTweets, attribute) {

	var swapped;
	do {
		swapped = false;
		for (var i = 0; i < topTweets.length - 1; i++) {
			if (topTweets[i][attribute] > topTweets[i + 1][attribute]) {
				var temp = topTweets[i];
				topTweets[i] = topTweets[i + 1];
				topTweets[i + 1] = temp;
				swapped = true;
			}
		}
	} while(swapped);

	return topTweets;
}