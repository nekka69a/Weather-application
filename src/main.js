import { apiCallLocationAndAirQuality } from "./currentLocation.js"
import { apiCallForecast } from "./forecast.js"

function main() {
  apiCallLocationAndAirQuality()
  apiCallForecast()
}

main()
