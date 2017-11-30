$(document).ready(function(){
  var x = document.getElementById("demo");
  var y = document.getElementById("test");
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported"
    }
  }

  function showPosition(position) {
    x.innerHTML = "Latitude:" + position.coords.latitude + "<br> Longitude: " + position.coords.longitude;
    $.ajax({
      url: 'https://fcc-weather-api.glitch.me/api/current',
      type: 'GET',
      data: {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      },
      success: function(response){
        console.log(response);
        y.innerHTML = response.main.temp + response.name;
      }
    });
  }
  getLocation();

});
