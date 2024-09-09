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
 * Handle errors during API fetch or processing
 * @param {string} message - Error message to display
 */

const handleError = (message) => {
  const errorElementDiv = document.getElementById("error");
  const city = document.querySelector(".city");
  city.innerHTML = "Ville non trouvée";
  city.style.color = "#9015d1";
  errorElementDiv.textContent = message;
  errorElementDiv.style.display = "block";
};

/**
 * Reset errors shown in UI
 display
 */

const resetError = () => {
  const errorElementDiv = document.getElementById("error");
  errorElementDiv.textContent = "";
  errorElementDiv.style.display = "none";
};

/** *
 * Displays weather data
 * @param {Object} weatherData -- The weather data object
 */
const displayWeatherDetails = (weatherData) => {
  const currentWeatherDiv = document.querySelector(".current-weather");

  document.querySelector(".city").innerHTML = `${weatherData.name}`;

  // Clear the previous data
  currentWeatherDiv.innerHTML = "";

  const currentWeatherHTML = `<div class="temp-feel"><div class="temp">${Math.round(weatherData.main.temp)} °C</div>
   <div class="feel">Ressenti: ${Math.round(weatherData.main.feels_like)} °C</div></div>
   <div class="weather">
   <div class="icon"><img class="weather-icon" src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" alt=""/></div>
   <div class="weather-city">${weatherData.weather[0].description}</div> </div>
   <div class="min-max-temp">
              <div class="minmax-icon"><img class="img-icon" src="../assets/thermometre.png "alt="" /></div>
              <div class="minmax-data">Min: ${Math.round(
                weatherData.main.temp_min,
              )}°C</br>Max: ${Math.round(weatherData.main.temp_max)}°C</div>
            </div>
            <div class="humidity">
              <div class="humidity-icon"><img class="img-icon" src="../assets/humidite (1).png "alt="" /></div>
              <div class="humidity-data">Humidité : ${weatherData.main.humidity} %</div>
            </div>
            <div class="wind-speed-direction">
              <div class="wind-icon"><img class="img-icon" src="../assets/vent (1).png "alt="" /></div>
              <div class="wind-speed">${weatherData.wind.speed} m/s</br>Direction: ${weatherData.wind.deg}°</div>
            </div>
            <div class="pressure">
              <div class="pressure-icon"><img class="img-icon" src="../assets/pression.png "alt="" /></div>
              <div class="pressure-data">${weatherData.main.pressure} hPa</div>
            </div>
            <div class="visibility">
              <div class="visibility-icon"><img class="img-icon" src="../assets/oeil.png "alt="" /></div>
              <div class="visibility-data">${
                weatherData.visibility / 1000
              } Km</div>
            </div>`;

  currentWeatherDiv.innerHTML = currentWeatherHTML;
};

/** *
 * Displays forecast weather data
 * @param {Object} forecastData -- The forecast weather data object
 */

const displayForecast = (forecastData) => {
  const containerBoxDiv = document.querySelector(".container-box");

  // Clear the previous data
  containerBoxDiv.innerHTML = "";

  const weatherForecastHTML = `
              <div class="box1">
              <div class="date1"></div>
              <div class="icon1"></div>
              <div class="temp1"></div>
              <div class="min-max1"></div>
              <div class="humidity1"></div>
            </div>

            <div class="box2">
              <div class="date2"></div>
              <div class="icon2"></div>
              <div class="temp2"></div>
              <div class="min-max2"></div>
              <div class="humidity2"></div>
            </div>
            <div class="box3">
              <div class="date3"></div>
              <div class="icon3"></div>
              <div class="temp3"></div>
              <div class="min-max3"></div>
              <div class="humidity3"></div>
            </div>
            <div class="box4">
              <div class="date4"></div>
              <div class="icon4"></div>
              <div class="temp4"></div>
              <div class="min-max4"></div>
              <div class="humidity4"></div>
            </div>
            <div class="box5">
              <div class="date5"></div>
              <div class="icon5"></div>
              <div class="temp5"></div>
              <div class="min-max5"></div>
              <div class="humidity5"></div>
            </div>`;

  containerBoxDiv.innerHTML = weatherForecastHTML;

  for (let i = 0; i < forecastData.list.length; i += 8) {
    const index = i / 8 + 1;

    ///   ============= DATE ===========
    const date = forecastData.list[i].dt_txt.split(" ")[0];
    document.querySelector(`.date${index}`).innerHTML = ` ${date}`;

    //   ============= ICON ===========
    document.querySelector(`.icon${index}`).innerHTML =
      `<img class="weather-icon" src="https://openweathermap.org/img/wn/${forecastData.list[i].weather[0].icon}@2x.png" alt="" />`;

    //   ========= TEMPERATURE ========
    document.querySelector(`.temp${index}`).innerHTML =
      ` ${forecastData.list[i].main.temp.toFixed(1)}°C`;

    //   ============ MIN-MAX ==========
    document.querySelector(`.min-max${index}`).innerHTML =
      ` Min: ${forecastData.list[i].main.temp_min.toFixed(1)}°C - Max: ${forecastData.list[i].main.temp_max.toFixed(1)}°C`;

    //   ============= HUMIDITY =========
    document.querySelector(`.humidity${index}`).innerHTML =
      ` ${forecastData.list[i].main.humidity} %`;
  }
};
/** *
 * Displays air pollution data
 * @param {Object} aiPollutionData -- The air pollution data object
 */

const displayAirPollution = (airPollutionData) => {
  const airQualityDiv = document.querySelector(".air-quality-data");

  // Clear the previous data
  airQualityDiv.innerHTML = "";

  const airQualityHTML = `
    <div class="indice">Indice de qualité de l'air : ${airPollutionData.list[0].main.aqi}</div>
    <div class="co">CO : ${airPollutionData.list[0].components.co} µg/m³</div>
    <div class="no">NO : ${airPollutionData.list[0].components.no} µg/m³</div>
    <div class="no2">NO² : ${airPollutionData.list[0].components.no2} µg/m³</div>
    <div class="o3">O3 : ${airPollutionData.list[0].components.o3} µg/m³</div>
    <div class="so2">SO² : ${airPollutionData.list[0].components.so2} µg/m³</div>
    <div class="pm2">PM2.5 : ${airPollutionData.list[0].components.pm2_5} µg/m³</div>
    <div class="pm10">PM10 : ${airPollutionData.list[0].components.pm10} µg/m³</div>
    <div class="nh3">NH3 : ${airPollutionData.list[0].components.nh3} µg/m³</div>
  `;
  airQualityDiv.innerHTML = airQualityHTML;
};

/**
 * Display the UI width the fetched weather, forecast and air pollution data
 * @param {Object} weatherData -- The weather data object
 * @param {Object} forecastData -- The forecast data object
 * @param {Object} airPollutionData -- The air pollution data object
 * @returns {void}
 */

const displayWeather = (weatherData, forecastData, airPollutionData) => {
  if (Object.keys(weatherData || {}).length) {
    displayWeatherDetails(weatherData);
  }
  if (Object.keys(forecastData || {}).length) {
    displayForecast(forecastData);
  }
  if (Object.keys(airPollutionData || {}).length) {
    displayAirPollution(airPollutionData);
  }
};

export {
  displayWeather,
  handleError,
  resetError,
  setWeatherLoader,
  setForecastLoader,
  setPollutionAirLoader,
};
