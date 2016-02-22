// Declare global variables
var url,
    tempUnit = 'imperial',
    getWeather;

var getLocation = function(data) {
  var appid = "9c6d5d0b1f73e3fb078ca7ddd02ba4ae";
  var lat = data.lat;
  var lon = data.lon;
  var city = data.city;
  var state = data.region;
  var country = data.country;
  
  // Custom URL for the weather API
  url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + appid + '&units=';
  
  // Function to get and display weather info
  getWeather = function(data) {
    var temp = Math.round(data.main.temp);
    var conditions = data.weather[0].description;
    var icon = data.weather[0].id;
    
    $('.city').text(city + ", ");
    $('.temp').text(temp);
    $('.weather-icon').html('<i class="wi wi-owm-' + icon + '"></i>');
    $('.conditions').text(conditions);
    if (country === "United States") {
      $('.country').text(state);
    } else {
      $('.country').text(country);
    }
  };
  
  // Calls the weather API
  $.getJSON(url + 'imperial', getWeather)
};

$(document).ready(function() {
  $.get('http://ip-api.com/json', getLocation)
  
  // Clicking the red letter changes the temperature unit
  $('a').on('click', function(){
    if ($(this).text() === "F") {
      $(this).text("C");
      tempUnit = 'metric';
    } else {
      $(this).text("F");
      tempUnit = 'imperial';
    }
  
  // Adjust the temperature by sending in the new URL
  $.getJSON(url + tempUnit, getWeather);
    
  });
    
});