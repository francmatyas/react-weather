import "./App.css";

import { useState, useEffect } from "react";

import Content from "./components/Content/Content";

function App() {
  const [weather, setWeather] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);

  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      });
    } else {
      setStatus("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (lat && lon) {
      fetch(
        `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`,
        {
          headers: {
            "User-Agent": "demo-weather-app, github.com/francmatyas",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setWeather(data);
        });
    }
  }, [lat, lon]);

  useEffect(() => {
    if (lat && lon) {
      const datetime = new Date();
      const year = datetime.getFullYear();
      const month = datetime.getMonth() + 1;
      const day = datetime.getDate();
      const date = year + "-" + (month > 9 ? month : "0" + month) + "-" + day;
      const offsetNumeric = - (datetime.getTimezoneOffset() / 60);
      const offset =
        (offsetNumeric > 0 ? "+" : "-") +
        (Math.abs(offsetNumeric) > 9
          ? Math.abs(offsetNumeric)
          : "0" + Math.abs(offsetNumeric)) +
        ":00";

      fetch(
        `https://api.met.no/weatherapi/sunrise/2.0/.json?lat=${lat}&lon=${lon}&date=${date}&offset=${offset}`,
        {
          headers: {
            "User-Agent": "demo-weather-app, github.com/francmatyas",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setSunrise(data.location.time[0].sunrise.time);
          setSunset(data.location.time[0].sunset.time);
        });
    }
  }, [lat, lon]);

  function getWeatherByDate(date) {
    const weatherByDate =
      weather &&
      weather.properties.timeseries.filter((element) => {
        const elementDate = new Date(element.time);
        return (
          elementDate.getDate() === date.getDate() &&
          elementDate.getMonth() === date.getMonth() &&
          elementDate.getFullYear() === date.getFullYear()
        );
      });
    return weatherByDate;
  }

  const weatherByDate =
    weather &&
    weather.properties.timeseries.reduce((acc, element) => {
      const date = new Date(element.time);
      const dateKey =
        date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
      if (acc[dateKey]) {
        acc[dateKey].push(element);
      } else {
        acc[dateKey] = [element];
      }
      return acc;
    }, {});

  useEffect(() => {
    if (weather) {
      console.log(sunrise, sunset);
      console.log(getWeatherByDate(new Date("2023-01-20T00:00:00Z")));
      console.log(weatherByDate);
    }
  }, [weather, sunrise, sunset]);

  return (
    <div className="App">
      <Content weather={weather && weather.properties.timeseries}/>
      <p>{status}</p>
    </div>
  );
}

export default App;
