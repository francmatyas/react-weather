import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Content from "./components/Content/Content";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AppDesign from "./components/Design/AppDesign";

import summerImg from "./assets/svgs/summer.svg";
import winterImg from "./assets/svgs/winter.svg";
import rainImg from "./assets/svgs/rain.svg";
import hikingImg from "./assets/svgs/hiking.svg";

function App() {
  const [tab, setTab] = useState("forecast");
  const [unit, setUnit] = useState("celsius");

  const [loader, setLoader] = useState(false);
  const [location, setLocation] = useState({});
  const [weather, setWeather] = useState({});
  const [weatherDate, setWeatherDate] = useState([]);
  const [twilights, setTwilights] = useState([]);

  const [image, setImage] = useState(hikingImg);

  function searchSelectHandler(location) {
    setLocation(location);
  }

  // useEffect change image based on current temp and precipitation for selected location

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

  // useEffect fetch weather data for selected location

  useEffect(() => {
    if (location.lat && location.lon) {
      setLoader(true);
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
          setLoader(false);
        });
    }
  }, [location]);

  // useEffect format weather data for each day

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
  }, [weather, location]);

  // useEffect fetch sunrise and sunset time for selected location

  useEffect(() => {
    if (location.lat && location.lon && weatherDate.length !== 0) {
      setLoader(true);
      Promise.all(
        weatherDate.map((element) => {
          const date = element[0].time;

          return fetch(
            `https://api.sunrisesunset.io/json?lat=${location.lat}&lng=${
              location.lon
            }&date=${date.split("T")[0]}`,
            {
              headers: {
                "User-Agent": "demo-weather-app, github.com/francmatyas",
              },
            }
          )
            .then((response) => response.json())
            .then((data) => {
              return [data.results.sunrise, data.results.sunset];
            });
        })
      ).then((data) => {
        setLoader(false);
        setTwilights(data);
      });
    }
  }, [weatherDate, location]);

  return (
    <Router>
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
          loader={loader}
          twilights={twilights}
        />
        <AppDesign image={image} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
