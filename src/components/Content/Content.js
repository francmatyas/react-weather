import "./Content.scss";

import {
  TiWeatherSunny,
  TiWeatherPartlySunny,
  TiWeatherCloudy,
  TiWeatherShower,
  TiWeatherDownpour,
  TiWeatherStormy,
  TiWeatherWindyCloudy,
  TiWeatherSnow,
  TiWeatherNight,
} from "react-icons/ti";

function Content(props) {
  const weather = props.weather;

  return (
    <div className="content">
      <h1>Local weather</h1>

      <div className="weather">
        <div className="weather__day">
          <span className="weather__day__date">Today</span>
          <span className="weather__day__temp">
            {weather &&
              Math.round(weather[1].data.instant.details.air_temperature)}{" "}
            °C
          </span>
        </div>
      </div>
    </div>
  );
}

export default Content;
