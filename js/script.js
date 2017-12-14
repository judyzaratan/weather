function convertTemp(celcius){
  var farhenheit = (celcius * (9/5)) + 32;
  return farhenheit;
}


$(document).ready(function(){
  var x = document.getElementById("content");
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
        x.innerHTML = response.main.temp + response.name + convertTemp(response.main.temp);
      }
    });
  }
  getLocation();

});
