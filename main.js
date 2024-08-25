import { apiCallLocationAndAirQuality } from "./src/currentLocation.js";
import { apiCallForecast } from "./src/forecast.js";

function main() {
  apiCallLocationAndAirQuality();
  apiCallForecast();
}

main();
