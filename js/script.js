function convertTemp(celcius){
  var farhenheit = (celcius * (9/5)) + 32;
  return farhenheit;
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported"
  }
}
function changeTempUnit() {
  var $tempUnit = $('#tempUnit');
  $tempUnit.html('C');
  $tempUnit.html('F');
}
function showPosition(position) {
  var $temp = $("#temp");
  var $city = $("#city");
  var $desc = $("#desc");
  var $pic = $("#pic");
  var $tempUnit = $('#tempUnit');


  $.ajax({
    url: 'https://fcc-weather-api.glitch.me/api/current',
    type: 'GET',
    data: {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    },
    success: function(response){
      console.log(response);
      $temp.html(response.main.temp);
      $city.html(response.name);
      $desc.html(response.weather[0].main);
      var pic = response.weather[0].icon || null;
      if (pic) {
        $pic.html("<img src = '" + pic + "' " + "alt='"
                  + response.weather[0].description + "'>")
      }
    }
  });
}
$(document).ready(function(){
  getLocation();
});
