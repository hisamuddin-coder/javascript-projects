"use strict";
// Selectors
const formEl = document.querySelector(".form");
const searchEl = document.querySelector(".search");
const locationEl = document.getElementById("location");
const wheatherImg = document.querySelector("#wheather__img");
const currentTemp = document.querySelector(".current__weather-temp-el");
const weatherDesc = document.querySelector(".current__weather-desc");
const dateEl = document.querySelector(".current__date");
const windEl = document.querySelector(".wind__speed");
const humadityEl = document.querySelector(".humidity__measure");
const rainEl = document.querySelector(".rain__chance");
const api_key = "63d7f8ae2fb597ad302bb1b776198389";

// Display Date
const date = new Date();
const option = { weekday: "long", day: "2-digit", month: "long" };
const dayName = date.toLocaleDateString("en-IN", { weekday: "long" });
const day = date.toLocaleDateString("en-IN", { day: "2-digit" });
const month = date.toLocaleDateString("en-IN", { month: "long" });
const formattedDate = `${dayName}, ${day}, ${month}`;
dateEl.innerHTML = formattedDate;

// Render data in UI
const renderData = function (data) {
  const cityName = data.name;
  const countryName = data.sys.country;
  locationEl.innerHTML = `${cityName}, ${countryName}`;

  const weatherMain = data.weather[0].main.toLowerCase();
  wheatherImg.src = `images/${weatherMain}.png`;

  currentTemp.innerHTML = `${data.main.temp}`;
  weatherDesc.innerHTML = data.weather[0].main;
  windEl.innerHTML = `${data.wind.speed}`;
  humadityEl.innerHTML = `${data.main.humidity}`;
  rainEl.innerHTML = `${data.clouds.all}`;
};

// Get data by city name
const fetchWeatherByCity = async function (city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod !== 200) {
      alert("City not found. Please try another search.");
      return;
    }
    renderData(data);
    console.log(data);
  } catch (error) {
    console.log("Error fetching weather data by city:", error);
  }
};

// Search functionality
formEl.addEventListener("submit", function (e) {
  e.preventDefault();
  const city = searchEl.value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }
  fetchWeatherByCity(city);
});
