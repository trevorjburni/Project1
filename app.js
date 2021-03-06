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
  var baseMapURL = "https://www.mapquestapi.com/geocoding/v1/address?";
  var foodCity = $("#locationFoodCity").val().trim().replace(/\s/g, '');
  var foodState = $("#locationFoodState").val().trim().replace(/\s/g, '');
  var foodLocation = "&location=" + foodCity + "," + foodState;
  var mapURL = baseMapURL + mapApiKey + foodLocation;

  // Build the zomato URL.
  var zomatoApiKey = "apikey=a582a844aec19f715b35eb3bf2d2580a";
  var baseZomatoURL = "https://developers.zomato.com/api/v2.1/search?";

  // Commented out, It didn't seem to be working
  // var zomatoSearch = "q=" + $("#typeFood").val().trim();

  var zomatoCount = "&count=10";
  var zomatoLong = "&lon=";
  var zomatoLat = "&lat=";
  var zomatoUrl = "";
  var zomatoCollectionId = "&collection_id=1";


  // ajax call to MapQuest
  $.ajax({
    url: mapURL,
    method: "GET"
  }).then(function (response) {

    // Get the longitude and Latitude out of the response and add those to zomatoLong and zomatoLat
    zomatoLat += response.results[0].locations[0].latLng.lat;
    zomatoLong += response.results[0].locations[0].latLng.lng;

    // Build Zomato URL
    zomatoUrl = baseZomatoURL + zomatoApiKey + zomatoCount + zomatoLong + zomatoLat + zomatoCollectionId;

    // ajax call to thse zomato API
    $.ajax({
      url: zomatoUrl,
      method: "GET"
    }).then(function (response2) {

      for (var i = 0; i < response2.restaurants.length; i++) {
        var restaurant = response2.restaurants[i].restaurant;
        var restaurantName = restaurant.name;
        var restaurantLink = restaurant.url;

        //TODO: need to update line below
        var physicalAddress = restaurant.location.address;

        // create a card an append it to the page.
        addToPage(restaurantName, restaurantLink, physicalAddress);

      }
    });
  });
});

//looking for clicking of the button on the card

$(document).on("click", ".addToList", function (event) {
  event.preventDefault();

  var buttonTestName = $(this).attr('data-name');
  var buttonTestLink = $(this).attr('data-link');
  var buttonTestAddress = $(this).attr('data-address');

  // Div to append to
  var divToAppendTo = $("#addList");

  var newDiv = $("<div>");
  newDiv.attr({
    class: "card horizontal",
    id: name
  })
  var newDiv1 = $("<div>");
  newDiv1.attr({
    class: "card-stacked"
  });
  var newDiv2 = $("<div>");
  newDiv2.attr({
    class: "card-content"
  });

  var pPlace = $("<p>").text("Restaurant: " + buttonTestName);
  var pLink = $("<p>");
  var aLink = $("<a>").attr({
    href: buttonTestLink
  });
  aLink.text("Website");
  pLink.append(aLink);
  var pAddress = $("<p>").text("Address: " + buttonTestAddress);
  var button = $("<button>");
  button.attr({
    class: "btn waves-effect waves-light right removeFromList",
    type: "submit",
    name: "action",
    "data-name": buttonTestName,
    "data-link": buttonTestLink,
    "data-address": buttonTestAddress,
  });

  button.text("Remove");

  // add to page
  newDiv2.append(pPlace, pLink, pAddress, button);
  newDiv1.append(newDiv2)
  newDiv.append(newDiv1);
  divToAppendTo.append(newDiv);

});

// Remove item from the user list
$(document).on("click", ".removeFromList", function (event) {
  event.preventDefault();
  $(this).parent().remove();
});

function addToPage(name, link, address) {

  // create variables

  var divToAppendTo = $("#emptyDiv");

  var newDiv = $("<div>");
  newDiv.attr({
    class: "card horizontal",
    id: name
  })
  var newDiv1 = $("<div>");
  newDiv1.attr({
    class: "card-stacked"
  });
  var newDiv2 = $("<div>");
  newDiv2.attr({
    class: "card-content"
  });

  var pPlace = $("<p>").html("<strong>" + name + "</strong>");
  var pLink = $("<p>");
  var aLink = $("<a>").attr({
    href: link
  });
  aLink.text("Click here to visit website");
  pLink.append(aLink);
  var pAddress = $("<p>").text(address);
  var button = $("<button>");
  button.attr({
    class: "btn waves-effect waves-light right addToList",
    type: "submit",
    name: "action",
    "data-name": name,
    "data-link": link,
    "data-address": address,
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
  var bURL = "https://api.openbrewerydb.org/breweries?";
  var stateBeer = "by_state=" + $('#beerState').val().trim();
  var cityBeer = "&by_city" + $('#locationBeer').val().trim();
  var brewURL = bURL + stateBeer + cityBeer;

  // Clearing out the list from any previous searches
  clear();

  // ajax call to the open brewery API
  $.ajax({
    url: brewURL,
    method: 'GET'
  }).then(function (results) {

    // Storing an array of results in the brewResults variable
    var brewResults = results;

    // Loop through every result item
    for (var i = 0; i < brewResults.length; i++) {
      var brewName = brewResults[i].name;
      var brewAddress = brewResults[i].street;
      var brewCity = brewResults[i].city;
      var brewState = brewResults[i].state;
      var brewZip = brewResults[i].postal_code;
      var brewWebsite = brewResults[i].website_url;

      var fullAddress = brewAddress + " " + brewCity + ", " + brewState + " " + brewZip;

      addToPage(brewName, brewWebsite, fullAddress)

    };
  });
});

// Function to empty out the list of breweries
function clear() {
  $("#emptyDiv").empty();
}