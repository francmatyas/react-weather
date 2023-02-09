import "./Content.scss";

import CurrentWeather from "./CurrentWeather/CurrentWeather";
import WeatherTable from "./WeatherTable/WeatherTable";
import { Stack, Skeleton } from "@mui/material";

function Content(props) {
  const weather = props.weather;

  if (weather.length === 0) {
    return (
      <div className="content">
        <Stack spacing={1}>
          <Skeleton
            animation="wave"
            variant="rounded"
            width={512}
            height={60}
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            width={512}
            height={200}
          />
        </Stack>
      </div>
    );
  }

  return (
    <div className="content">
      <div className="weather">
        {props.tab === "forecast" ? (
          <CurrentWeather weather={weather[0][0]} location={props.location} unit={props.unit}/>
        ) : (
          <div className="weather__table">
            {weather.map((element) => (
              <WeatherTable weather={element} key={Math.random()} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Content;
