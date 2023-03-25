const currentCondition = document.querySelector(".current-condition");
const weatherLocation = document.querySelector(".location");
const currentTemp = document.querySelector(".current-temp");
const tempUnit = document.querySelector(".temp-unit");
const feelsLike = document.querySelector(".feels-like");
const feelsLikeUnit = document.querySelector(".feels-like-unit");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const toggleBtn = document.querySelector(".toggle-btn");
const weatherInput = document.querySelector(".weather-input");
const submitBtn = document.querySelector(".submit-btn");

submitBtn.addEventListener("click", setWeatherData);
toggleBtn.addEventListener("click", toggleTempUnit);

async function callWeatherAPI() {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=810423b3d41146a5a38151139232403&q=${
        weatherInput.value || "Mumbai"
      }`
    );
    return await response.json();
  } catch (error) {
  }
}

async function getWeatherData() {
  try {
    const weatherData = await callWeatherAPI();
    return weatherData;
  } catch (error) {
  }
}

async function setWeatherData() {
  try {
    resetTempUnit();
    const weatherData = await getWeatherData();
    currentCondition.textContent = weatherData.current.condition.text;
    weatherLocation.textContent = weatherData.location.name + ", " + weatherData.location.country;
    currentTemp.textContent = weatherData.current.temp_c;
    feelsLike.textContent = weatherData.current.feelslike_c;
    humidity.textContent = weatherData.current.humidity;
    wind.textContent = weatherData.current.wind_kph;
  } catch (error) {
  }
}


function toggleTempUnit() {
  if (tempUnit.textContent === "°C") {
    tempUnit.textContent = "°F";
    feelsLikeUnit.textContent = "°F";
    currentTemp.textContent = Math.round(
      (currentTemp.textContent * 9) / 5 + 32
    );
    feelsLike.textContent = Math.round(
      (feelsLike.textContent * 9) / 5 + 32
    );
  } else {
    tempUnit.textContent = "°C";
    feelsLikeUnit.textContent = "°C";
    currentTemp.textContent = Math.round(
      ((currentTemp.textContent - 32) * 5) / 9
    );
    feelsLike.textContent = Math.round(
      ((feelsLike.textContent - 32) * 5) / 9
    );
  }
}

function resetTempUnit() {
    tempUnit.textContent = "°C";   
    feelsLikeUnit.textContent = "°C";
}

setWeatherData();