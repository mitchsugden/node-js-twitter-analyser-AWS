var showPosTweets = false;
var showMoreTweets = false;

function TogglePositives() {
    var button = document.getElementById('positiveButton');
    var PositivesDiv = document.getElementById('topPositivesDiv');

    if (showPosTweets) {
        showPosTweets = false;
        button.style.backgroundColor = "rgb(200, 0, 0)";
        PositivesDiv.style.display = 'none';
    }
    else {
        showPosTweets = true;
        button.style.backgroundColor = "rgb(0, 150, 0)";
        PositivesDiv.style.display = 'block';
        GetPosTweets();
    }
}

function ShowMorePosTweets() {
    var button = document.getElementById('showMorePos');
    if (showMoreTweets) {
        showMoreTweets = false;
        button.innerHTML = "Show More Top Positive Tweets";
    }
    else {
        showMoreTweets = true;
        button.innerHTML = "Hide Top Positive Tweets";
    }
}

function GetPosTweets() {
    $.ajax({
        type: 'POST',
        url: '../GetTopPositive',
        success: function(response) {
            CreateTweetTable(response, "positiveResultsDiv", showMoreTweets);
        }
    });

    if (showPosTweets) {
        setTimeout(function() {
            GetPosTweets();
        }, 500);
    }
}