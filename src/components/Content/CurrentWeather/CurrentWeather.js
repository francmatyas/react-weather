import "./CurrentWeather.scss";
import { toFahrenheit } from "../../../scripts/UnitConverter";

import {
  WiCloudy,
  WiCloudyGusts,
  WiCloudyWindy,
  WiDayCloudyGusts,
  WiDayCloudyHigh,
  WiDayCloudyWindy,
  WiDayCloudy,
  WiDayFog,
  WiDayHail,
  WiDayHaze,
  WiDayLightWind,
  WiDayLightning,
  WiDayRainMix,
  WiDayRainWind,
  WiDayRain,
  WiDayShowers,
  WiDaySleetStorm,
  WiDaySleet,
  WiDaySnowThunderstorm,
  WiDaySnowWind,
  WiDaySnow,
  WiDaySprinkle,
  WiDayStormShowers,
  WiDaySunnyOvercast,
  WiDaySunny,
  WiDayThunderstorm,
  WiDayWindy,
} from "react-icons/wi";

import { TbTemperature, TbUmbrella } from "react-icons/tb";
import { FiSunrise, FiSunset } from "react-icons/fi";

function CurrentWeather(props) {
  const weather = props.weather;
  const sunriseDate = new Date(props.sunrise);
  const sunsetDate = new Date(props.sunset);
  const sunrise = sunriseDate.getHours() + ":" + sunriseDate.getMinutes();
  const sunset = sunsetDate.getHours() + ":" + sunsetDate.getMinutes();

  const temp = weather.data.instant.details.air_temperature;
  const tempCelsius = Math.round(temp);
  const tempFahrenheit = Math.round(toFahrenheit(temp));

  const precipitation = weather.data.next_1_hours.details.precipitation_amount;

  if (!weather || !sunset || !sunrise) {
    return <div>Loading...</div>;
  }

  return (
    <div className="current-weather">
      <div className="current-weather__header">
        <span>{props.location.display_name}</span>
      </div>

      <div className="current-weather__container">
        <div className="current-weather__icon">
          <WiDayCloudy size={128} />
        </div>

        <div className="current-weather__data">
          <div className="current-weather__data__col">
            <span className="current-weather__data">
              <TbTemperature size={32} />
              {props.unit === "celsius"
                ? tempCelsius + " °C"
                : tempFahrenheit + " °F"}
            </span>
            <span className="current-weather__data">
              <TbUmbrella size={32} />
              {precipitation + " mm"}
            </span>
          </div>
        </div>
      </div>

      <div className="current-weather__sunrise">
        <span className="current-weather__data">
          <FiSunrise size={24} />
          {sunrise}
        </span>
        <span className="current-weather__data">
          <FiSunset size={24} />
          {sunset}
        </span>
      </div>
    </div>
  );
}

export default CurrentWeather;
