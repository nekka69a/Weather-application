export const apikey = "01aa6eb928bd25948a3cd005133e5e48";

export async function getUserGeoLocation(ville) {
  const urlLocation = `http://api.openweathermap.org/geo/1.0/direct?q=${ville}&appid=${apikey}`;
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
}

export const updateCurrentWeatherData = (ville, dataWeather) => {
  document.querySelector(".city").innerHTML = `${ville}`;
  document.querySelector(".temp").innerHTML =
    ` ${Math.round(dataWeather.main.temp)}°C`;
  document.querySelector(".feel").innerHTML =
    `Ressenti: ${Math.round(dataWeather.main.feels_like)}°C`;
  document.querySelector(".icon").innerHTML =
    `<img class="weather-icon" src="https://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@2x.png" alt=""/>`;
  document.querySelector(".weather-city").innerHTML =
    dataWeather.weather[0].description;
  document.querySelector(".humidity-icon").innerHTML =
    '<img class="img-icon" src="../assets/humidite (1).png "alt="" />';
  document.querySelector(".humidity-data").innerHTML =
    `Humidité : ${dataWeather.main.humidity} %`;
  document.querySelector(".minmax-icon").innerHTML =
    '<img class="img-icon" src="../assets/thermometre.png "alt="" />';
  document.querySelector(".minmax-data").innerHTML = `Min: ${Math.round(
    dataWeather.main.temp_min,
  )}°C</br>Max: ${Math.round(dataWeather.main.temp_max)}°C`;
  document.querySelector(".wind-icon").innerHTML =
    '<img class="img-icon" src="../assets/vent (1).png "alt="" />';
  document.querySelector(".wind-speed").innerHTML =
    `${dataWeather.wind.speed} m/s</br>Direction: ${dataWeather.wind.deg}°`;
  document.querySelector(".pressure-icon").innerHTML =
    '<img class="img-icon" src="../assets/pression.png "alt="" />';
  document.querySelector(".pressure-data").innerHTML =
    `${dataWeather.main.pressure} hPa`;
  document.querySelector(".visibility-icon").innerHTML =
    '<img class="img-icon" src="../assets/oeil.png "alt="" />';
  document.querySelector(".visibility-data").innerHTML = `${
    dataWeather.visibility / 1000
  } Km`;
};

export const updateAirQualityData = (dataAir) => {
  document.querySelector(".indice").innerHTML =
    `Indice de qualité de l'air : ${dataAir.list[0].main.aqi}`;
  document.querySelector(".co").innerHTML =
    `CO : ${dataAir.list[0].components.co} µg/m³`;
  document.querySelector(".no").innerHTML =
    `NO : ${dataAir.list[0].components.no} µg/m³`;
  document.querySelector(".no2").innerHTML =
    `NO² : ${dataAir.list[0].components.no2} µg/m³`;
  document.querySelector(".o3").innerHTML =
    `O3 : ${dataAir.list[0].components.o3} µg/m³`;
  document.querySelector(".so2").innerHTML =
    `SO² : ${dataAir.list[0].components.so2} µg/m³`;
  document.querySelector(".pm2").innerHTML =
    `PM2.5 : ${dataAir.list[0].components.pm2_5} µg/m³`;
  document.querySelector(".pm10").innerHTML =
    `PM10 : ${dataAir.list[0].components.pm10} µg/m³`;
  document.querySelector(".nh3").innerHTML =
    `NH3 : ${dataAir.list[0].components.nh3} µg/m³`;
};

export function clearCity() {
  const input = document.querySelector("#input-search");
  input.addEventListener("click", () => {
    document.querySelector(".city").innerHTML = "";
  });
}
