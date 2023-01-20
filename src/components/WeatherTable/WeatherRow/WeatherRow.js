import "./WeatherRow.scss";

function WeatherRow(props) {
  const weather = props.weather;

  const time = weather.hour;
  const temperature = Math.round(weather.data.instant.details.air_temperature);
  const precipitation =
    weather.data.next_1_hours !== undefined &&
    Math.round(weather.data.next_1_hours.details.precipitation_amount);
  const windSpeed = Math.round(weather.data.instant.details.wind_speed);

  return (
    <div className="weather-row">
      <span className="weather-row__time">{time}</span>
      <span className="weather-row__temp">{temperature} °C</span>
      <span className="weather-row__precipitation">{precipitation} mm</span>
      <span className="weather-row__wind">{windSpeed} m/s</span>
    </div>
  );
}

export default WeatherRow;