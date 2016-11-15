var showNegTweets = false;
var showMoreTweets = false;

function ToggleNegatives() {
    var button = document.getElementById('negativeButton');
    var negativesDiv = document.getElementById('topNegativesDiv');

    if (showNegTweets) {
        showNegTweets = false;
        button.style.backgroundColor = "rgb(200, 0, 0)";
        negativesDiv.style.display = 'none';
    }
    else {
        showNegTweets = true;
        button.style.backgroundColor = "rgb(0, 150, 0)";
        negativesDiv.style.display = 'block';
        GetNegTweets();
    }
}

function ShowMoreNegTweets() {
    var button = document.getElementById('showMoreNeg');
    if (showMoreTweets) {
        showMoreTweets = false;
        button.innerHTML = "Show More Top Negative Tweets";
    }
    else {
        showMoreTweets = true;
        button.innerHTML = "Hide Top Negative Tweets";
    }
}

function GetNegTweets() {
    $.ajax({
        type: 'POST',
        url: '../GetTopNegative',
        success: function(response) {
            CreateTweetTable(response, "negativeResultsDiv", showMoreTweets);
        }
    });

    if (showNegTweets) {
        setTimeout(function() {
            GetNegTweets();
        }, 500);
    }
}