import "./Content.scss";

import { Routes, Route } from "react-router-dom";

import CurrentWeather from "./CurrentWeather/CurrentWeather";
import WeatherTable from "./WeatherTable/WeatherTable";
import Tutorial from "./Tutorial/Tutorial";
import Footer from "../Footer/Footer";

import { Stack, Skeleton } from "@mui/material";

function Content(props) {
  const weather = props.weather;

  if (weather.length === 0) {
    return (
      <main id="content">
        <Tutorial />
        <Footer />
      </main>
    );
  }

  if (props.loader || props.twilights.length === 0 || !props.location) {
    return (
      <main id="content">
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
        <Footer />
      </main>
    );
  }

  return (
    <main id="content">
      <div id="weather">
        <Routes>
          <Route
            path="/"
            element={
              <CurrentWeather
                weather={weather[0][0]}
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
      <Footer />
    </main>
  );
}

export default Content;
