// Variables
//==============================================================

// API for open brewery db
// Constructing a queryURL variable we will use instead of the literal string inside of the ajax method
var title = 'open+brewery';
var queryURL = 'https://api.openbrewerydb.org/breweries?by_city=salt_lake_city';

// ajax call to the open brewery API
$.ajax({
    url: queryURL,
    method: 'GET'
}).then(function(response) {
    console.log(response);
});
// Main Processes
//==============================================================
