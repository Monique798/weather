function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  return `${day} ${hours}:${minutes}`;
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "cd8d8a46294ebfb28b4e7400ee19d497";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dispalyForecast);
}

function displayTemperature(response) {
  console.log(response.data);
  const temperatureElement = document.getElementById("temperature");
  const cityElement = document.getElementById("city");
  const descriptionElement = document.getElementById("desciption");
  const humidityElement = document.getElementById("humidity");
  const windElement = document.getElementById("wind");
  const iconElement = document.getElementById("icon");

  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function search(city) {
  const apiKey = "cd8d8a46294ebfb28b4e7400ee19d497";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  const cityInputElement = document.getElementById("city-input");
  console.log(cityInputElement.value);
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  const fahrenheitTemperature = Math.round((19 * 9) / 5 + 32 + 32);
  const temperatureElement = document.getElementById("temperature");
  temperatureElement.innerHTML = fahrenheitTemperature;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  const temperatureElement = document.getElementById("temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
const form = document.getElementById("search-form");
form.addEventListener("submit", handleSubmit);

const fahrenheitLink = document.getElementById("fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

const celsiusLink = document.getElementById("celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Cape Town");
