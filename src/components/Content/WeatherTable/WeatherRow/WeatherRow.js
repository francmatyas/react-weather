import "./WeatherRow.scss";
import { getWeatherIcon } from "../../../../scripts/WeatherIcon";
import { toFahrenheit } from "../../../../scripts/UnitConverter";
import weatherLegend from "../../../../assets/data/weatherLegend.json";
import { Tooltip } from "@mui/material";

function WeatherRow(props) {
  const weather = props.weather;
  const time = weather.hour;

  const temp = Math.round(weather.data.instant.details.air_temperature);
  const tempCelsius = Math.round(temp) + "°C";
  const tempFahrenheit = Math.round(toFahrenheit(temp)) + "°F";

  const precipitation = getPrecipitation();
  const windSpeed = Math.round(weather.data.instant.details.wind_speed);

  const weatherCode = getWeatherCode();
  const icon = getWeatherIcon(weatherCode, 32);
  const weatherDescription = weatherLegend[weatherCode.split("_")[0]]?.desc_en;

  function getPrecipitation() {
    if (weather.data.next_1_hours !== undefined) {
      return weather.data.next_1_hours.details.precipitation_amount;
    } else if (weather.data.next_3_hours !== undefined) {
      return weather.data.next_3_hours.details.precipitation_amount;
    } else if (weather.data.next_6_hours !== undefined) {
      return weather.data.next_6_hours.details.precipitation_amount;
    }
  }

  function getWeatherCode() {
    if (weather.data.next_1_hours !== undefined) {
      return weather.data.next_1_hours.summary.symbol_code;
    } else if (weather.data.next_3_hours !== undefined) {
      return weather.data.next_3_hours.summary.symbol_code;
    } else if (weather.data.next_6_hours !== undefined) {
      return weather.data.next_6_hours.summary.symbol_code;
    } else {
      return "";
    }
  }

  return (
    <div className="weather-row">
      <span className="weather-row__time">{time}</span>
      <Tooltip title={weatherDescription} placement="top">
        <span className="weather-row__icon">{icon}</span>
      </Tooltip>
      <span className="weather-row__temp">
        {props.unit === "celsius" ? tempCelsius : tempFahrenheit}
      </span>
      <span className="weather-row__precipitation">
        {precipitation !== 0 && precipitation ? precipitation + " mm" : ""}
      </span>
      <span className="weather-row__wind">{windSpeed} m/s</span>
    </div>
  );
}

export default WeatherRow;
