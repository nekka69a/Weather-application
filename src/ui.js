import {
  fetchWeatherByGeocode,
  fetchAirPollutionByGeocode,
  fetchWeatherForecastByGeocode,
  getUserGeoLocation,
} from "./api.js";
import {
  resetError,
  displayWeather,
  handleError,
  setWeatherLoader,
  setForecastLoader,
  setPollutionAirLoader,
} from "./ui-helpers.js";

/**
 * Updates the UI width the fetched weather, forecast and air pollution data
 * @param {Object} weatherData -- The weather data object
 * @param {Object} forecastData -- The forecast data object
 * @param {Object} airPollutionData -- The air pollution data object
 * @returns {void}
 */

const updateUI = (weatherData, forecastData, airPollutionData) => {
  setWeatherLoader(false);
  setForecastLoader(false);
  setPollutionAirLoader(false);

  displayWeather(weatherData, forecastData, airPollutionData);
};

/**
 * Fetch Weather data
@param {string} - City name
@returns {void}
 */

const fetchWeatherData = async (city) => {
  setWeatherLoader(true);
  setForecastLoader(true);
  setPollutionAirLoader(true);
  resetError();

  const geoCode = await getUserGeoLocation(city);
  if (!Object.keys(geoCode || {}).length) {
    handleError("Impossible de récupérer les coordonnées GPS.");
    return;
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

  /**
   *Function that we clear the input search on click
   */

  const clearInput = () => {
    const input = document.getElementById("input-search");

    input.addEventListener("focus", () => {
      input.value = "";
    });
  };

  clearInput();

  searchButton.addEventListener("click", handleClickSearchButton);
  searchInput.addEventListener("keypress", handleKeyPressSearchInput);
};

/**
 * Initializes the UI components and event listeners
 */

const init = () => {
  setupEventListeners();
};

export default init;
