var clientID = "Sw9ADFQMdRTFnIeMSqyPcg";
var APIkey = "67mqRNvaaHn5QdfWrCTna5d97oAiv8E-L2rhNIQ0CfS9TIqsqV-dmw9UJJ6KmHlWW_Od--P0iRNlN3ujxHB0ILtCZGR-sKAUtkGgRXIf7MZqihLIq8E3_9kluVJ8YnYx";


// Find events and print to page with links
var eventLi = function() {
    // clear list
    $("#eventLi").empty()

    // Create HTML for events to populate list
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

    var getEventRepo = function() {

        // Get entered city
        var cityEnter = $("#city").val();
        // pull up to 200 responses from the requested city - sorted by date of event
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=200&city=" + cityEnter + "&sort=date,asc&apikey=syoZ02A5zn7KOdclO7ZeAyKBCV7U8DK7";
    
        $.ajax({
            type:"GET",
            url: apiUrl,
            async:true,
            dataType: "json",
            success: function(json) {
                if (json.page.totalElements === 0) {
                    noEventsFound()
                } else {
                    eventsFound(json._embedded.events);
                };
            },
    
        });
    };
    getEventRepo();
};
// End of events code




// Find food and print to page with links
var foodLi = function() {
    // clear list
    $("#foodLi").empty()

    var foodHeader = $("<h1>")
        .text("Restuarants")
        .addClass("text-center");
        $("#foodLi").append(foodHeader);

    var foodList = $("<li>")
        .addClass("callout primary small");
    var foodTest = $("<p>")
        .text("Food list will go here");
    foodList.append(foodTest);
    
    $("#foodLi").append(foodList);}
//     // Create HTML for events to populate list
//     var foodFound = function(food) {
//         for(var i = 0; i < food.length; i++) {
//             var foodList = $("<li>")
//             .addClass("callout primary small");
//             var foodName = $("<a>")
//                 .attr('target','_blank')
//                 .attr("href",food[i].url)
//                 .text(food[i].name)
//                 .css("font-weight","Bold");
//             var foodLocation = $("<p>")
//                 .text(food[i].location);
//             var foodType = $("<p>")
//                 .text(food[i].type);

//             foodList.append(foodName,foodType,foodLocation);
    
//         $("#foodLi").append(foodList);
//         };
//     };

//     var noFoodFound = function() {
//         var foodList = $("<li>")
//         var noFoodFound = $("<h2>")
//             .text("Oh no! There are no restaurants in the city provided. Please check the spelling of the city you entered or search cities around your area to find a restuarant for you!");

//         foodList.append(noFoodFound);

//         $("#foodLi").append(foodList);
//     };

//     var getEventRepo = function() {

//         // Get entered city
//         var cityEnter = $("#city").val();
//         // pull up to 200 responses from the requested city - sorted by date of event
//         var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=200&city=" + cityEnter + "&sort=date,asc&apikey=syoZ02A5zn7KOdclO7ZeAyKBCV7U8DK7";
    
//         $.ajax({
//             type:"GET",
//             url: apiUrl,
//             async:true,
//             dataType: "json",
//             success: function(json) {
//                 if (json.page.totalElements === 0) {
//                     noFoodFound()
//                 } else {
//                     foodFound(json._embedded.events);
//                 };
//             },
    
//         });
//     };
//     getEventRepo();
// };
// End of food code

// Find food and print to page with links
var getYelpAPI = function() {
    fetch("https://api.yelp.com/v3/businesses/search");
};



$("#button").on("click",eventLi);
$("#button").on("click",foodLi);






