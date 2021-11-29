// Day, Date, Year & Time
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "0ctober",
  "November",
  "December",
];

let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let ampm = hours >= 12 ? "PM" : "AM";
hours = hours % 12;
hours = hours ? hours : 12; // the hour '0' should be '12'
let year = now.getFullYear();

if (hours < 10) {
  hours = "0" + hours;
}
if (minutes < 10) {
  minutes = "0" + minutes;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// Current Weather Condition (API)
function displayWeatherCondition(response) {
  celciusTemperature = response.data.main.temp;

  document.querySelector("#nowCity").innerHTML = response.data.name;
  document.querySelector("#currentTemperature").innerHTML =
    Math.round(celciusTemperature);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  //Weather Icon (API)
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  // Weather Element
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );

  //Forecast
  getForecast(response.data.coord);
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index !== 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="card">
          <div class="card-body">
            <div class="weather-forecast-date">
              <strong>${formatDay(forecastDay.dt)}</strong></div>
            <img
              src="https://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt=""
              id="forecast-icon"
            />
            <div class="weather-forecast-temperatures-Max">${Math.round(
              forecastDay.temp.max
            )}°C</div>
            <div class="weather-forecast-description">
              ${forecastDay.weather[0].description}

            </div>
            
        </div>
      </div>
    </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  //console.log (response.data.daily);
}

function getForecast(coordinates) {
  //console.log(coordinates);
  let apiKey = "9fff992f31953220b9b904c14ec2ac31";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}

// City, Geolocation (API)
function search(nowCity) {
  let apiKey = "9fff992f31953220b9b904c14ec2ac31";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${nowCity}&units=metric&appid=${apiKey}`;

  axios.get(apiURL).then(displayWeatherCondition);
}
function handleSubmit(event) {
  event.preventDefault();
  let nowCity = document.querySelector("#searchInput").value;
  search(nowCity);
}

function searchLocation(position) {
  let apiKey = "9fff992f31953220b9b904c14ec2ac31";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiURL).then(displayWeatherCondition);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//Temperature & Unit Conversion
function updateCelcius(event) {
  event.preventDefault();
  let unitsDegree = document.querySelector("#currentTemperature");
  //remove the active class from fahrenheitTemp
  celciusTemp.classList.add("active");
  fahrenheitTemp.classList.remove("active");
  unitsDegree.innerHTML = Math.round(celciusTemperature);
}

function updateFahrenheit(event) {
  event.preventDefault();
  let unitsDegree = document.querySelector("#currentTemperature");

  //remove the active class from the celciusTemp
  celciusTemp.classList.remove("active");

  let fahrenheitTemp = (celciusTemperature * 9) / 5 + 32;
  unitsDegree.innerHTML = Math.round(fahrenheitTemp);
}

let celciusTemperature = null;

let fahrenheit = document.querySelector("#fahrenheitTemp");
fahrenheit.addEventListener("click", updateFahrenheit);

let celcius = document.querySelector("#celciusTemp");
celcius.addEventListener("click", updateCelcius);

let currentDate = document.querySelector("#currentDate");
currentDate.innerHTML = `${day}, ${date} ${month} ${year} <br> ${hours}:${minutes} ${ampm}`;

let searchForm = document.querySelector("#cityForm");
searchForm.addEventListener("submit", handleSubmit);

// Default City
search("Kuala Lumpur");
