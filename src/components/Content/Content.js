import "./Content.scss";

import { useEffect, useState } from "react";

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
  const weatherList = Object.values(weather);

  const currentWeather = weather && weatherList[0][0];

  return (
    <div className="content">
      <h1>Local weather</h1>

      <div className="weather">
        <div className="weather__day">
          <span className="weather__day__date">Today</span>
          <span className="weather__day__temp">
            {weather &&
              Math.round(currentWeather.data.instant.details.air_temperature)}
            °C
          </span>
        </div>
        {weatherList.map((element) => (
          <WeatherTable weather={element} key={Math.random()} />
        ))}
      </div>
    </div>
  );
}

export default Content;
