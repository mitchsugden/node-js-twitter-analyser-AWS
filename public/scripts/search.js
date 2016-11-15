function sendSearch() {
    var userInput = document.getElementById('search').value;

    $.ajax({
        type: 'POST',
        url: '../getSearchData',
        data: {
            searchTerm: userInput
        }
    });
}