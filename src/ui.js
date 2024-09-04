import {
  fetchWeatherByGeocode,
  fetchAirPollutionByGeocode,
  fetchWeatherForecastByGeocode,
  getUserGeoLocation,
} from "./api.js";

import updateUI from "./ui-helpers.js";

/**
 * Set loader for weather Details
 */

const setWeatherLoader = (isLoading) => {
  const currentWeatherDiv = document.querySelector(".current-weather");

  if (isLoading) {
    currentWeatherDiv.innerHTML = `<div class="loader"></div>`;
    return;
  }

  currentWeatherDiv.innerHTML = "";
};

/**
 * Set loader for forecast Details
 */

const setForecastLoader = (isLoading) => {
  const currentWeatherDiv = document.querySelector(".container-box");

  if (isLoading) {
    currentWeatherDiv.innerHTML = `<div class="loader"></div>`;
    return;
  }

  currentWeatherDiv.innerHTML = "";
};

/**
 * Set loader for air pollution Details
 */

const setPollutionAirLoader = (isLoading) => {
  const currentWeatherDiv = document.querySelector(".air-quality-data");

  if (isLoading) {
    currentWeatherDiv.innerHTML = `<div class="loader"></div>`;
    return;
  }

  currentWeatherDiv.innerHTML = "";
};

/**
 *Initialize event listeners
 @returns {void}
 */

const setupEventListeners = () => {
  const searchInput = document.getElementById("input-search");
  const searchButton = document.querySelector(".button-search");

  /**
   *Function that we handle event click for SearchButton
   */

  const handleClickSearchButton = (event) => {
    event.preventDefault();

    const city = searchInput.value.trim();

    if (city) {
      fetchWeatherData(city);
    }
  };

  /**
   *Function that we handle event keypress for SearchInput
   */

  const handleKeyPressSearchInput = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      const city = searchInput.value.trim();

      if (city) {
        fetchWeatherData(city);
      }
    }
  };

  searchButton.addEventListener("click", handleClickSearchButton);
  searchInput.addEventListener("keypress", handleKeyPressSearchInput);
};

/**
 * 
@param {string} - City name
@returns {void}
 */

const fetchWeatherData = async (city) => {
  console.log("passage", city);
  setWeatherLoader(true);
  setForecastLoader(true);
  setPollutionAirLoader(true);

  const geoCode = await getUserGeoLocation(city);
  console.log("geocode:", geoCode);
  if (!Object.keys(geoCode || {}).length) {
    // affichera une erreur
  }

  const { lat, lon } = geoCode;

  const weatherDataPromise = fetchWeatherByGeocode(lat, lon);
  const weatherForecastDataPromise = fetchWeatherForecastByGeocode(lat, lon);
  const airPollutionDataPromise = fetchAirPollutionByGeocode(lat, lon);

  const [weatherData, forecastData, airPollutionData] = await Promise.all([
    weatherDataPromise,
    weatherForecastDataPromise,
    airPollutionDataPromise,
  ]);

  updateUI(weatherData, forecastData, airPollutionData);
};

export {
  setupEventListeners,
  setWeatherLoader,
  setForecastLoader,
  setPollutionAirLoader,
};
