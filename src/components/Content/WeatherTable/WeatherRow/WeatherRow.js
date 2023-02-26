import "./WeatherRow.scss";
import { Tooltip } from "@mui/material";
import { HiOutlineArrowNarrowDown } from "react-icons/hi";

function WeatherRow(props) {
  const weather = props.weather;
  const time = props.weather.hour;
  const precipitation = weather.getPrecipitation();

  return (
    <div id="weather-row">
      <span id="weather-row__time">{time}</span>
      <Tooltip title={weather.getDescription()} placement="top">
        <span id="weather-row__icon">{weather.getIcon(32)}</span>
      </Tooltip>
      <span id="weather-row__temp">
        {props.unit === "celsius"
          ? weather.getCelsiusTemperature()
          : weather.getFahrenheitTemperature()}
      </span>
      <span id="weather-row__precipitation">
        {precipitation !== 0 && precipitation ? precipitation + " mm" : ""}
      </span>
      <span id="weather-row__wind">
        {Math.round(weather.getWindSpeed())} m/s{" "}
        <HiOutlineArrowNarrowDown
          size={24}
          style={{ transform: `rotate(${weather.getWindDirection()}deg)` }}
        />
      </span>
    </div>
  );
}

export default WeatherRow;
