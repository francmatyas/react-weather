import "./Content.scss";

import CurrentWeather from "./CurrentWeather/CurrentWeather";
import WeatherTable from "./WeatherTable/WeatherTable";

function Content(props) {
  const weather = props.weather;

  if (weather.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content">
      <div className="weather">
        <div className="weather__day">
          {/* <CurrentWeather
            weather={weather[0][0]}
            sunrise={props.sunrise}
            sunset={props.sunset}
          /> */}
        </div>
        {weather.map((element) => (
          <WeatherTable weather={element} key={Math.random()} />
        ))}
      </div>
    </div>
  );
}

export default Content;
