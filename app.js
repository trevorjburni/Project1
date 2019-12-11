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

var database = firebase.database();

var searchArray = [];
//needed these to be global variables so I moved them
var restaurantName = "";
var restaurantLink = "";
var physicalAddress = "";

// Zomato Button Listener, when the zomatoButton is pressed, run the following code.
$("#foodSearch").on("click", function () {
  
  // Clear out any cards from previous searches
  clear();

  // Build the MapQuest URL
  var mapApiKey = "key=BQpcYBhtUmRdeHD49tWhOH8jS3nPFCx7";
  var baseMapURL = "http://www.mapquestapi.com/geocoding/v1/address?";
  var foodLocation = "&location=" + $("#locationFood").val().trim().replace(/\s/g, '');
  var mapURL = baseMapURL + mapApiKey + foodLocation;

  // log out the mapQuestUrl
  console.log(mapURL);

  // Build the zomato URL.
  var zomatoApiKey = "&apikey=a582a844aec19f715b35eb3bf2d2580a";
  var baseURL = "https://developers.zomato.com/api/v2.1/search?=";
  var zomatoSearch = $("#typeFood").val();
  var zomatoCount = "&count=10";
  var zomatoUrl = baseURL + zomatoSearch + zomatoApiKey + zomatoCount;

  var exampleURL = "https://developers.zomato.com/api/v2.1/search?q=pizza" + zomatoApiKey + zomatoCount;

  //log out the zomatoUrl.
  console.log(zomatoUrl);

  // ajax call to the zomato API
  $.ajax({
    url: zomatoUrl,

    // Below is used to test the hardcoded exampleURL.
    url: exampleURL,
    // url: zomatoUrl,
    method: "GET"
  }).then(function (response) {

    // Log out the response from zomato
    console.log(response);

    for (var i = 0; i < response.restaurants.length; i++) {
      console.log(response.restaurants[i].restaurant.name);
      var restaurant = response.restaurants[i].restaurant;
      var restaurantName = restaurant.name;
      var restaurantLink = restaurant.url;

      //TODO: need to update line below

      var physicalAddress = restaurant.user_rating.aggregate_rating;
      console.log(restaurantName, restaurantLink, physicalAddress)

      // create a card an append it to the page.

      addToPage(restaurantName, restaurantLink, physicalAddress);

    }
  });
});

      for (var i = 0; i < response2.restaurants.length; i++) {
        var restaurant = response2.restaurants[i].restaurant;
        restaurantName = restaurant.name;
        restaurantLink = restaurant.url;

        //TODO: need to update line below
        physicalAddress = restaurant.user_rating.aggregate_rating;
        console.log(restaurantName, restaurantLink, physicalAddress);

        // create a card an append it to the page.
        addToPage(restaurantName, restaurantLink, physicalAddress);

        //created constructor to make an object with information to push to the page. This is not working yet. I might need help. 
        
      };




//looking for clicking of the button on the card
$(document).on("click", "#addToList", function () {
  console.log("I was clicked");
  //this is where I was wanting to call the function Place contructor to append to the page
//creating a contructor to go inside the array
  function Place(name, link, address) {
    this.name = name;
    this.link = link;
    this.address = address;

    //console.log the array 
    console.log(searchArray);
  };
  //creating an object from contructor
  var placeToAdd = new Place(restaurantName, restaurantLink, physicalAddress);

  //creating a funciton to push to the array
  function pushToSearchArray() {
    searchArray.push(Place);
    console.log(Place);
  };
  pushToSearchArray();
  
});

function addToPage(name, link, address) {

  // create variables
  var divToAppendTo = $("#emptyDiv");

  var newDiv = $("<div>");
  newDiv.attr({
    class: "card horizontal"
  })
  var newDiv1 = $("<div>");
  newDiv1.attr({
    class: "card-stacked"
  });
  var newDiv2 = $("<div>");
  newDiv2.attr({
    class: "card-content"
  });

  var pPlace = $("<p>").text("Restaurant: " + name);
  var pLink = $("<p>").text("Link: ");
  var aLink = $("<a>").attr({href: link});
  aLink.text(link);
  pLink.append(aLink);
  var pAddress = $("<p>").text("Address: " + address);
  var button = $("<button>");
  button.attr({
    class: "btn waves-effect waves-light right",
    type: "submit",
    name: "action"
  });
  button.text("Add to list");

  newDiv2.append(pPlace, pLink, pAddress, button);
  newDiv1.append(newDiv2)
  newDiv.append(newDiv1);
  divToAppendTo.append(newDiv);


}

// Button for searching the open brewery API
$('#beerSearch').on('click', function () {
  // Build the Open Brewery URL
  var bURL = 'https://api.openbrewerydb.org/breweries?';
  var typeBeer = $('#typeBeer').val().trim();
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