import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { useState, useEffect } from "react";

import Content from "./components/Content/Content";
import Header from "./components/Header/Header";

import lineImg from "./assets/svgs/line.svg";
import summerImg from "./assets/svgs/summer.svg";
import winterImg from "./assets/svgs/winter.svg";
import rainImg from "./assets/svgs/rain.svg";
import hikingImg from "./assets/svgs/hiking.svg";

function App() {
  const [tab, setTab] = useState("forecast");
  const [unit, setUnit] = useState("celsius");

  const [location, setLocation] = useState({});
  const [weather, setWeather] = useState({});
  const [weatherDate, setWeatherDate] = useState([]);

  const [image, setImage] = useState(hikingImg);

  function searchSelectHandler(location) {
    setLocation(location);
  }

  useEffect(() => {
    if (weatherDate.length !== 0) {
      const weather = weatherDate[0][0];
      const temp = weather.data.instant.details.air_temperature;
      const precipitation =
        weather.data.next_1_hours.details.precipitation_amount;

      if (precipitation < 0.1 && temp > 20) {
        setImage(summerImg);
      } else if (precipitation < 0.1 && temp < 5) {
        setImage(winterImg);
      }
      if (precipitation > 0.1) {
        setImage(rainImg);
      }
    }
  }, [weatherDate]);

  /*   useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      });
    } else {
      setStatus("Geolocation is not supported by this browser.");
    }
  }, []); */

  useEffect(() => {
    if (location.lat && location.lon) {
      fetch(
        `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${location.lat}&lon=${location.lon}`,
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
  }, [location]);

  /* useEffect(() => {
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
  }, [lat, lon]); */

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

  return (
    <div className="App">
      <Header
        onSearchSelect={searchSelectHandler}
        tab={tab}
        unit={unit}
        onTabChange={(data) => setTab(data)}
        onUnitChange={(data) => setUnit(data)}
      />
      <Content
        weather={weatherDate}
        tab={tab}
        location={location}
        unit={unit}
      />
      <h3 className="App__demo">DEMO Weather App</h3>
      <img className="App__line" src={lineImg} />
      <img className="App__img" src={image} />
    </div>
  );
}

export default App;
