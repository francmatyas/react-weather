import "./WeatherTable.scss";
import { useState } from "react";

import WeatherPage from "./WeatherPage/WeatherPage";
import { Pagination } from "@mui/material";

function WeatherTable(props) {
  const weather = props.weather;
  const [page, setPage] = useState(1);

  return (
    <div id="weather-table">
      <WeatherPage
        weather={weather[page - 1]}
        unit={props.unit}
        location={props.location}
        twilight={props.twilights[page - 1]}
      />
      <Pagination
        count={weather.length}
        page={page}
        variant="outlined"
        color="primary"
        onChange={(event, value) => setPage(value)}
      />
    </div>
  );
}

export default WeatherTable;
