var clientID = "Sw9ADFQMdRTFnIeMSqyPcg";
var APIkey = "67mqRNvaaHn5QdfWrCTna5d97oAiv8E-L2rhNIQ0CfS9TIqsqV-dmw9UJJ6KmHlWW_Od--P0iRNlN3ujxHB0ILtCZGR-sKAUtkGgRXIf7MZqihLIq8E3_9kluVJ8YnYx";


// Find events and print to page with links
//fetch events
var getEventRepo = function() {

    // Get entered city and state
    var cityEnter = $("#city").val();
    var stateEnter = $("#state").val();
    // pull up to 200 responses from the requested city - sorted by date of event
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=50&city=" + cityEnter + "&stateCode=" + stateEnter + "&sort=date,asc&apikey=syoZ02A5zn7KOdclO7ZeAyKBCV7U8DK7";

    $.ajax({
        type:"GET",
        url: apiUrl,
        async:true,
        dataType: "json",
        success: function(json) {
            if (json.page.totalElements > 0) {
                eventsFound(json._embedded.events);
            } else {
                noEventsFound();
            };
        },

    });
};

// Create HTML for events to populate list if events found
var eventsFound = function(events) {
    var eventsHeader = $("<h1>")
        .text("Events")
        .addClass("text-center");
    $("#eventLi").append(eventsHeader);

    for(var i = 0; i < events.length; i++) {
        var eventList = $("<li>")
        .addClass("callout primary small");
        var eventName = $("<a>")
            .attr('target','_blank')
            .attr("href",events[i].url)
            .text(events[i].name)
            .css("font-weight","Bold");
        var eventDate = $("<p>")
            .text(events[i].dates.start.localDate);
        var eventType = $("<p>")
            .text(events[i].classifications[0].segment.name);

        eventList.append(eventName,eventType,eventDate);

    $("#eventLi").append(eventList);
    };
};

// If no events are found
var noEventsFound = function() {
    var eventsHeader = $("<h2>")
        .text("WARNING: Events Not Found")
        .addClass("text-center notFound");
    $("#eventLi").append(eventsHeader);

    var eventList = $("<li>")
        .addClass("alert-box callout alert");
    var noEventFound = $("<p>")
        .text("Oh no! There are no events scheduled in the city provided. Please check the spelling of the city you entered or search cities around your area to find an event for you!");
    eventList.append(noEventFound);

    $("#eventLi").append(eventList);
};

var eventLi = function() {
    // clear list
    $("#eventLi").empty();
    //get list
    getEventRepo();
};
// End of events code



// Find food and print to page
// Fetch restaurants 
function searchApi() {
    var cityEnter = $("#city").val();
    var stateEnter = $("#state").val();

    var queryUrl =
        "https://cors-anywhere.herokuapp.com/" +
        "https://api.yelp.com/v3/businesses/search?restaurants&location=" +
        cityEnter + stateEnter +
        "&limit=50";
    fetch(queryUrl, {
        method: "GET",
        headers: {
        Accept: "application/json",
        Authorization:
            "Bearer " +
            "67mqRNvaaHn5QdfWrCTna5d97oAiv8E-L2rhNIQ0CfS9TIqsqV-dmw9UJJ6KmHlWW_Od--P0iRNlN3ujxHB0ILtCZGR-sKAUtkGgRXIf7MZqihLIq8E3_9kluVJ8YnYx",
            "Content-Type": "application/json",
        },
    }).then(function (response) {
        response.json().then(function (data) {
            console.log(data)
            if (data.total > 0) {
                foodFound(data.businesses);
            } else {
                noFoodFound();
            };
        });
    });
};


// Create HTML for events to populate list
var foodFound = function(food) {
    var foodHeader = $("<h1>")
        .text("Food")
        .addClass("text-center");
    $("#foodLi").append(foodHeader);
    console.log(food)

    for(var i = 0; i < food.length; i++) {
        var foodList = $("<li>")
        .addClass("callout primary small");
        var foodName = $("<a>")
            .attr('target','_blank')
            .attr("href",food[i].url)
            .text(food[i].name)
            .css("font-weight","Bold");
        var foodType = $("<p>")
            .text(food[i].categories[0].title);
        var foodPrice = $("<p>")
            .text(food[i].price);

        foodList.append(foodName,foodType,foodPrice);

        $("#foodLi").append(foodList);
    };
};

// If no restaurants are found
var noFoodFound = function() {
    var foodHeader = $("<h2>")
        .text("WARNING: Restaurants Not Found")
        .addClass("text-center notFound");
    $("#foodLi").append(foodHeader);

    var foodList = $("<li>")
        .addClass("alert-box callout alert");
    var noFoodFound = $("<p>")
        .text("Oh no! There are no restaurants found in the city provided. Please check the spelling of the city you entered or search cities around your area to find an event for you!");
    foodList.append(noFoodFound);

    $("#foodLi").append(foodList);
};


var foodLi = function() {
    // clear list
    $("#foodLi").empty();
    // get list
    searchApi();
};
// End of food code

var search = function () {
    eventLi();
    foodLi();
}

$("#searchButton").on("click",search);






