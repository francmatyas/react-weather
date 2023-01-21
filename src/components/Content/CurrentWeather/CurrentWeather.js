import "./CurrentWeather.scss";

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

import { TbTemperature, TbUmbrella } from "react-icons/tb";
import { FiSunrise, FiSunset } from "react-icons/fi";

function CurrentWeather(props) {
  const weather = props.weather;
  const sunriseDate = new Date(props.sunrise);
  const sunsetDate = new Date(props.sunset);
  const sunrise = sunriseDate.getHours() + ":" + sunriseDate.getMinutes();
  const sunset = sunsetDate.getHours() + ":" + sunsetDate.getMinutes();

  const temp = Math.round(weather.data.instant.details.air_temperature);
  const precipitation = weather.data.next_1_hours.details.precipitation_amount;

  if (!weather || !sunset || !sunrise) {
    return <div>Loading...</div>;
  }

  return (
    <div className="current-weather">
      <h2 className="current-weather__title">Current Weather</h2>
      <div className="current-weather__data">
        <div className="current-weather__data__header">
          <span>
            <TbTemperature size={32} />
          </span>
          <span>
            <TbUmbrella size={32} />
          </span>
          <span>
            {" "}
            <FiSunrise size={24} />
          </span>
          <span>
            {" "}
            <FiSunset size={24} />
          </span>
        </div>
        <div className="current-weather__data__row">
          <span className="current-weather__data__temp">{temp + " °C"}</span>
          <span className="current-weather__data__prec">
            {precipitation && precipitation + " mm"}
          </span>
          <span className="current-weather__data__sunrise">{sunrise}</span>
          <span className="current-weather__data__sunset">{sunset}</span>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
