import "./CurrentWeather.scss";

import {
  WiSunrise,
  WiSunset,
  WiHumidity,
  WiThermometerExterior,
  WiUmbrella,
  WiTornado,
} from "react-icons/wi";
import { HiOutlineArrowNarrowDown } from "react-icons/hi";

function CurrentWeather(props) {
  const weather = props.weather;
  const location = props.location.getLocationName();
  const [sunrise, sunset] = props.twilight;
  return (
    <div id="current-weather">
      <div id="current-weather__header">
        <span>{location}</span>
      </div>

      <div id="current-weather__container">
        <div className="current-weather__data__col">
          <span id="current-weather__description">
            {weather.getDescription()}
          </span>
          <span id="current-weather__icon">{weather.getIcon(128)}</span>
        </div>

        <div className="current-weather__data__col">
          <span className="current-weather__data">
            <WiThermometerExterior size={32} />
            <span
              style={{
                color:
                  Math.round(weather.getTemperature()) > 0
                    ? "#f44336"
                    : "#03a9f4",
              }}
            >
              {props.unit === "celsius"
                ? weather.getCelsiusTemperature()
                : weather.getFahrenheitTemperature()}
            </span>
          </span>

          <span className="current-weather__data">
            <WiUmbrella size={32} />
            {weather.getPrecipitation() + " mm"}
          </span>

          <span className="current-weather__data">
            <WiTornado size={32} />
            {weather.getWindSpeed() + " m/s"}
            <HiOutlineArrowNarrowDown
              size={24}
              style={{ transform: `rotate(${weather.getWindDirection()}deg)` }}
            />
          </span>

          <span className="current-weather__data">
            <WiHumidity size={32} />
            {weather.getHumidity() + "%"}
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
