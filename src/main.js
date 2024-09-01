import { getTemperatureAndAirQualityData } from "./currentLocation.js";
import { getForecastData } from "./forecast.js";
import { clearCity } from "./utils.js";

function main() {
  getTemperatureAndAirQualityData();
  getForecastData();
  clearCity();
}

main();
