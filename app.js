// Variables
//==============================================================


var exampleURL = "https://developers.zomato.com/api/v2.1/search?q=mcdonalds&apikey=a582a844aec19f715b35eb3bf2d2580a";

var apiKey = "apikey=a582a844aec19f715b35eb3bf2d2580a";
var baseURL ="https://developers.zomato.com/api/v2.1/search?="
var zomatoUrl = "";

// Zomato API Call
// ajax call to the zomato API
$.ajax({
    url: exampleURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });

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

