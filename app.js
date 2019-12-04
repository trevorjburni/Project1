// Variables
//==============================================================

var exampleURL = "https://developers.zomato.com/api/v2.1/search?q=mcdonalds&apikey=a582a844aec19f715b35eb3bf2d2580a";

var apiKey = "apikey=a582a844aec19f715b35eb3bf2d2580a";
var baseURL ="https://developers.zomato.com/api/v2.1/search?="
var zomatoUrl = "";



// Main Processes
//==============================================================

$.ajax({
    url: exampleURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });