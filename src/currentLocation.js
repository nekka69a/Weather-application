import {
  updateCurrentWeatherData,
  getUserGeoLocation,
  updateAirQualityData,
  apikey,
} from "./utils.js";

export function apiCallLocationAndAirQuality() {
  document.querySelector("form").addEventListener("submit", async (evt) => {
    evt.preventDefault();
    const ville = document.querySelector("#input-search").value;

    // Appel api pour la météo actuelle
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${apikey}&units=metric&lang=fr`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erreur ${response.statusText}`);
      }
      const dataWeather = await response.json();

      // Mise à jour du Dom avec les données api
      updateCurrentWeatherData(ville, dataWeather);

      // Appel api air pollution avec la ville
      await apiCallAir(ville);
    } catch (err) {
      document.querySelector(".city").innerHTML = "Ville non trouvée";
      console.error(`Erreur : ${err}`);
    }
  });
}

async function apiCallAir(ville) {
  try {
    const { lat, lon } = await getUserGeoLocation(ville);

    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apikey}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur ${response.statusText}`);
    }
    const dataAir = await response.json();

    // Mise à jour du DOM
    updateAirQualityData(dataAir);
  } catch (err) {
    console.error(`Erreur : ${err}`);
  }
}
