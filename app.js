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


// Button for searching the open brewery API
$('#beer').on('click', function () {
      // Build the Open Brewery URL
      var bURL = 'https://api.openbrewerydb.org/breweries?';
      var typeBeer = $('#typeBeeer').val().trim();
      var brewURL = bURL + typeBeer;

      // Log out the queryURL
      console.log(brewURL);

      // ajax call to the open brewery API
      $.ajax({
        url: brewURL,
        method: 'GET'
      }).then(function (results) {

        // Log out the response from Open Brewery
        console.log(results);
      });
      
    });