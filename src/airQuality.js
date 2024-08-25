const apikey = "01aa6eb928bd25948a3cd005133e5e48";

export const apiCallAir = function (lat, lon) {
  document.querySelector("form").addEventListener("submit", function (evt) {
    evt.preventDefault();
    let ville = document.querySelector("#input-search").value;
    let url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apikey}`;

    fetch(url).then((response) =>
      response.json().then((data) => {
        console.log(data);

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            console.log(`Latitude: ${lat}, Longitude: ${lon}`);
          });
        } else {
          console.log("Geolocation is not supported by this browser.");
        }

        document.querySelector(
          ".indice"
        ).innerHTML = `Indice de qualité de l'air : ${data.list[0].main.aqi}`;
        document.querySelector(
          ".co"
        ).innerHTML = `CO : ${data.list[0].components.co} µg/m³`;
        document.querySelector(
          ".no"
        ).innerHTML = `NO : ${data.list[0].components.no} µg/m³`;
        document.querySelector(
          ".no2"
        ).innerHTML = `NO² : ${data.list[0].components.no2} µg/m³`;
        document.querySelector(
          ".o3"
        ).innerHTML = `O3 : ${data.list[0].components.o3} µg/m³`;
        document.querySelector(
          ".so2"
        ).innerHTML = `SO² : ${data.list[0].components.so2} µg/m³`;
        document.querySelector(
          ".pm2"
        ).innerHTML = `PM2.5 : ${data.list[0].components.pm2_5} µg/m³`;
        document.querySelector(
          ".pm10"
        ).innerHTML = `PM10 : ${data.list[0].components.pm10} µg/m³`;
        document.querySelector(
          ".nh3"
        ).innerHTML = `NH3 : ${data.list[0].components.nh3} µg/m³`;
      })
    );
  });
};
