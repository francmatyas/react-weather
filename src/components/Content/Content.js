import "./Content.scss";

import { Routes, Route } from "react-router-dom";

import CurrentWeather from "./CurrentWeather/CurrentWeather";
import WeatherTable from "./WeatherTable/WeatherTable";
import Tutorial from "./Tutorial/Tutorial";

import { Stack, Skeleton } from "@mui/material";

function Content(props) {
  const weather = props.weather;

  if (weather.length === 0) {
    return <Tutorial />;
  }

  if (props.loader || props.twilights.length === 0 || !props.location) {
    return (
      <div id="content">
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
            height={240}
          />
        </Stack>
      </div>
    );
  }

  return (
    <div id="content">
      <div id="weather">
        <Routes>
          <Route
            path="/react-weather"
            element={
              <CurrentWeather
                weather={weather[0][0].data}
                twilight={props.twilights[0]}
                location={props.location}
                unit={props.unit}
              />
            }
          />
          <Route
            path="/table"
            element={
              <WeatherTable
                weather={weather}
                unit={props.unit}
                location={props.location}
                twilights={props.twilights}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default Content;
