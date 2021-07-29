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
  
  let apiKey = "a412aacf8dd397739d90837ce962d2c0";
  let units = "metric";
  let weather = document.querySelector("#weather");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
  
  // event listeners
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", searchCity);
  
  function showWeather(response) {
    console.log(response.data);
    cityInput.value = ``;
    weather.innerHTML = Math.round(response.data.main.temp);
    humidity.innerHTML = response.data.main.humidity;
    wind.innerHTML = response.data.wind.speed;
    description.innerHTML = response.data.weather[0].description;
    cityElement.innerHTML = response.data.name;
  }
  
  function searchCity(event) {
    event.preventDefault();
    let city = cityInput.value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showWeather);
  }
  function searchCurrentCity(currentLocation) {
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
  