import {
  setWeatherLoader,
  setForecastLoader,
  setPollutionAirLoader,
} from "./ui.js";

/** *
 * Displays weather data
 * @param {Object} weatherData -- The weather data object
 */
const displayWeatherDetails = (weatherDetails) => {
  if (!weatherDetails || !weatherDetails.main || !weatherDetails.main.temp) {
    console.error("Weather data is missing or incomplete");
    return;
  }

  document.querySelector(".city").innerHTML = `${weatherDetails.name}`;
  document.querySelector(".temp").innerHTML =
    `${Math.round(weatherDetails.main.temp)}°C`;
  document.querySelector(".feel").innerHTML =
    `Ressenti: ${Math.round(weatherDetails.main.feels_like)}°C`;
  document.querySelector(".icon").innerHTML =
    `<img class="weather-icon" src="https://openweathermap.org/img/wn/${weatherDetails.weather[0].icon}@2x.png" alt=""/>`;
  document.querySelector(".weather-city").innerHTML =
    weatherDetails.weather[0].description;
  document.querySelector(".humidity-icon").innerHTML =
    '<img class="img-icon" src="../assets/humidite (1).png "alt="" />';
  document.querySelector(".humidity-data").innerHTML =
    `Humidité : ${weatherDetails.main.humidity} %`;
  document.querySelector(".minmax-icon").innerHTML =
    '<img class="img-icon" src="../assets/thermometre.png "alt="" />';
  document.querySelector(".minmax-data").innerHTML = `Min: ${Math.round(
    weatherDetails.main.temp_min,
  )}°C</br>Max: ${Math.round(weatherDetails.main.temp_max)}°C`;
  document.querySelector(".wind-icon").innerHTML =
    '<img class="img-icon" src="../assets/vent (1).png "alt="" />';
  document.querySelector(".wind-speed").innerHTML =
    `${weatherDetails.wind.speed} m/s</br>Direction: ${weatherDetails.wind.deg}°`;
  document.querySelector(".pressure-icon").innerHTML =
    '<img class="img-icon" src="../assets/pression.png "alt="" />';
  document.querySelector(".pressure-data").innerHTML =
    `${weatherDetails.main.pressure} hPa`;
  document.querySelector(".visibility-icon").innerHTML =
    '<img class="img-icon" src="../assets/oeil.png "alt="" />';
  document.querySelector(".visibility-data").innerHTML = `${
    weatherDetails.visibility / 1000
  } Km`;
};

/** *
 * Displays forecast weather data
 * @param {Object} forecastData -- The forecast weather data object
 */

const displayForecast = (forecastDetails) => {
  for (let i = 0; i < forecastDetails.list.length; i += 8) {
    const index = i / 8 + 1;

    ///   ============= DATE ===========
    const date = forecastDetails.list[i].dt_txt.split(" ")[0];
    document.querySelector(`.date${index}`).innerHTML = ` ${date}`;

    //   ============= ICON ===========
    document.querySelector(`.icon${index}`).innerHTML =
      `<img class="weather-icon" src="https://openweathermap.org/img/wn/${forecastDetails.list[i].weather[0].icon}@2x.png" alt="" />`;

    //   ========= TEMPERATURE ========
    document.querySelector(`.temp${index}`).innerHTML =
      ` ${forecastDetails.list[i].main.temp.toFixed(1)}°C`;

    //   ============ MIN-MAX ==========
    document.querySelector(`.min-max${index}`).innerHTML =
      ` Min: ${forecastDetails.list[i].main.temp_min.toFixed(1)}°C - Max: ${forecastDetails.list[i].main.temp_max.toFixed(1)}°C`;

    //   ============= HUMIDITY =========
    document.querySelector(`.humidity${index}`).innerHTML =
      ` ${forecastDetails.list[i].main.humidity} %`;
  }
};

/** *
 * Displays air pollution data
 * @param {Object} aiPollutionData -- The air pollution data object
 */

const displayAirPollution = (airPollutionDetails) => {
  document.querySelector(".indice").innerHTML =
    `Indice de qualité de l'air : ${airPollutionDetails.list[0].main.aqi}`;
  document.querySelector(".co").innerHTML =
    `CO : ${airPollutionDetails.list[0].components.co} µg/m³`;
  document.querySelector(".no").innerHTML =
    `NO : ${airPollutionDetails.list[0].components.no} µg/m³`;
  document.querySelector(".no2").innerHTML =
    `NO² : ${airPollutionDetails.list[0].components.no2} µg/m³`;
  document.querySelector(".o3").innerHTML =
    `O3 : ${airPollutionDetails.list[0].components.o3} µg/m³`;
  document.querySelector(".so2").innerHTML =
    `SO² : ${airPollutionDetails.list[0].components.so2} µg/m³`;
  document.querySelector(".pm2").innerHTML =
    `PM2.5 : ${airPollutionDetails.list[0].components.pm2_5} µg/m³`;
  document.querySelector(".pm10").innerHTML =
    `PM10 : ${airPollutionDetails.list[0].components.pm10} µg/m³`;
  document.querySelector(".nh3").innerHTML =
    `NH3 : ${airPollutionDetails.list[0].components.nh3} µg/m³`;
};

/**
 * Display the UI width the fetched weather, forecast and air pollution data
 * @param {Object} weatherData -- The weather data object
 * @param {Object} forecastData -- The forecast data object
 * @param {Object} airPollutionData -- The air pollution data object
 * @returns {void}
 */

const displayWeather = (weatherData, forecastData, airPollutionData) => {
  displayWeatherDetails(weatherData);
  displayForecast(forecastData);
  displayAirPollution(airPollutionData);
};

/**
 * Updates the UI width the fetched weather, forecast and air pollution data
 * @param {Object} weatherData -- The weather data object
 * @param {Object} forecastData -- The forecast data object
 * @param {Object} airPollutionData -- The air pollution data object
 * @returns {void}
 */

const updateUI = (weatherData, forecastData, airPollutionData) => {
  if (!weatherData || !forecastData || !airPollutionData) {
    console.log("Il manque un jeu de données");
    return;
  }

  console.log("Weather Data:", weatherData);
  console.log("Forecast Data:", forecastData);
  console.log("Air Pollution Data:", airPollutionData);

  setWeatherLoader(false);
  setForecastLoader(false);
  setPollutionAirLoader(false);

  displayWeather(weatherData, forecastData, airPollutionData);
};

export default updateUI;
