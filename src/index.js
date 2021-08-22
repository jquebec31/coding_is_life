function formatDate(date) {
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let dayIndex = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[dayIndex];
    return `Last updated: ${day} ${hours}:${minutes}`;
  }
  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);
  let units = "imperial";

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
  }

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML = forecastHTML +
        `
    <div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
      <img
        src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
        alt=""
        width="38"
      />
      <div class="weather-forecast-temp">
        <span class="weather-forecast-temp-max">${Math.round(forecastDay.temp.max)}°</span>
        <span class="weather-forecast-temp-min">${Math.round(forecastDay.temp.min)}°</span>
      </div>
    </div>
  
    `;
    }
  });
 
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  
}

function getForecast(coordinates) {
  let apiKey = "a412aacf8dd397739d90837ce962d2c0"; 
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
   }

  function showWeather(response) {
    //console.log(response.data);
    //cityInput.value = ``;
    
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = response.data.wind.speed;
    document.querySelector("#description").innerHTML = response.data.weather[0].description;
    
    document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
     
    fahTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(fahTemperature);
    cityElement.innerHTML = response.data.name;
   
    getForecast(response.data.coord);

  }
  
  function searchCity(city) {
    //event.preventDefault();
    let apiKey = "a412aacf8dd397739d90837ce962d2c0";
    //let city = cityInput.value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  searchCity(cityInput.value);
//searchCity(city);
  
}

function searchCurrentCity(currentLocation) {
  let apiKey = "a412aacf8dd397739d90837ce962d2c0";
    let lat = currentLocation.coords.latitude;
    let lon = currentLocation.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showWeather);
  }
  
  function getCurrentlocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchCurrentCity);
  }
  let button = document.querySelector("#current-location-button");
  button.addEventListener("click", getCurrentlocation);
  
 
function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let celsiusTemperature = (fahTemperature - 32) * 5 / 9;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  
}
  function displayFahrenheitTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    //let fahTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahTemperature);
}
    

let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);
    
let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", displayCelsiusTemp);

let fahTemperature = null;

let fahlink = document.querySelector("#fah-link");
fahlink.addEventListener("click", displayFahrenheitTemp);

searchCity("New York");

