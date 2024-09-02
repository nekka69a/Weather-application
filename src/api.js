const API_BASE_URL = "http://api.openweathermap.org";
const apikey = "01aa6eb928bd25948a3cd005133e5e48";

/**
 * Fetch GPS cordinates from a city name
 * @param {string} city --the city name
 * @returns {Promise<Object>} -- The lon (longitude) and lat (latitude) coordinates
 */

const getUserGeoLocation = async (city) => {
  const urlLocation = `${API_BASE_URL}/geo/1.0/direct?q=${city}&appid=${apikey}`;

  try {
    const responseLocation = await fetch(urlLocation);
    if (!responseLocation.ok) {
      throw new Error(`Network response was not ok 
        ${responseLocation.statusText}`);
    }

    const dataLocation = await responseLocation.json();

    if (dataLocation.length === 0) {
      throw new Error("Ville non trouvée");
    }

    const { lat } = dataLocation[0];
    const { lon } = dataLocation[0];

    return { lat, lon };
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
  const url = `${API_BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric&lang=fr`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur ${response.statusText}`);
    }
    const dataWeather = await response.json();
    return dataWeather;
  } catch (err) {
    document.querySelector(".error").innerHTML = "Erreur: Ville non trouvée";
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
  const url = `${API_BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric&lang=fr`;

  try {
    const response = await fetch(url);
    const dataForecast = await response.json();

    for (let i = 0; i < dataForecast.list.length; i += 8) {
      const index = i / 8 + 1;

      ///   ============= DATE ===========
      const date = dataForecast.list[i].dt_txt.split(" ")[0];
      document.querySelector(`.date${index}`).innerHTML = ` ${date}`;

      //   ============= ICON ===========
      document.querySelector(`.icon${index}`).innerHTML =
        `<img class="weather-icon" src="https://openweathermap.org/img/wn/${dataForecast.list[i].weather[0].icon}@2x.png" alt="" />`;

      //   ========= TEMPERATURE ========
      document.querySelector(`.temp${index}`).innerHTML =
        ` ${dataForecast.list[i].main.temp.toFixed(1)}°C`;

      //   ============ MIN-MAX ==========
      document.querySelector(`.min-max${index}`).innerHTML =
        ` Min: ${dataForecast.list[i].main.temp_min.toFixed(1)}°C - Max: ${dataForecast.list[i].main.temp_max.toFixed(1)}°C`;

      //   ============= HUMIDITY =========
      document.querySelector(`.humidity${index}`).innerHTML =
        ` ${dataForecast.list[i].main.humidity} %`;
    }
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
    return dataAir;
  } catch (err) {
    console.error(`Erreur : ${err}`);
    return null;
  }
};

export {
  getUserGeoLocation,
  fetchWeatherByGeocode,
  fetchWeatherForecastByGeocode,
  fetchAirPollutionByGeocode,
};
