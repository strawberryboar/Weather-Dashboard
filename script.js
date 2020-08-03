//set initial empty array of cities

var cities = [];
var APIKey = "6cee2b01c2d5df72119d5266177359c8"
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cities[0] + "&appid=" + APIKey;
    
    $.ajax({
      url: queryURL,
      method: "GET"
    })

    .then(function(response){
        console.log(queryURL);
        console.log(response);

    })



//creates searchweather function that takes in city
const searchWeather = city => {
    console.log("hello");
    //empty search so no duplicates
    $("#today .card-body").empty();

    //add city to the array of cities
    cities.push(city);

    //update data object with the city
    data.name = city;
    
    var cityList = $(".city_list ul");
    cityList.empty();

    for (let i=0; i < cities.length; i++) {
        var li = $("<li>").addClass("list-group-item").text(cities[i]);
        cityList.append(li);
    }

    //create variable with a class of card-title
    var h3 = $("<h3>").addClass("card-title").text(city);

    //create variables for temp, humidity, and wind speed
    var temp = $("<p>").addClass("card-body").text("Temperature: " + data.main.temp + "°F");
    var humidity = $("<p>").addClass("card-body").text("Humidity: " + data.main.humidity + "%");
    var wind = $("<p>").addClass("card-body").text("Wind Speed: " + data.wind.speed + "mph");

    //appending variables to the today div
    $("#today .card-body").append(h3, temp, humidity, wind);

    //slide container down
    $(".weather_container").slideDown("slow");
};

//main process
    $("#submit-button").on("click", function (e){
        console.log($("#city").val());
        e.preventDefault();
        //get value of the input and store it to a variable
        var city = $("#city").val().trim();

        cities.push(city);
        console.log(cities);

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey,
            method: "GET"
          })
      
          .then(function(response){
              //console.log(queryURL);
              console.log(response);
      
          })
        //clear input so user can type in new city
        $("#city").val("");

        //run searchWeather function and pass city
        searchWeather(city);

        $(document).on("click", ".city_list li", function() {
            var cityChosen = $(this).text();
            searchWeather(cityChosen);
        })

        //create event listener to slide up weather container on jquery focus
        $("input").on("focus", function(){
            $(".weather_container").slideUp();
        })

    });