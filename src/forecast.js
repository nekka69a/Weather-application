import { apikey } from "./utils.js";

export async function apiCallForecast() {
  document.querySelector("form").addEventListener("submit", async (evt) => {
    evt.preventDefault();
    const ville = document.querySelector("#input-search").value;

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${ville}&appid=${apikey}&units=metric&lang=fr`;

    try {
      const response = await fetch(url);
      const dataForecast = await response.json();

      let count;

      //   ============= DATE ===========
      count = 1;
      for (let i = 0; i < dataForecast.list.length; i += 8) {
        const date = dataForecast.list[i].dt_txt.split(" ")[0];
        document.querySelector(`.date${count}`).innerHTML = ` ${date}`;
        count += 1;
      }

      //   ============= ICON ===========
      count = 1;
      for (let i = 0; i < dataForecast.list.length; i += 8) {
        document.querySelector(`.icon${count}`).innerHTML =
          `<img class="weather-icon" src="https://openweathermap.org/img/wn/${dataForecast.list[i].weather[0].icon}@2x.png" alt="" />`;
        count += 1;
      }

      //   ========= TEMPERATURE ========
      count = 1;
      for (let i = 0; i < dataForecast.list.length; i += 8) {
        document.querySelector(`.temp${count}`).innerHTML =
          ` ${dataForecast.list[i].main.temp.toFixed(1)}°C`;
        count += 1;
      }

      //   ============ MIN-MAX ==========
      count = 1;
      for (let i = 0; i < dataForecast.list.length; i += 8) {
        document.querySelector(`.min-max${count}`).innerHTML =
          ` Min: ${dataForecast.list[i].main.temp_min.toFixed(1)}°C - Max: ${dataForecast.list[i].main.temp_max.toFixed(1)}°C`;
        count += 1;
      }

      //   ============= HUMIDITY =========
      count = 1;
      for (let i = 0; i < dataForecast.list.length; i += 8) {
        document.querySelector(`.humidity${count}`).innerHTML =
          ` ${dataForecast.list[i].main.humidity} %`;
        count += 1;
      }
    } catch (err) {
      console.error(`Erreur : ${err}`);
    }
  });
}
