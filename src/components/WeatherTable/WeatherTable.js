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

  if (weather.length !== 0) {
    for (let i = 0; i < weather.length - 1; i++) {
      const time = new Date(weather[i].time).getHours();
      const nextTime = new Date(weather[i + 1].time).getHours();
      if (time === nextTime - 1) {
        weather[i]["hour"] = time;
      } else {
        weather[i]["hour"] = time + " - " + (nextTime - 1);
      }

      if (i === weather.length - 2) {
        if (time === nextTime - 1) {
          weather[i + 1]["hour"] = nextTime;
        } else {
          weather[i + 1]["hour"] = nextTime + " - " + (nextTime + 5);
        }
      }
    }
  }

  console.log(weather);

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
