import { apikey } from "./utils.js";

export async function apiCallForecast() {
  document.querySelector("form").addEventListener("submit", async (evt) => {
    evt.preventDefault();
    const ville = document.querySelector("#input-search").value;

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${ville}&appid=${apikey}&units=metric&lang=fr`;

    try {
      const response = await fetch(url);
      const dataForecast = await response.json();

      //   ============= DATE ===========
      for (let i = 0; i < dataForecast.list.length; i += 8) {
        const date = dataForecast.list[i].dt_txt.split(" ")[0];
        document.querySelector(`.date${i / 8 + 1}`).innerHTML = ` ${date}`;
      }

      //   ============= ICON ===========
      for (let i = 0; i < dataForecast.list.length; i += 8) {
        document.querySelector(`.icon${i / 8 + 1}`).innerHTML =
          `<img class="weather-icon" src="https://openweathermap.org/img/wn/${dataForecast.list[i].weather[0].icon}@2x.png" alt="" />`;
      }

      //   ========= TEMPERATURE ========
      for (let i = 0; i < dataForecast.list.length; i += 8) {
        document.querySelector(`.temp${i / 8 + 1}`).innerHTML =
          ` ${dataForecast.list[i].main.temp.toFixed(1)}°C`;
      }

      //   ============ MIN-MAX ==========
      for (let i = 0; i < dataForecast.list.length; i += 8) {
        document.querySelector(`.min-max${i / 8 + 1}`).innerHTML =
          ` Min: ${dataForecast.list[i].main.temp_min.toFixed(1)}°C - Max: ${dataForecast.list[i].main.temp_max.toFixed(1)}°C`;
      }

      //   ============= HUMIDITY =========
      for (let i = 0; i < dataForecast.list.length; i += 8) {
        document.querySelector(`.humidity${i / 8 + 1}`).innerHTML =
          ` ${dataForecast.list[i].main.humidity} %`;
      }
    } catch (err) {
      console.error(`Erreur : ${err}`);
    }
  });
}
