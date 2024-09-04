const API_BASE_URL = "http://api.openweathermap.org";
const apikey = "01aa6eb928bd25948a3cd005133e5e48";

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
        ${responseLocation.statusText}`);
    }

    const data = await response.json();

    console.log("data: ", data);

    if (!data.length) {
      return null;
    }

    const firstElement = data[0];
    const { lat, lon } = firstElement;

    console.log(lat);
    console.log(lon);

    return {
      lat,
      lon,
    };
  } catch (err) {
    console.log(err);
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
  const url = `${API_BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erreur ${response.statusText}`);
    }

    const dataWeather = await response.json();
    console.log("weather: ", dataWeather);
    return dataWeather;
  } catch (err) {
    console.error(`Erreur : ${err}`);
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
  const url = `${API_BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur ${response.statusText}`);
    }

    const dataForecast = await response.json();
    console.log("forecast: ", dataForecast);
    return dataForecast;
  } catch (err) {
    console.error(`Erreur : ${err}`);
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
    console.log("dataAir: ", dataAir);
    return dataAir;
  } catch (err) {
    console.error(`Erreur : ${err}`);
    return;
  }
};

export {
  getUserGeoLocation,
  fetchWeatherByGeocode,
  fetchWeatherForecastByGeocode,
  fetchAirPollutionByGeocode,
};
