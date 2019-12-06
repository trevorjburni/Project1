// Web app's Firebase configuration 
var firebaseConfig = {
  apiKey: "AIzaSyCh8JY_njUtjC7bS2jMRPeUncurKX4RP9c",
  authDomain: "project1-a73fb.firebaseapp.com",
  databaseURL: "https://project1-a73fb.firebaseio.com",
  projectId: "project1-a73fb",
  storageBucket: "project1-a73fb.appspot.com",
  messagingSenderId: "812455069447",
  appId: "1:812455069447:web:a1321d67e3413975d327a2"
};
// Initialize Firebase 
firebase.initializeApp(firebaseConfig);

// Zomato Button Listener, when the zomatoButton is pressed, run the following code.
$("#zomatoButton").on("click", function () {

  // Build the zomato URL.
  var zomatoApiKey = "apikey=a582a844aec19f715b35eb3bf2d2580a";
  var baseURL = "https://developers.zomato.com/api/v2.1/search?=";
  var zomatoSearch = $("#zomatoSearch").val();
  var zomatoCount = "&count=10";
  var zomatoUrl = baseURL + zomatoSearch + zomatoApiKey + zomatoCount;

  //log out the zomatoUrl.
  console.log(zomatoUrl);

  // ajax call to the zomato API
  $.ajax({
    url: zomatoUrl,

    // Below is used to test the hardcoded exampleURL.
    //url: exampleURL,
    url: zomatoUrl,
    method: "GET"
  }).then(function (response) {

    // Log out the response from zomato
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
});