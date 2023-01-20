import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";

import { useState, useEffect } from "react";

import Content from "./components/Content/Content";

function App() {
  const [loader, setLoader] = useState(false);
  const [weather, setWeather] = useState({});
  const [weatherDate, setWeatherDate] = useState([]);

  const [sunrise, setSunrise] = useState({});
  const [sunset, setSunset] = useState({});

  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [status, setStatus] = useState("");

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
    setLoader(true);
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
          setLoader(false);
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
      const offsetNumeric = -(datetime.getTimezoneOffset() / 60);
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

  /* function getWeatherByDate(date) {
    const weatherByDate =
      Object.getOwnPropertyNames(weather).length != 0 &&
      weather.properties.timeseries.filter((element) => {
        const elementDate = new Date(element.time);
        return (
          elementDate.getDate() === date.getDate() &&
          elementDate.getMonth() === date.getMonth() &&
          elementDate.getFullYear() === date.getFullYear()
        );
      });
    return weatherByDate;
  } */

  useEffect(() => {
    if (Object.getOwnPropertyNames(weather).length !== 0) {
      const weatherDate = weather.properties.timeseries.reduce(
        (acc, element) => {
          const date = new Date(element.time);
          const dateKey =
            date.getDate() +
            "." +
            (date.getMonth() + 1) +
            "." +
            date.getFullYear();
          if (acc[dateKey]) {
            acc[dateKey].push(element);
          } else {
            acc[dateKey] = [element];
          }
          return acc;
        },
        {}
      );
      setWeatherDate(Object.values(weatherDate));
    }
  }, [weather]);

  if (loader) {
    return (
      <div className="App__loader">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  } else if (status) {
    return (
      <div className="App__loader">
        <p>{status}</p>
      </div>
    );
  }

  return (
    <div className="App">
      <Content weather={weatherDate} />
    </div>
  );
}

export default App;
