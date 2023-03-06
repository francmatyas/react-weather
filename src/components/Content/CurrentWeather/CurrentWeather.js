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
  const {
    weather,
    weather: {
      temperature,
      celsiusTemperature,
      fahrenheitTemperature,
      windSpeed,
      windDirection,
      humidity,
      precipitation,
      description,
    },
    location,
    twilight: [sunrise, sunset],
    unit,
  } = props;

  return (
    <section id="current-weather">
      <div id="current-weather__header">
        <p>{location.display_name}</p>
      </div>

      <div id="current-weather__container">
        <div className="current-weather__data__col">
          <p id="current-weather__description">{description}</p>
          <span id="current-weather__icon">{weather.getIcon(128)}</span>
        </div>

        <div className="current-weather__data__col">
          <p className="current-weather__data">
            <WiThermometerExterior size={32} />
            <span
              style={{
                color: Math.round(temperature) > 0 ? "#f44336" : "#03a9f4",
              }}
            >
              {unit === "celsius" ? celsiusTemperature : fahrenheitTemperature}
            </span>
          </p>

          <p className="current-weather__data">
            <WiUmbrella size={32} />
            {precipitation + " mm"}
          </p>

          <p className="current-weather__data">
            <WiTornado size={32} />
            {windSpeed + " m/s"}
            <HiOutlineArrowNarrowDown
              size={24}
              style={{ transform: `rotate(${windDirection}deg)` }}
            />
          </p>

          <p className="current-weather__data">
            <WiHumidity size={32} />
            {humidity + "%"}
          </p>
        </div>
      </div>

      <div id="current-weather__footer">
        <p className="current-weather__row">
          <WiSunrise size={24} />
          {sunrise}
        </p>
        <p className="current-weather__row">
          <WiSunset size={24} />
          {sunset}
        </p>
      </div>
    </section>
  );
}

export default CurrentWeather;
