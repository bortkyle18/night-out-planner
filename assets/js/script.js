var clientID = "Sw9ADFQMdRTFnIeMSqyPcg";
var APIkey = "67mqRNvaaHn5QdfWrCTna5d97oAiv8E-L2rhNIQ0CfS9TIqsqV-dmw9UJJ6KmHlWW_Od--P0iRNlN3ujxHB0ILtCZGR-sKAUtkGgRXIf7MZqihLIq8E3_9kluVJ8YnYx";


// Find events and print to page with links
//fetch events
var getEventRepo = function() {

    // Get entered city and state
    var postcode = $("#postcode").val();
    // var cityEnter = $("#city").val();
    // var stateEnter = $("#state").val();
    // pull up to 200 responses from the requested city - sorted by date of event
    // var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=50&city=" + cityEnter + "&stateCode=" + stateEnter + "&sort=date,asc&apikey=syoZ02A5zn7KOdclO7ZeAyKBCV7U8DK7";
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=50&postalCode=" + postcode + "&sort=date,asc&apikey=syoZ02A5zn7KOdclO7ZeAyKBCV7U8DK7";

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

    console.log(events)

    for(var i = 0; i < events.length; i++) {
        var eventList = $("<li>")
        .addClass("callout primary small");
        var eventName = $("<a>")
            .attr('target','_blank')
            .attr("href",events[i].url)
            .text(events[i].name)
            .css("font-weight","Bold");
        var cont = $("<div>")
            .attr('class','grid-x');
        var col = $("<div>")
            .attr('class','columns small-6');
        var colImg = $("<div>")
            .attr('class','columns small-6');

        var eventDate = $("<p>")
            .text(events[i].dates.start.localDate);
        var eventType = $("<p>")
            .text(events[i].classifications[0].segment.name);
        var image = $("<img>")
            .attr('src',events[i].images[0].url)
            .attr('style','width:100%');

        var heartWrap = $("<span>").addClass("favoriteBtn not-pressed");
        
        const isFavorite = localStorage.getItem("event_"+events[i].name);
        if(isFavorite){
            var heart = $("<i>").addClass("fa fa-heart");
        }
        else{
            var heart = $("<i>").addClass("fa-regular fa-heart");
        }
        (function(i){
            heartWrap.click(function(){
                if($(this).hasClass("not-pressed")){
                    localStorage.setItem("event_"+events[i].name, JSON.stringify(events[i]));
                    $(this).removeClass("not-pressed");
                    $(this).addClass("pressed");
                    $(this).find( "i" ).removeClass("fa-regular fa-heart");
                    $(this).find( "i" ).addClass("fa fa-heart");
                }
                else{
                    localStorage.removeItem("event_"+events[i].name);
                    $(this).removeClass("pressed");
                    $(this).addClass("not-pressed");
                    $(this).find( "i" ).removeClass("fa fa-heart");
                    $(this).find( "i" ).addClass("fa-regular fa-heart");
                }
            })
        })(i)
        heartWrap.append(heart)
        
        colImg.append(image);
        col.append(eventType,eventDate,heartWrap)
        cont.append(col,colImg)

        eventList.append(eventName,cont);

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
    var postcode = $("#postcode").val();

    var queryUrl =
        "https://cors-anywhere.herokuapp.com/" +
        "https://api.yelp.com/v3/businesses/search?restaurants&location=" +
        postcode +
        "&limit=50";
    fetch(queryUrl, {
        method: "GET",
        headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin":"*",
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

    for(var i = 0; i < food.length; i++) {
        var foodList = $("<li>")
        .addClass("callout primary small");
        let foodName = $("<a>")
            .attr('target','_blank')
            .attr("href",food[i].url)
            .text(food[i].name)
            .css("font-weight","Bold");



            var cont = $("<div>")
            .attr('class','grid-x');
        var col = $("<div>")
            .attr('class','columns small-6');
        var colImg = $("<div>")
            .attr('class','columns small-6');

        let foodType = $("<p>")
            .text(food[i].categories[0].title);
        let foodPrice = $("<p>")
            .text(food[i].price);
        let distacne = $("<p>")
            .text((food[i].distance/5280).toFixed(2)+"mi");

        var heartWrap = $("<span>").addClass("favoriteBtn not-pressed");

        const isFavorite = localStorage.getItem("food_"+food[i].name);
        if(isFavorite){
            var heart = $("<i>").addClass("fa fa-heart");
        }
        else{
            var heart = $("<i>").addClass("fa-regular fa-heart");
        }
        (function(i){
            heartWrap.click(function(){
                if($(this).hasClass("not-pressed")){
                    localStorage.setItem("food_"+food[i].name, JSON.stringify(food[i]));
                    $(this).removeClass("not-pressed");
                    $(this).addClass("pressed");
                    $(this).find( "i" ).removeClass("fa-regular fa-heart");
                    $(this).find( "i" ).addClass("fa fa-heart");
                }
                else{
                    localStorage.removeItem("food_"+food[i].name);
                    $(this).removeClass("pressed");
                    $(this).addClass("not-pressed");
                    $(this).find( "i" ).removeClass("fa fa-heart");
                    $(this).find( "i" ).addClass("fa-regular fa-heart");
                }
            })
        })(i)
        heartWrap.append(heart)

        var image = $("<img>")
            .attr('src',food[i].image_url)
            .attr('style','width:100%')
        
        colImg.append(image);
        col.append(foodType,foodPrice,distacne, heartWrap);
        cont.append(col,colImg)



        foodList.append(foodName,cont);

        $("#foodLi").append(foodList);
    };


};

// If no restaurants are found
const noFoodFound = function() {
    let foodHeader = $("<h2>")
        .text("WARNING: Restaurants Not Found")
        .addClass("text-center notFound");
    $("#foodLi").append(foodHeader);

    let foodList = $("<li>")
        .addClass("alert-box callout alert");
    let noFoodFound = $("<p>")
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

$('document').ready(function(){
    console.log("Asdfafdsf")

    let keys = Object.keys(localStorage)

    for(var i = 0; i < keys.length; i++) {

        let item = JSON.parse(localStorage.getItem(keys[i]));
        console.log(keys[i].includes("event"), item)

        if(keys[i].includes("event")){

            var eventList = $("<li>")
            .addClass("callout primary small");
            var eventName = $("<a>")
                .attr('target','_blank')
                .attr("href",item.url)
                .text(item.name)
                .css("font-weight","Bold");
            var cont = $("<div>")
                .attr('class','grid-x');
            var col = $("<div>")
                .attr('class','columns small-6');
            var colImg = $("<div>")
                .attr('class','columns small-6');
    
            var eventDate = $("<p>")
                .text(item.dates.start.localDate);
            var eventType = $("<p>")
                .text(item.classifications[0].segment.name);
            var image = $("<img>")
                .attr('src',item.images[0].url)
                .attr('style','width:100%');
            
            colImg.append(image);
            col.append(eventType,eventDate)
            cont.append(col,colImg)
    
            eventList.append(eventName,cont);
    
            $("#favoriteEventLi").append(eventList);
        }
        else{
            var foodList = $("<li>")
            .addClass("callout primary small");
            let foodName = $("<a>")
                .attr('target','_blank')
                .attr("href",item.url)
                .text(item.name)
                .css("font-weight","Bold");



                var cont = $("<div>")
                .attr('class','grid-x');
            var col = $("<div>")
                .attr('class','columns small-6');
            var colImg = $("<div>")
                .attr('class','columns small-6');

            let foodType = $("<p>")
                .text(item.categories[0].title);
            let foodPrice = $("<p>")
                .text(item.price);
            let distacne = $("<p>")
                .text((item.distance/5280).toFixed(2)+"mi");

            

            var image = $("<img>")
                .attr('src',item.image_url)
                .attr('style','width:100%')
            
            colImg.append(image);
            col.append(foodType,foodPrice,distacne);
            cont.append(col,colImg)



            foodList.append(foodName,cont);

            $("#favoriteFoodLi").append(foodList);
        }
    }

})

$("#searchButton").on("click",search);






