import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { useState, useEffect } from "react";
import { HashRouter as Router } from "react-router-dom";
import { Weather } from "./scripts/WeatherUtils";

import Content from "./components/Content/Content";
import Header from "./components/Header/Header";
import AppDesign from "./components/Design/AppDesign";

import summerImg from "./assets/svgs/summer.svg";
import winterImg from "./assets/svgs/winter.svg";
import rainImg from "./assets/svgs/rain.svg";
import hikingImg from "./assets/svgs/hiking.svg";

function App() {
  const [location, setLocation] = useState({});
  const [weatherDate, setWeatherDate] = useState([]);
  const [twilights, setTwilights] = useState([]);

  const [unit, setUnit] = useState("celsius");
  const [loader, setLoader] = useState(false);
  const [image, setImage] = useState(hikingImg);

  function searchSelectHandler(location) {
    setLocation(location);
  }

  // useEffect fetch and format weather data for selected location

  useEffect(() => {
    if (location.lat && location.lon) {
      setLoader(true);
      fetch(
        `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${location.lat}&lon=${location.lon}`,
        {
          method: "GET",
          headers: {
            Origin: "https://francmatyas.github.io",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          const weatherDate = Object.values(
            data.properties.timeseries.reduce((acc, element) => {
              const date = new Date(element.time);
              const dateKey =
                date.getDate() +
                "." +
                (date.getMonth() + 1) +
                "." +
                date.getFullYear();
              if (acc[dateKey]) {
                const weather = new Weather(element);
                acc[dateKey].push(weather);
              } else {
                const weather = new Weather(element);
                acc[dateKey] = [weather];
              }
              return acc;
            }, {})
          );
          weatherDate.pop();
          setWeatherDate(weatherDate);
          setLoader(false);
        });
    }
  }, [location]);

  // useEffect fetch sunrise and sunset time for selected location

  useEffect(() => {
    if (location.lat && location.lon && weatherDate.length !== 0) {
      setLoader(true);
      Promise.all(
        weatherDate.map(async (element) => {
          const date = element[0].time;

          const response = await fetch(
            `https://api.sunrisesunset.io/json?lat=${location.lat}&lng=${
              location.lon
            }&date=${date.split("T")[0]}`,
            {
              method: "GET",
            }
          );
          const data = await response.json();
          return [data.results.sunrise, data.results.sunset];
        })
      ).then((data) => {
        setLoader(false);
        setTwilights(data);
      });
    }
  }, [weatherDate, location]);

  // useEffect change image based on current temp and precipitation for selected location

  useEffect(() => {
    if (weatherDate.length !== 0) {
      const currentWeather = weatherDate[0][0];

      if (
        currentWeather.getPrecipitation() < 0.1 &&
        currentWeather.getTemperature() > 20
      ) {
        setImage(summerImg);
      } else if (
        currentWeather.getPrecipitation() < 0.1 &&
        currentWeather.getTemperature() < 5
      ) {
        setImage(winterImg);
      }
      if (currentWeather.getPrecipitation() > 0.1) {
        setImage(rainImg);
      }
    }
  }, [weatherDate]);

  return (
    <Router>
      <div className="App">
        <Header
          onSearchSelect={searchSelectHandler}
          unit={unit}
          onUnitChange={(data) => setUnit(data)}
          onLoading={(data) => setLoader(data)}
        />
        <Content
          weather={weatherDate}
          location={location}
          unit={unit}
          loader={loader}
          twilights={twilights}
        />
        <AppDesign image={image} />
      </div>
    </Router>
  );
}

export default App;
