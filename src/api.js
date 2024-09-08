import {
  setForecastLoader,
  setPollutionAirLoader,
  setWeatherLoader,
  handleError,
} from "./ui-helpers.js";

const API_BASE_URL = "http://api.openweathermap.org";
const apikey = "7a21ec2f5b29cffbaa7675d183d55006";

/**
 * Fetch GPS cordinates from a city name
 * @param {string} city --the city name
 * @returns {Promise<Object>} -- The lon (longitude) and lat (latitude) coordinates
 */

const getUserGeoLocation = async (city) => {
  const url = `${API_BASE_URL}/geo/1.0/direct?q=${city}&appid=${apikey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok 
        ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.length) {
      handleError(
        "Impossible de trouver la ville selectionnée. Merci de réesayer un nom de ville/pays valide !",
      );
      setWeatherLoader(false);
      setForecastLoader(false);
      setPollutionAirLoader(false);
      return null;
    }

    const firstElement = data[0];
    const { lat, lon } = firstElement;

    return {
      lat,
      lon,
    };
  } catch (err) {
    handleError(err);
    setWeatherLoader(false);
    setForecastLoader(false);
    setPollutionAirLoader(false);
    return null;
  }
};

/**
 * Fetch GPS cordinates from a city name
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} -- The weather data
 */

const fetchWeatherByGeocode = async (lat, lon) => {
  const url = `${API_BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric&lang=fr`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erreur ${response.statusText}`);
    }

    const dataWeather = await response.json();
    return dataWeather;
  } catch (err) {
    handleError(err);
    setWeatherLoader(false);
    return null;
  }
};

/**
 * Fetch GPS cordinates from a city name
 * @param {number} lat - Latitude
 * @param {number} lon - Latitude
 * @returns {Promise<Object>} -- The weather forecast data
 */

const fetchWeatherForecastByGeocode = async (lat, lon) => {
  const url = `${API_BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric&lang=fr`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur ${response.statusText}`);
    }

    const dataForecast = await response.json();
    return dataForecast;
  } catch (err) {
    handleError(err);
    setForecastLoader(false);
    return null;
  }
};

/**
 * Fetch air pollution for a given location
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} -- The air pollutin data
 */

const fetchAirPollutionByGeocode = async (lat, lon) => {
  const url = `${API_BASE_URL}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apikey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur ${response.statusText}`);
    }
    const dataAir = await response.json();
    return dataAir;
  } catch (err) {
    handleError(err);
    setPollutionAirLoader(false);
    return;
  }
};

export {
  getUserGeoLocation,
  fetchWeatherByGeocode,
  fetchWeatherForecastByGeocode,
  fetchAirPollutionByGeocode,
};
