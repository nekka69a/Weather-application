/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable func-names */
/* eslint-disable no-undef */
import { apikey } from "./currentLocation.js"

async function apiCallAir(lat, lon) {
  document.querySelector("form").addEventListener("submit", async (evt) => {
    evt.preventDefault()
    const ville = document.querySelector("#input-search").value

    // Utiliser la géolocalisation pour obtenir les coordonnées
    const getUserGeoLocation = async () => {
      if (navigator.geolocation) {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
          })
          lat = position.coords.latitude
          lon = position.coords.longitude
          console.log(`Latitude: ${lat}, Longitude: ${lon}`)
        } catch (err) {
          console.error("Geolocation is not supported by this browser.")
        }
      } else {
        console.log("Geolocation is not supported by this browser.")
      }
    }
    getUserGeoLocation()

    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apikey}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Network response was not ok ${response.statusText}`)
      }
      const data = await response.json()
      console.log(data)

      // Mettre à jour le DOM avec les données de qualité de l'air
      const updateDom = () => {
        document.querySelector(".indice").innerHTML =
          `Indice de qualité de l'air : ${data.list[0].main.aqi}`
        document.querySelector(".co").innerHTML =
          `CO : ${data.list[0].components.co} µg/m³`
        document.querySelector(".no").innerHTML =
          `NO : ${data.list[0].components.no} µg/m³`
        document.querySelector(".no2").innerHTML =
          `NO² : ${data.list[0].components.no2} µg/m³`
        document.querySelector(".o3").innerHTML =
          `O3 : ${data.list[0].components.o3} µg/m³`
        document.querySelector(".so2").innerHTML =
          `SO² : ${data.list[0].components.so2} µg/m³`
        document.querySelector(".pm2").innerHTML =
          `PM2.5 : ${data.list[0].components.pm2_5} µg/m³`
        document.querySelector(".pm10").innerHTML =
          `PM10 : ${data.list[0].components.pm10} µg/m³`
        document.querySelector(".nh3").innerHTML =
          `NH3 : ${data.list[0].components.nh3} µg/m³`
      }

      updateDom()
    } catch (err) {
      console.error(`Erreur : ${err}`)
    }
  })
}

export default apiCallAir
