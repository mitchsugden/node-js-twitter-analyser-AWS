var showFavTweets = false;
var showMoreTweets = false;

function ToggleFavourites() {
    var button = document.getElementById('favouriteButton');
    var favouritesDiv = document.getElementById('topFavouritesDiv');

    if (showFavTweets) {
        showFavTweets = false;
        button.style.backgroundColor = "rgb(200, 0, 0)";
        favouritesDiv.style.display = 'none';
    }
    else {
        showFavTweets = true;
        button.style.backgroundColor = "rgb(0, 150, 0)";
        favouritesDiv.style.display = 'block';
        GetFavTweets();
    }
}

function ShowMoreFavTweets() {
    var button = document.getElementById('showMoreFav');
    if (showMoreTweets) {
        showMoreTweets = false;
        button.innerHTML = "Show More Top Favourites";
    }
    else {
        showMoreTweets = true;
        button.innerHTML = "Hide Top Favourites";
    }
}

function StopGeneratingFavTweets() {

}

function GetFavTweets() {
    $.ajax({
        type: 'POST',
        url: '../GetFavouriteTweets',
        success: function(response) {
            CreateTweetTable(response, "favouritesResultsDiv", showMoreTweets);
        }
    });

    if (showFavTweets) {
        setTimeout(function() {
            GetFavTweets();
        }, 500);
    }
}