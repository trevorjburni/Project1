// Variables
//==============================================================

var exampleURL = "https://developers.zomato.com/api/v2.1/search?q=mcdonalds&apikey=a582a844aec19f715b35eb3bf2d2580a";
var apiKey = "apikey=a582a844aec19f715b35eb3bf2d2580a";
var baseURL = "https://developers.zomato.com/api/v2.1/search?="
var zomatoUrl = "";

// Zomato API Call
// ajax call to the zomato API
$.ajax({
  url: exampleURL,
  method: "GET"
}).then(function (response) {
  console.log(response);
});

// API for open brewery db
// Constructing a queryURL variable we will use instead of the literal string inside of the ajax method
var title = 'open+brewery';
var queryURL = 'https://api.openbrewerydb.org/breweries?by_city=salt_lake_city';


// Javascript Logic for Open Brewery API

  // Event listener for open brewery API Needs to be updated after Kellie finishes adding another card to index.html
  $("button").on("click", function() {

    // In this case, the "this" keyword refers to the button that was clicked
    var brewery = $(this).attr("data-person");

// ajax call to the open brewery API
$.ajax({
    url: queryURL,
    method: 'GET'
  })

  // After the data comes back from the API
  .then(function (response) {

    // Log to the console to see if object is being returned
    console.log(response);
    
    // Storing an array of results in the results variable
    var results = response;

    // Looping over every result item
    for (var i = 0; i < results.length; i++) {
      // loop logic needs to go here
    }
    // 
  });
// Main Processes
//==============================================================