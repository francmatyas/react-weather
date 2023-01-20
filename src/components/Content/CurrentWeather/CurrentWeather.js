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

function CurrentWeather(props) {
  const weather = props.weather;
  const sunriseDate = new Date(props.sunrise);
  const sunsetDate = new Date(props.sunset);
  const sunrise = sunriseDate.getHours() + ":" + sunriseDate.getMinutes();
  const sunset = sunsetDate.getHours() + ":" + sunsetDate.getMinutes();

  console.log((sunsetDate - sunriseDate) / 1000 / 60);
  console.log(24 * 60);

  if (!weather || !sunset || !sunrise) {
    return <div>Loading...</div>;
  }

  return (
    <div className="current-weather">
      <div className="current-weather__graph">
        <h2 className="current-weather__title">Current Weather</h2>
        <div className="current-weather__day">
         {/*  <div class="semi-circle"></div> */}
          <span className="current-weather__day__date">Today</span>
          <span className="current-weather__day__temp">
            {Math.round(weather.data.instant.details.air_temperature)}
            °C
          </span>
          <span>{sunrise}</span>
          <span>{sunset}</span>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
