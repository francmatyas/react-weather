import "./WeatherRow.scss";
import { Tooltip } from "@mui/material";
import { HiOutlineArrowNarrowDown } from "react-icons/hi";

function WeatherRow(props) {
  const {
    weather,
    weather: {
      celsiusTemperature,
      fahrenheitTemperature,
      windSpeed,
      windDirection,
      precipitation,
      description,
      hour: time,
    },
    unit,
  } = props;

  return (
    <div id="weather-row">
      <p id="weather-row__time">{time}</p>
      <Tooltip title={description} placement="top">
        <span id="weather-row__icon">{weather.getIcon(32)}</span>
      </Tooltip>
      <p id="weather-row__temp">
        {unit === "celsius" ? celsiusTemperature : fahrenheitTemperature}
      </p>
      <p id="weather-row__precipitation">
        {precipitation !== 0 && precipitation ? precipitation + " mm" : ""}
      </p>
      <p id="weather-row__wind">
        {Math.round(windSpeed)} m/s{" "}
        <HiOutlineArrowNarrowDown
          size={24}
          style={{ transform: `rotate(${windDirection}deg)` }}
        />
      </p>
    </div>
  );
}

export default WeatherRow;
