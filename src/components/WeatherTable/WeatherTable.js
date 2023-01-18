import "./WeatherTable.scss";

import {
  TbTemperatureCelsius,
  TbClock,
  TbWind,
  TbUmbrella,
  TbTornado,
} from "react-icons/tb";

import WeatherRow from "./WeatherRow/WeatherRow";

function WeatherTable(props) {
  const weather = props.weather;

  return (
    <div className="weather-table">
      <div className="weather-table__header">
        <span className="weather-table__header__time">
          <TbClock size={32} />
        </span>
        <span className="weather-table__header__temp">
          <TbTemperatureCelsius size={32} />
        </span>
        <span className="weather-table__header__precipitation">
          <TbUmbrella size={32} />
        </span>
        <span className="weather-table__header__wind">
          <TbTornado size={32} />
        </span>
      </div>
        {weather.map((element) => (
            <WeatherRow weather={element} key={Math.random()} />
        ))}
    </div>
  );
}

export default WeatherTable;
