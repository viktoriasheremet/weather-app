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
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
document.querySelector("#date").innerHTML = `${day} ${hour}:${minutes}`;

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2"> ${day}
                <img src="http://openweathermap.org/img/wn/04d@2x.png" alt="icon" width="50px">
                <span class="temp-max">32°</span><span class="temp-min">20°</span>
            </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates.lat);
  let apiKey = `5e453ec37db04d7016a826b7caaff7a5`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
///

function displayTemperature(response) {
  cTemp = response.data.main.temp;

  document.querySelector("#temperature").innerHTML = Math.round(cTemp);
  document.querySelector(
    "#city"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
  ///
  getForecast(response.data.coord);
  ///
}
function search(city) {
  let apiKey = "5e453ec37db04d7016a826b7caaff7a5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city-input");
  search(cityElement.value);
}

function showFTemp(event) {
  event.preventDefault();
  let fTemp = Math.round((cTemp * 9) / 5 + 32);
  document.querySelector("#temperature").innerHTML = fTemp;
}

function showCTemp(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML = Math.round(cTemp);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);
let fahrenheitLink = document.querySelector("#f-link");
fahrenheitLink.addEventListener("click", showFTemp);
let celciusLink = document.querySelector("#c-link");
celciusLink.addEventListener("click", showCTemp);
let cTemp = null;
