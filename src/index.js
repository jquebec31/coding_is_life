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
  
    return `${day} ${hours}:${minutes}`;
  }
  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);
  
  
  let units = "metric";
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
  
  // event listeners
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);
  
  function showWeather(response) {
    console.log(response.data);
    //cityInput.value = ``;
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = response.data.wind.speed;
    document.querySelector("#description").innerHTML = response.data.weather[0].description;
    document.querySelector("#city").innerHTML = response.data.name;
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
  let city = document.querySelector("#city-input").value;
searchCity(city);
  
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
  
  
searchCity("New York");