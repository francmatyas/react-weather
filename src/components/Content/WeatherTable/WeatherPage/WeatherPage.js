import "./WeatherPage.scss";
import {
  formatDateGap,
  getLocationName,
} from "../../../../scripts/WeatherUtils";

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
  const location = getLocationName(props.location);
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
        <span id="weather-page__location">{location}</span>
      </div>

      <div id="weather-page__table">
        <div id="weather-page__table__header">
          <span id="weather-page__header__time">
            <WiTime8 size={32} />
          </span>
          <span id="weather-page__header__icon">
            {/* Filler span for grid */}
          </span>
          <span id="weather-page__header__temp">
            <WiThermometerExterior size={32} />
          </span>
          <span id="weather-page__header__precipitation">
            <WiUmbrella size={32} />
          </span>
          <span id="weather-page__header__wind">
            <WiTornado size={32} />
          </span>
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
          <span className="weather-page__footer__row">
            <WiSunrise size={24} />
            {sunrise}
          </span>
          <span className="weather-page__footer__row">
            <WiSunset size={24} />
            {sunset}
          </span>
        </div>
      </div>

      <div id="weather-page__footer">
        <span id="weather-page__date">{day}</span>
      </div>
    </div>
  );
}

export default WeatherPage;
