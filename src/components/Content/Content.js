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

import WeatherTable from "../WeatherTable/WeatherTable";

function Content(props) {
  const weather = props.weather;

  return (
    <div className="content">
      <h1>Local weather</h1>

      <div className="weather">
        <div className="weather__day">
          <span className="weather__day__date">Today</span>
          <span className="weather__day__temp">
            {weather.length > 0 &&
              Math.round(weather[0][0].data.instant.details.air_temperature)}
            °C
          </span>
        </div>
        {weather.map((element) => (
          <WeatherTable weather={element} key={Math.random()} />
        ))}
      </div>
    </div>
  );
}

export default Content;
