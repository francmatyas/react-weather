import "./WeatherRow.scss";
import {
  getWeatherIcon,
  toFahrenheit,
  getPrecipitation,
  getWeatherCode,
} from "../../../../scripts/WeatherUtils";
import weatherLegend from "../../../../assets/data/weatherLegend.json";
import { Tooltip } from "@mui/material";
import { HiOutlineArrowNarrowDown } from "react-icons/hi";

function WeatherRow(props) {
  const weather = props.weather.data;
  const time = props.weather.hour;

  const temp = Math.round(weather.instant.details.air_temperature);
  const tempCelsius = Math.round(temp) + "°C";
  const tempFahrenheit = Math.round(toFahrenheit(temp)) + "°F";

  const precipitation = getPrecipitation(weather);
  const windSpeed = Math.round(weather.instant.details.wind_speed);
  const windDirection = weather.instant.details.wind_from_direction;

  const weatherCode = getWeatherCode(weather);
  const icon = getWeatherIcon(weatherCode, 32);
  const weatherDescription = weatherLegend[weatherCode.split("_")[0]]?.desc_en;

  return (
    <div id="weather-row">
      <span id="weather-row__time">{time}</span>
      <Tooltip title={weatherDescription} placement="top">
        <span id="weather-row__icon">{icon}</span>
      </Tooltip>
      <span id="weather-row__temp">
        {props.unit === "celsius" ? tempCelsius : tempFahrenheit}
      </span>
      <span id="weather-row__precipitation">
        {precipitation !== 0 && precipitation ? precipitation + " mm" : ""}
      </span>
      <span id="weather-row__wind">
        {windSpeed} m/s{" "}
        <HiOutlineArrowNarrowDown
          size={24}
          style={{ transform: `rotate(${windDirection}deg)` }}
        />
      </span>
    </div>
  );
}

export default WeatherRow;
