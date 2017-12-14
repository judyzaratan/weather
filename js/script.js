function temperature() {
  var $temp = $("#temp");
  var $city = $("#city");
  var $desc = $("#desc");
  var $pic = $("#pic");
  var $tempUnit = $('#tempUnit');
  var celcius = 0;
  var farhenheit = 0;
  var latitude = 0;
  var longitude = 0;
  var temp = 0;
  var city = "";
  var desc = "";
  var tempUnit = "";
  var pic = "";

  function displayTemp(){
    $temp.html(celcius.toString() + '&deg;');
    $desc.html(desc);
    $tempUnit.html(tempUnit);
    $city.html(city);
    $tempUnit.html('C');
    $pic.html('<img src="' + pic +  '" alt="">');
  }

  function toFahrenheit(temp) {
    return (temp * (9/5)) + 32;
  }

  function getTemp(){
    $.ajax({
      url: 'https://fcc-weather-api.glitch.me/api/current',
      type: 'GET',
      data: {
        lat: latitude,
        lon: longitude
      },
      success: function(response){
        console.log(response);
        celcius = parseFloat(response.main.temp);
        farhenheit = toFahrenheit(celcius);
        city = response.name;
        desc = response.weather[0].main;
        pic = response.weather[0].icon || null;
        displayTemp();
      }
    });
  }

  return {
    getLocation: function(position) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( function(position){
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          getTemp();
        });
      }
    },

    changeTempUnit: function(){
      var $tempUnit = $('#tempUnit');
      var updateValue = $tempUnit.html() === 'C' ? 'F': 'C';
      $tempUnit.html(updateValue);
    },
    convertTemp: function(){
      var tempUnit = $tempUnit.html();
      console.log(celcius, farhenheit);
      if (tempUnit === 'C') {
        $("#temp").html(farhenheit.toPrecision(4).toString() + '&deg;');
        $tempUnit.html('F');
      } else {
        $("#temp").html(celcius.toString() + '&deg;');
        $tempUnit.html('C');

      }
    }
  };
}

$(document).ready(function(){
  var getLocationTemp = temperature();
  getLocationTemp.getLocation();
  $('#tempUnit').click(getLocationTemp.convertTemp);

});
