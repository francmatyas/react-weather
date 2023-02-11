import "./WeatherPage.scss";

import {
  WiSunrise,
  WiSunset,
  WiHumidity,
  WiThermometerExterior,
  WiUmbrella,
  WiTornado,
  WiTime8,
} from "react-icons/wi";
import { HiOutlineArrowNarrowDown } from "react-icons/hi";

import WeatherRow from "../WeatherRow/WeatherRow";

function WeatherPage(props) {
  const weather = props.weather;
  const [sunrise, sunset] = props.twilight;

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(weather[0].time);
  const day =
    days[date.getDay()] +
    " " +
    date.getDate() +
    "." +
    (date.getMonth() + 1) +
    ".";

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
    <div className="weather-page">
      <div className="weather-page__date">{day}</div>
      <div className="weather-page__table">
        <div className="weather-page__header">
          <span className="weather-page__header__time">
            <WiTime8 size={32} />
          </span>
          <span className="weather-page__header__icon"></span>
          <span className="weather-page__header__temp">
            <WiThermometerExterior size={32} />
          </span>
          <span className="weather-page__header__precipitation">
            <WiUmbrella size={32} />
          </span>
          <span className="weather-page__header__wind">
            <WiTornado size={32} />
          </span>
        </div>
        <div className="weather-page__rows">
          {weather.map((element) => (
            <WeatherRow unit={props.unit} weather={element} key={Math.random()} />
          ))}
        </div>
        <div className="weather-page__footer">
          <span className="weather-page__footer__row">
            <WiSunrise size={24} />
            {sunrise}
          </span>
          <span className="weather-page__footer__row">
            <WiSunset size={24} />
            {sunset}
          </span>
        </div>
      </div>
    </div>
  );
}

export default WeatherPage;
