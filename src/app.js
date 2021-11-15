function formatDate(timestamp) {
  //calculate the date
  return "FRIDAY, 22 OCTOBER 2021";
}
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

function displayWeatherCondition(response) {
  celciusTemperature = response.data.main.temp;
  //console.log(response.data);
  document.querySelector("#nowCity").innerHTML = response.data.name;
  //console.log(response.data.name);
  document.querySelector("#currentTemperature").innerHTML =
    Math.round(celciusTemperature);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  //console.log(response.data.weather[0].description);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  //
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  //console.log (response.data.main.humidity);
  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  //console.log (response.data.wind.speed);
  document.querySelector("#now").innerHTML = response.data.dt * 1000;
  //console.log (response.data.dt * 1000);
}
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

let currentCityButton = document.querySelector("#current-button");
currentCityButton.addEventListener("click", getCurrentPosition);
