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

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date(weather[0].time);
  const day = days[date.getDay()] + " " + date.getDate() + "." + (date.getMonth() + 1) + ".";

  if (weather.length !== 0) {
    if (weather.length === 1) {
      weather[0]["hour"] = correctHour(new Date(weather[0].time).getHours());
    }

    for (let i = 0; i < weather.length - 1; i++) {
      const time = new Date(weather[i].time).getHours();
      const nextTime = new Date(weather[i + 1].time).getHours();
      if (time === nextTime - 1) {
        weather[i]["hour"] = correctHour(time);
      } else {
        weather[i]["hour"] = correctHour(time) + " - " + correctHour(nextTime);
      }

      if (i === weather.length - 2) {
        if (time === nextTime - 1) {
          weather[i + 1]["hour"] = correctHour(nextTime);
        } else {
          weather[i + 1]["hour"] =
            correctHour(nextTime) + " - " + correctHour((nextTime + 6) % 24);
        }
      }
    }
  }

  function correctHour(hour) {
    if (hour < 10) {
      return "0" + hour;
    }
    return hour;
  }

  return (
    <div className="weather-table">
      <div className="weather-table__date">
        {day}
      </div>
      <div className="weather-table__table">
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
        <div className="weather-table__rows">
          {weather.map((element) => (
            <WeatherRow weather={element} key={Math.random()} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeatherTable;
