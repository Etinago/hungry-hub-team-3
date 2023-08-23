$(document).ready(function(){
    var searchHistory = [];
    $("#weatherInfo").hide();
    $("searchResults").hide();
    $("#homePage").show();
    $("#btnSearch").click(function(e) {
        var searchCity = $("#inputCity").val().trim();
        console.log(searchCity)

        //Add city name to local storage

        //searchHistory.push(city);
        localStorage.setItem("search", JSON.stringify(searchCity));
        //hide home page
        $("#homePage").hide()
       
        renderSearch()
        //$("#btnSearch").hide();

    });
});

function renderSearch() 
{
var apiKey = 'TyxnNp5tPqoz8sYDPgjAVB0vpXmYfFuYVYLuyMKtQepxs4SWZWB4Vt4URFD-e1cfnm3nt4nITYQDIhxIxj3ub50tCk4YgX-oRJEfJlU8-dm2tsEIBva6aUOS03_fZHYx'
let myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + apiKey);
var searchCity = JSON.parse(localStorage.getItem("search")) || [];

//fetch restaurants in city

fetch("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=restaurants&location="+searchCity, {
  headers: myHeaders 
}).then((data) => {
  return data.json();
}).then((data) => {
  
 //Grab the results from the API JSON return
        var totalresults = data.total;
        // If our results are greater than 0, continue
        if (totalresults > 0){
            //console.log(data);
            //show search results form
           
            // Display a header on the page with the number of results

            $('#results').append('<h5>We discovered ' + totalresults + ' results!</h5>');
            // Iterate through the JSON array of 'businesses' which was returned by the API
            $.each(data.businesses, function(i, item) {
                // Store each business's object in a variable
                var id = item.id;
                var alias = item.alias;
                var latitude = item.coordinates.latitude;
                var latitude = item.coordinates.longitude;
                var image = item.image_url;
                var name = item.name;
                var address = item.location.address1;
                var city = item.location.city;
                var state = item.location.state;
                var zipcode = item.location.zip_code;
                var phone = item.display_phone;
                var rating = item.rating;
                var reviewcount = item.review_count;
                
                $('#results').append('<div id="' + alias + '" style="margin-top:50px;margin-bottom:50px;"><img src="' + image + '" style="width:200px;height:150px;"><br><b> Name: </b>' + name + '</br><b> Address: </b>' + address + ' ' + city + ', ' + state + ' ' + zipcode + '<br><b>Phone Number: </b>' + phone + '<br><b>Rating: </b>' + rating + ' with ' + reviewcount + ' reviews.</div>');
                
                             
                $("#results").on("click", function (e)
                {         
                  var alias1 = e.id;
                 // var alias1 = $(this).attr('alias')  
                 //get details of restaurant clicked
                 console.log(alias1);
                })
            });
        } else {
            // If our results are 0; no businesses were returned by the JSON therefor we display on the page no results were found
            $('#results').append('<h5>We discovered no results!</h5>');
        }
        console.log(results);
                
    })  
    
   
    // fetch weather conditions in city
    //URL to call the API to find current weather
  
   var apiURL = `https://api.openweathermap.org/data/2.5/weather?`;

    
   var apiForecast = `https://api.openweathermap.org/data/2.5/forecast?`;

    var key = "f6fcca586c887008feb57c771ac2c504";
    
    var queryURL = apiURL + "q="  + searchCity + "&appid=" + key; 
        
       
    getWeather(queryURL);
    
  }
  
  function getWeather(queryURL)
        
  {
        
    fetch(queryURL)
      .then(function (response) {
        return response.json();
            }).then(function (data) {    
        console.log(data);            
        //Convert the temp to Celsius

        var temp = data.main.temp - 273.15;

        // To get date
        dateToday = dayjs();
        dateToday = dayjs(dateToday).format('DD/MM/YYYY');
        // Transfer content to HTML
        //create an element to store weather icon and display it
        var weatherImg = data.weather[0].icon;
        // Retrieving the URL for the image
        $("#weatherInfo").show()
         var nameCity = data.name;
         var lon = data.coord.lon;
         var lat = data.coord.lat;
         $(".city").html("<h3>" + nameCity + ' ' + dateToday + "</h3>" + " ");
         $("#currentWeather").attr("src", "https://openweathermap.org/img/wn/" + weatherImg + "@2x.png");
         //$(".city").append(iconForecast);
         $(".temp").text("Temperature (C) " + temp.toFixed(2));
         $(".wind").text("Wind Speed: " + data.wind.speed);
         $(".humidity").text("Humidity: " + data.main.humidity);
               
            });
    initMap();
    //clear storage after displaying results
    localStorage.clear();

      
}

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
function initMap() {
  var searchCity = JSON.parse(localStorage.getItem("search")) || [];
 $('#map').attr('src', "https://www.google.com/maps/embed/v1/place?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&q=restaurants,"+searchCity) 
}
