function convertTemp(temp){
  var $tempUnit = $('#tempUnit');
  var updateValue = $tempUnit.html();
  if (updateValue === 'C') {
    var farhenheit = (temp * (9/5)) + 32;
    $("#temp").html(farhenheit.toPrecision(4).toString());
    $tempUnit.html('F');
  } else {
    var celcius = (temp - 32) * (5/9);
    $("#temp").html(celcius.toPrecision(4).toString());
    $tempUnit.html('C');

  }
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
  var updateValue = $tempUnit.html() === 'C' ? 'F': 'C';
  $tempUnit.html(updateValue);
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
      $tempUnit.html('C');
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
  $("#tempUnit").click(function() {
    var temp = parseInt($('#temp').html());
    convertTemp(temp);

  });

});
