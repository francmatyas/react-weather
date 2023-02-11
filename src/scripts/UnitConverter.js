export function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

export function getHourMins(time) {
  return time.getHours() + ":" + time.getMinutes();
}