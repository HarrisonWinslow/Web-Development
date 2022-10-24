document.getElementById("weatherSubmit").addEventListener("click", function(event) {
    /*global fetch*/
    /*global moment*/
    event.preventDefault();
    const value = document.getElementById("weatherInput").value;
    if (value === "")
        return;
    console.log(value);
  
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=029a273e99b6fc3021d2012f75a70cd9";
    fetch(url)
        .then(function(response) {
          return response.json();
        }).then(function(json) {	
            let results = "";
            results += '<h2>Weather in ' + json.name + " Today</h2>";
          for (let i=0; i < json.weather.length; i++) {
    	    results += '<img src="https://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
          }
          results += '<h2>' + json.main.temp + " &deg;F</h2>";
          results += "<p>";
          for (let i=0; i < json.weather.length; i++) {
    	    results += json.weather[i].description;
    	  if (i !== json.weather.length - 1)
    	    results += ", ";
          }
          results += "</p>";
          document.getElementById("weatherResults").innerHTML = results;
        });
    
    
    
      const url2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=029a273e99b6fc3021d2012f75a70cd9";
      fetch(url2)
        .then(function(response) {
          return response.json();
        }).then(function(json) {
          console.log(json);
          let forecast = "";
          for (let i=0; i < json.list.length; i++) {
            
          	forecast += "<div class=\"item\"><h2 class=\"weatherHeading\">" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h a') + "</h2>";
          	forecast += '<p style=\"text-align:center\"> <img src="https://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/><br>';
          	forecast += json.list[i].weather[0].description + "<br>";
          	forecast += "Temperature: " + json.list[i].main.temp + " &deg;F<br>";
          	forecast += "Feels like: " + json.list[i].main.feels_like + " &deg;F<br>";
          	forecast += "Humidity: " + json.list[i].main.humidity + "%<br>";
          	forecast += "Wind speed: " + json.list[i].wind.speed + "mph<br>";
          	forecast += "</p></div>";
          	
            }
            document.getElementById("forecastResults").innerHTML = forecast;
        });
    
});