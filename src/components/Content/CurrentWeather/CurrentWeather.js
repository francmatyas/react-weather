import "./CurrentWeather.scss";
import {
  toFahrenheit,
  getWeatherIcon,
} from "../../../scripts/WeatherUtils";

import {
  WiSunrise,
  WiSunset,
  WiHumidity,
  WiThermometerExterior,
  WiUmbrella,
  WiTornado,
} from "react-icons/wi";
import { HiOutlineArrowNarrowDown } from "react-icons/hi";
import weatherLegend from "../../../assets/data/weatherLegend.json";

function CurrentWeather(props) {
  const weather = props.weather;
  const location = props.location.getLocationName();
  const [sunrise, sunset] = props.twilight;

  const weatherCode = weather.next_1_hours.summary.symbol_code;
  const weatherDescription = weatherLegend[weatherCode.split("_")[0]]?.desc_en;

  const temp = weather.instant.details.air_temperature;
  const tempCelsius = Math.round(temp) + "°C";
  const tempFahrenheit = Math.round(toFahrenheit(temp)) + "°F";

  const precipitation = weather.next_1_hours.details.precipitation_amount;

  const windSpeed = weather.instant.details.wind_speed;
  const windDirection = weather.instant.details.wind_from_direction;

  const humidity = weather.instant.details.relative_humidity;

  return (
    <div id="current-weather">
      <div id="current-weather__header">
        <span>{location}</span>
      </div>

      <div id="current-weather__container">
        <div className="current-weather__data__col">
          <span id="current-weather__description">
            {weatherDescription}
          </span>
          <span id="current-weather__icon">
            {getWeatherIcon(weatherCode, 128)}
          </span>
        </div>

        <div className="current-weather__data__col">
          <span className="current-weather__data">
            <WiThermometerExterior size={32} />
            <span style={{ color: temp > 0 ? "#f44336" : "#03a9f4" }}>
              {props.unit === "celsius" ? tempCelsius : tempFahrenheit}
            </span>
          </span>

          <span className="current-weather__data">
            <WiUmbrella size={32} />
            {precipitation + " mm"}
          </span>

          <span className="current-weather__data">
            <WiTornado size={32} />
            {windSpeed + " m/s"}
            <HiOutlineArrowNarrowDown
              size={24}
              style={{ transform: `rotate(${windDirection}deg)` }}
            />
          </span>

          <span className="current-weather__data">
            <WiHumidity size={32} />
            {humidity + "%"}
          </span>
        </div>
      </div>

      <div id="current-weather__footer">
        <span className="current-weather__row">
          <WiSunrise size={24} />
          {sunrise}
        </span>
        <span className="current-weather__row">
          <WiSunset size={24} />
          {sunset}
        </span>
      </div>
    </div>
  );
}

export default CurrentWeather;
