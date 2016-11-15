window.onscroll = function() {
    var pageYOffset = window.pageYOffset;
    var selectionDiv = document.getElementById('selectionDiv');
    var selectionContentDiv = document.getElementById('selectionContentDiv');
    if (pageYOffset > 850) {
        selectionDiv.style.position = 'absolute';
        selectionDiv.style.top = pageYOffset - 15 + "px";
        selectionDiv.style.left = '25%';
        selectionDiv.style.width = '50%';
        selectionDiv.style.paddingBottom = '10px';
        selectionContentDiv.style.width = '100%';
        selectionContentDiv.style.marginLeft = '0';
    }
    else {
        selectionDiv.style.position = 'static';
        selectionDiv.style.width = '100%';
        selectionDiv.style.paddingBottom = '75px';
        selectionContentDiv.style.width = '80%';
        selectionContentDiv.style.marginLeft = '10%';
    }
};

function CreateTweetTable(response, div, displayAll) {
    var topTweetsDiv = document.getElementById(div);
    topTweetsDiv.innerHTML = "";

    for (var i = 0; i < 10; i++) {
        var table = document.createElement('table');
        var row1 = document.createElement('tr');
        var row2 = document.createElement('tr');
        var row3 = document.createElement('tr');
        var col1 = document.createElement('td');
        var col2 = document.createElement('td');
        var col3 = document.createElement('td');
        var col4 = document.createElement('td');
        var col5 = document.createElement('td');
        var col6 = document.createElement('td');
        var col7 = document.createElement('td');
        var img = document.createElement('img');
        var tweet = document.createElement('h4');

        img.src = response[i].profilePic;
        var name = document.createTextNode(response[i].name);
        var id = document.createTextNode("@" + response[i].twitterHandle);
        var time = document.createTextNode(response[i].timeStamp);
        var content = document.createTextNode(response[i].text);
        var retweets = document.createTextNode("Retweets: " + response[i].retweets);
        var favourites = document.createTextNode("Favorites: " + response[i].favorites);

        tweet.appendChild(content);
        col1.appendChild(img);
        col1.rowSpan = 3;
        col2.appendChild(name);
        col3.appendChild(id);
        col4.appendChild(time);
        col5.appendChild(tweet);
        col5.colSpan = 3;
        col6.appendChild(retweets);
        col6.colSpan = 2;
        col7.appendChild(favourites);

        row1.appendChild(col1);
        row1.appendChild(col2);
        row1.appendChild(col3);
        row1.appendChild(col4);
        row2.appendChild(col5);
        row3.appendChild(col6);
        row3.appendChild(col7);

        table.appendChild(row1);
        table.appendChild(row2);
        table.appendChild(row3);

        if (i > 0 && !displayAll) {
            table.style.display = "none";
        }

        topTweetsDiv.appendChild(table);
    }
}