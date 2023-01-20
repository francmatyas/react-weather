import "./WeatherRow.scss";

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

function WeatherRow(props) {
  const weather = props.weather;

  const time = weather.hour;
  const temperature = Math.round(weather.data.instant.details.air_temperature);
  const precipitation = getPrecipitation();
  const windSpeed = Math.round(weather.data.instant.details.wind_speed);

  function getPrecipitation() {
    if (weather.data.next_1_hours !== undefined) {
      return weather.data.next_1_hours.details.precipitation_amount;
    } else if (weather.data.next_3_hours !== undefined) {
      return weather.data.next_3_hours.details.precipitation_amount;
    } else if (weather.data.next_6_hours !== undefined) {
      return weather.data.next_6_hours.details.precipitation_amount;
    }
  }

  return (
    <div className="weather-row">
      <span className="weather-row__time">{time}</span>
      <span className="weather-row__temp">{temperature} °C</span>
      <span className="weather-row__precipitation">
        {precipitation !== 0 && precipitation ? precipitation + " mm" : ""}
      </span>
      <span className="weather-row__wind">{windSpeed} m/s</span>
    </div>
  );
}

export default WeatherRow;
