import { DateTime } from "luxon";
const Base_url = "https://api.openweathermap.org/data/2.5/";
const Api_key = "cff747ec53d3388d58b2c1be2b9399ae";
const getWeatherData = (infoType, searchparams) => {
  const url = new URL(Base_url + infoType);
  const params = new URLSearchParams(searchparams);
  params.append("appid", Api_key);
  url.search = params.toString();
  return fetch(url).then((res) => res.json());
};
const iconfromdata = (icon) => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};
// this function to formate eppocke time that came from api
const formatToLocalTime = (
  secs,
  offset,
  format = "cccc,dd LLL yyyy ' | Local Time : 'hh:mm a"
) => {
 return DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);
};
const formatForcastWeather = (secs, offset, data) => {
  const hourly = data
    .filter((f) => f.dt > secs)
    .slice(0, 5)
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "hh:mm a"),
      icon: iconfromdata(f.weather[0].icon),
      date: f.dt_txt,
    }));
  // console.log(secs);
  const daily =
    data.filter((f) => f.dt_txt.endsWith("00:00:00")).slice(-8).map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "ccc"),
      icon: iconfromdata(f.weather[0].icon),
      date: f.dt_txt,
    }));
  return { hourly, daily };
};
// destracting api data to use it easer
const formatData = (data) => {
  const {
    coord: { lat, lon },
    name,
    dt,
    main: { temp, feels_like, humidity, pressure, temp_max, temp_min },
    timezone,
    wind: { speed },
    sys: { country, sunrise, sunset },
    weather,
  } = data;
  const { main: details, icon } = weather[0];
  const formattedLocaltime = formatToLocalTime(dt, timezone);
  return {
    lat,
    lon,
    name,
    dt,
    country,
    timezone,
    speed,
    details,
    humidity,
    pressure,
    temp,
    feels_like,
    temp_max,
    temp_min,
    icon: iconfromdata(icon),
    sunrise: formatToLocalTime(sunrise, timezone, "hh:mm a"),
    sunset: formatToLocalTime(sunset, timezone, "hh:mm a"),
    formattedLocaltime,
  };
};
const getformatedweatherdata = async (searchparams) => {
  const formatedcurrentweather = await getWeatherData(
    "weather",
    searchparams
  ).then(formatData);
  const { lat, lon, dt, timezone } = formatedcurrentweather;
  const formattedforcastweather = await getWeatherData("forecast", {
    lat,
    lon,
    units: searchparams.units,
  }).then((data) => formatForcastWeather(dt, timezone, data.list));
  return { ...formatedcurrentweather, ...formattedforcastweather };
};
export default getformatedweatherdata;
