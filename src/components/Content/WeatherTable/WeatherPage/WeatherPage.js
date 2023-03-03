import "./WeatherPage.scss";
import { formatDateGap } from "../../../../scripts/WeatherUtils";

import {
  WiSunrise,
  WiSunset,
  WiThermometerExterior,
  WiUmbrella,
  WiTornado,
  WiTime8,
} from "react-icons/wi";

import WeatherRow from "../WeatherRow/WeatherRow";

function WeatherPage(props) {
  const weather = props.weather;
  const location = props.location.getLocationName();
  const [sunrise, sunset] = props.twilight;

  const date = new Date(weather[0].time);
  const day = date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  formatDateGap(weather);

  return (
    <div id="weather-page">
      <div id="weather-page__header">
        <p id="weather-page__location">{location}</p>
      </div>

      <div id="weather-page__table">
        <div id="weather-page__table__header">
          <p id="weather-page__header__time">
            <WiTime8 size={32} />
          </p>
          <p id="weather-page__header__icon">
            {/* Filler span for grid */}
          </p>
          <p id="weather-page__header__temp">
            <WiThermometerExterior size={32} />
          </p>
          <p id="weather-page__header__precipitation">
            <WiUmbrella size={32} />
          </p>
          <p id="weather-page__header__wind">
            <WiTornado size={32} />
          </p>
        </div>

        <div className="weather-page__rows">
          {weather.map((element) => (
            <WeatherRow
              unit={props.unit}
              weather={element}
              key={Math.random()}
            />
          ))}
        </div>

        <div id="weather-page__table__footer">
          <p className="weather-page__footer__row">
            <WiSunrise size={24} />
            {sunrise}
          </p>
          <p className="weather-page__footer__row">
            <WiSunset size={24} />
            {sunset}
          </p>
        </div>
      </div>

      <div id="weather-page__footer">
        <p id="weather-page__date">{day}</p>
      </div>
    </div>
  );
}

export default WeatherPage;
