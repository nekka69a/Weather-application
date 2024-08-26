/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
import { apikey } from "./currentLocation.js"

export async function apiCallForecast() {
  document.querySelector("form").addEventListener("submit", async (evt) => {
    evt.preventDefault()
    const ville = document.querySelector("#input-search").value

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${ville}&appid=${apikey}&units=metric&lang=fr`

    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)

      let countDate = 1
      let countImg = 1
      let countTemp = 1
      let countMinMax = 1
      let countHumidity = 1

      //   ============= DATE ===========
      for (let i = 0; i < data.list.length; i += 8) {
        const date = data.list[i].dt_txt.split(" ")[0]
        document.querySelector(`.date${countDate}`).innerHTML = ` ${date}`
        countDate++
      }

      //   ============= ICON ===========
      for (let i = 0; i < data.list.length; i += 8) {
        document.querySelector(`.icon${countImg}`).innerHTML =
          `<img class="weather-icon" src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" alt="" />`
        countImg++
      }

      //   ========= TEMPERATURE ========
      for (let i = 0; i < data.list.length; i += 8) {
        document.querySelector(`.temp${countTemp}`).innerHTML =
          ` ${data.list[i].main.temp.toFixed(1)}°C`
        countTemp++
      }

      //   ============ MIN-MAX ==========
      for (let i = 0; i < data.list.length; i += 8) {
        document.querySelector(`.min-max${countMinMax}`).innerHTML =
          ` Min: ${data.list[i].main.temp_min.toFixed(1)}°C - Max: ${data.list[i].main.temp_max.toFixed(1)}°C`
        countMinMax++
      }

      //   ============= HUMIDITY =========
      for (let i = 0; i < data.list.length; i += 8) {
        document.querySelector(`.humidity${countHumidity}`).innerHTML =
          ` ${data.list[i].main.humidity} %`
        countHumidity++
      }
    } catch (err) {
      console.error(`Erreur : ${err}`)
    }
  })
}
