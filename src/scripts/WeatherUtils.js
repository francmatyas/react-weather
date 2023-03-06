// Universal icons for weather
import {
  WiCloudy,
  WiFog,
  WiRainMix,
  WiRain,
  WiSleet,
  WiSnow,
  WiSprinkle,
  WiStormShowers,
  WiThunderstorm,
} from "react-icons/wi";

// Icons for day
import {
  WiDayCloudy,
  WiDayRainMix,
  WiDayShowers,
  WiDaySleetStorm,
  WiDaySnowThunderstorm,
  WiDaySnow,
  WiDaySprinkle,
  WiDayStormShowers,
  WiDaySunnyOvercast,
  WiDaySunny,
} from "react-icons/wi";

// Icons for night
import {
  WiNightAltCloudy,
  WiNightAltPartlyCloudy,
  WiNightAltRainMix,
  WiNightAltShowers,
  WiNightAltSleetStorm,
  WiNightAltSnowThunderstorm,
  WiNightAltSnow,
  WiNightAltSprinkle,
  WiNightAltStormShowers,
  WiNightClear,
} from "react-icons/wi";

import weatherLegend from "../assets/data/weatherLegend.json";

export class Weather {
  time;
  temperature;
  ceslsiusTemperature;
  fahrenheitTemperature;
  windSpeed;
  windDirection;
  humidity;
  precipitation;
  description;
  weatherCode;

  constructor(weather) {
    this.time = weather.time;
    const data = weather.data;

    this.temperature = data.instant.details.air_temperature;
    this.celsiusTemperature = this.#getCelsiusTemperature(data);
    this.fahrenheitTemperature = this.#getFahrenheitTemperature(data);
    this.windSpeed = data.instant.details.wind_speed;
    this.windDirection = data.instant.details.wind_from_direction;
    this.humidity = data.instant.details.relative_humidity;
    this.precipitation = this.#getPrecipitation(data);
    this.weatherCode = this.#getWeatherCode(data);
    this.description = this.#getDescription();
  }

  #toFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32;
  }
  #getFahrenheitTemperature() {
    return Math.round(this.#toFahrenheit(this.temperature)) + "°F";
  }
  #getCelsiusTemperature() {
    return Math.round(this.temperature) + "°C";
  }

  #getPrecipitation(weather) {
    if (weather.next_1_hours !== undefined) {
      return weather.next_1_hours.details.precipitation_amount;
    } else if (weather.next_3_hours !== undefined) {
      return weather.next_3_hours.details.precipitation_amount;
    } else if (weather.next_6_hours !== undefined) {
      return weather.next_6_hours.details.precipitation_amount;
    }
  }

  #getWeatherCode(weather) {
    if (weather.next_1_hours !== undefined) {
      return weather.next_1_hours.summary.symbol_code;
    } else if (weather.next_3_hours !== undefined) {
      return weather.next_3_hours.summary.symbol_code;
    } else if (weather.next_6_hours !== undefined) {
      return weather.next_6_hours.summary.symbol_code;
    } else {
      return "";
    }
  }

  #getDescription() {
    return weatherLegend[this.weatherCode.split("_")[0]]?.desc_en;
  }

  getIcon(size) {
    switch (this.weatherCode) {
      case "clearsky_night":
        return <WiNightClear size={size} />;

      case "clearsky_day":
        return <WiDaySunny size={size} />;

      case "cloudy":
        return <WiCloudy size={size} />;

      case "fair_night":
        return <WiNightAltPartlyCloudy size={size} />;

      case "fair_day":
        return <WiDaySunnyOvercast size={size} />;

      case "fog":
        return <WiFog size={size} />;

      case "heavyrain":
        return <WiRain size={size} />;

      case "heavyrainandthunder":
        return <WiThunderstorm size={size} />;

      case "heavyrainshowers_night":
        return <WiNightAltShowers size={size} />;

      case "heavyrainshowers_day":
        return <WiDayShowers size={size} />;

      case "heavyrainshowersandthunder_night":
        return <WiNightAltStormShowers size={size} />;

      case "heavyrainshowersandthunder_day":
        return <WiDayStormShowers size={size} />;

      case "heavysleet":
        return <WiSleet size={size} />;

      case "heavysleetandthunder":
        return <WiThunderstorm size={size} />;

      case "heavysleetshowers_night":
        return <WiNightAltRainMix size={size} />;

      case "heavysleetshowers_day":
        return <WiDayRainMix size={size} />;

      case "heavysleetshowersandthunder_night":
        return <WiNightAltSleetStorm size={size} />;

      case "heavysleetshowersandthunder_day":
        return <WiDaySleetStorm size={size} />;

      case "heavysnow":
        return <WiSnow size={size} />;

      case "heavysnowandthunder":
        return <WiThunderstorm size={size} />;

      case "heavysnowshowers_night":
        return <WiNightAltSnow size={size} />;

      case "heavysnowshowers_day":
        return <WiDaySnow size={size} />;

      case "heavysnowshowersandthunder_night":
        return <WiNightAltSnowThunderstorm size={size} />;

      case "heavysnowshowersandthunder_day":
        return <WiDaySnowThunderstorm size={size} />;

      case "lightrain":
        return <WiSprinkle size={size} />;

      case "lightrainandthunder":
        return <WiStormShowers size={size} />;

      case "lightrainshowers_night":
        return <WiNightAltSprinkle size={size} />;

      case "lightrainshowers_day":
        return <WiDaySprinkle size={size} />;

      case "lightrainshowersandthunder_night":
        return <WiNightAltStormShowers size={size} />;

      case "lightrainshowersandthunder_day":
        return <WiDayStormShowers size={size} />;

      case "lightsleet":
        return <WiRainMix size={size} />;

      case "lightsleetandthunder":
        return <WiThunderstorm size={size} />;

      case "lightsleetshowers_night":
        return <WiNightAltRainMix size={size} />;

      case "lightsleetshowers_day":
        return <WiDayRainMix size={size} />;

      case "lightsleetshowersandthunder_night":
        return <WiNightAltSleetStorm size={size} />;

      case "lightsleetshowersandthunder_day":
        return <WiDaySleetStorm size={size} />;

      case "lightsnow":
        return <WiSnow size={size} />;

      case "lightsnowandthunder":
        return <WiThunderstorm size={size} />;

      case "lightsnowshowers_night":
        return <WiNightAltSnow size={size} />;

      case "lightsnowshowers_day":
        return <WiDaySnow size={size} />;

      case "lightsnowshowersandthunder_night":
        return <WiNightAltSnowThunderstorm size={size} />;

      case "lightsnowshowersandthunder_day":
        return <WiDaySnowThunderstorm size={size} />;

      case "partlycloudy_night":
        return <WiNightAltCloudy size={size} />;

      case "partlycloudy_day":
        return <WiDayCloudy size={size} />;

      case "rain":
        return <WiRain size={size} />;

      case "rainandthunder":
        return <WiThunderstorm size={size} />;

      case "rainshowers_night":
        return <WiNightAltShowers size={size} />;

      case "rainshowers_day":
        return <WiDayShowers size={size} />;

      case "rainshowersandthunder_night":
        return <WiNightAltStormShowers size={size} />;

      case "rainshowersandthunder_day":
        return <WiDayStormShowers size={size} />;

      case "sleet":
        return <WiSleet size={size} />;

      case "sleetandthunder":
        return <WiThunderstorm size={size} />;

      case "sleetshowers_night":
        return <WiNightAltRainMix size={size} />;

      case "sleetshowers_day":
        return <WiDayRainMix size={size} />;

      case "sleetshowersandthunder_night":
        return <WiNightAltSleetStorm size={size} />;

      case "sleetshowersandthunder_day":
        return <WiDaySleetStorm size={size} />;

      case "snow":
        return <WiSnow size={size} />;

      case "snowandthunder":
        return <WiThunderstorm size={size} />;

      case "snowshowers_night":
        return <WiNightAltSnow size={size} />;

      case "snowshowers_day":
        return <WiDaySnow size={size} />;

      case "snowshowersandthunder_night":
        return <WiNightAltSnowThunderstorm size={size} />;

      case "snowshowersandthunder_day":
        return <WiDaySnowThunderstorm size={size} />;

      default:
        return <WiDaySunny size={size} />;
    }
  }
}

export function correctHour(hour) {
  if (hour < 10) {
    return "0" + hour;
  }
  return hour;
}

export function formatDateGap(weather) {
  if (weather.length !== 0) {
    if (weather.length === 1) {
      weather[0]["hour"] = correctHour(new Date(weather[0].time).getHours());
    }

    for (let i = 0; i < weather.length - 1; i++) {
      const time = new Date(weather[i].time).getHours();
      const nextTime = new Date(weather[i + 1].time).getHours();
      if (time === nextTime - 1) {
        weather[i]["hour"] = correctHour(time);
      } else {
        weather[i]["hour"] = correctHour(time) + " - " + correctHour(nextTime);
      }

      if (i === weather.length - 2) {
        if (time === nextTime - 1) {
          weather[i + 1]["hour"] = correctHour(nextTime);
        } else {
          weather[i + 1]["hour"] =
            correctHour(nextTime) + " - " + correctHour((nextTime + 6) % 24);
        }
      }
    }
  }
}
