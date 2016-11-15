var showReTweets = false;
var showMoreTweets = false;

function ToggleRetweets() {
    var button = document.getElementById('retweetButton');
    var retweetsDiv = document.getElementById('topRetweetsDiv');

    if (showReTweets) {
        showReTweets = false;
        button.style.backgroundColor = "rgb(200, 0, 0)";
        retweetsDiv.style.display = 'none';
    }
    else {
        showReTweets = true;
        button.style.backgroundColor = "rgb(0, 150, 0)";
        retweetsDiv.style.display = 'block';
        GetReTweets();
    }
}

function ShowMoreReTweets() {
    var button = document.getElementById('showMoreRetweets');
    if (showMoreTweets) {
        showMoreTweets = false;
        button.innerHTML = "Show More Top Retweets";
    }
    else {
        showMoreTweets = true;
        button.innerHTML = "Hide Top Retweets";
    }
}

function GetReTweets() {
    $.ajax({
        type: 'POST',
        url: '../GetTopRetweeted', //TODO: Change function
        success: function(response) {
            CreateTweetTable(response, "retweetsResultsDiv", showMoreTweets);
        }
    });

    if (showReTweets) {
        setTimeout(function() {
            GetReTweets();
        }, 500);
    }
}