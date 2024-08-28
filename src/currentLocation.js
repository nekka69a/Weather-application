export const apikey = "01aa6eb928bd25948a3cd005133e5e48";

export function apiCallLocationAndAirQuality() {
  document.querySelector("form").addEventListener("submit", async (evt) => {
    evt.preventDefault();
    const ville = document.querySelector("#input-search").value;

    // Appel api pour la météo actuelle
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${apikey}&units=metric&lang=fr`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Network response was not ok ${response.statusText}`);
      }
      const data = await response.json();

      // Mise à jour du Dom avec les données api
      updateDom(ville, data);

      // Appel api air pollution avec la ville
      await apiCallAir(ville);
    } catch (err) {
      document.querySelector(".city").innerHTML = "Ville non trouvée";
      console.error(`Erreur : ${err}`);
    }
  });
}

const updateDom = (ville, data) => {
  document.querySelector(".city").innerHTML = `${ville}`;
  document.querySelector(".temp").innerHTML = ` ${Math.round(
    data.main.temp,
  )}°C`;
  document.querySelector(".feel").innerHTML = `Ressenti: ${Math.round(
    data.main.feels_like,
  )}°C`;
  document.querySelector(".icon").innerHTML =
    `<img class="weather-icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="" />`;
  document.querySelector(".weather-city").innerHTML =
    data.weather[0].description;
  document.querySelector(".humidity-icon").innerHTML =
    '<img class="img-icon" src="../assets/humidite (1).png "alt="" />';
  document.querySelector(".humidity-data").innerHTML =
    `Humidité : ${data.main.humidity} %`;
  document.querySelector(".minmax-icon").innerHTML =
    '<img class="img-icon" src="../assets/thermometre.png "alt="" />';
  document.querySelector(".minmax-data").innerHTML = `Min: ${Math.round(
    data.main.temp_min,
  )}°C</br>Max: ${Math.round(data.main.temp_max)}°C`;
  document.querySelector(".wind-icon").innerHTML =
    '<img class="img-icon" src="../assets/vent (1).png "alt="" />';
  document.querySelector(".wind-speed").innerHTML =
    `${data.wind.speed} m/s</br>Direction: ${data.wind.deg}°`;
  document.querySelector(".pressure-icon").innerHTML =
    '<img class="img-icon" src="../assets/pression.png "alt="" />';
  document.querySelector(".pressure-data").innerHTML =
    `${data.main.pressure} hPa`;
  document.querySelector(".visibility-icon").innerHTML =
    '<img class="img-icon" src="../assets/oeil.png "alt="" />';
  document.querySelector(".visibility-data").innerHTML = `${
    data.visibility / 1000
  } Km`;
};

async function apiCallAir(ville) {
  try {
    // Appel api pour la géolocalisation
    const urlLocation = `http://api.openweathermap.org/geo/1.0/direct?q=${ville}&appid=${apikey}`;
    const responseLocation = await fetch(urlLocation);
    if (!responseLocation.ok) {
      throw new Error(
        `Network response was not ok ${responseLocation.statusText}`,
      );
    }
    const dataLocation = await responseLocation.json();
    console.log("Location Data:", dataLocation);

    if (dataLocation.length === 0) {
      throw new Error("Ville non trouvée");
    }

    const { lat } = dataLocation[0];
    const { lon } = dataLocation[0];

    // Second appel api pour la qualité de l'air
    const urlAir = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apikey}`;
    const responseAir = await fetch(urlAir);
    if (!responseAir.ok) {
      throw new Error(`Network response was not ok ${responseAir.statusText}`);
    }
    const dataAir = await responseAir.json();
    console.log("Air Quality Data:", dataAir);

    // mise à jour du Dom avec les données de l'api
    updateAirQualityData(dataAir);
  } catch (err) {
    console.error(`Erreur : ${err}`);
  }
}

function updateAirQualityData(dataAir) {
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
}
