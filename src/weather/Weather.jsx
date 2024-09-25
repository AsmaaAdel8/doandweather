import WeatherHome from "./WeatherHome";
import DailyForcast from "./DailyForcast";
import getformatedweatherdata from "./WeatherServices";
import {
  Box,
  Stack,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import Skeleton from '@mui/material/Skeleton';

const Weather = () => {
  const them = useTheme();
  const [Query, setQuery] = useState({ q: "london" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const getWeather = async () => {
    await getformatedweatherdata({ ...Query, units }).then((data) => {
      setWeather(data);
    });
    // console.log(weather);
  };
  useEffect(() => {
    getWeather();
    document.title="Weather-app";
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Query, units]);

  
  return (
    <Stack bgcolor={them.palette.primary.contrastText} height={'100%'} color={them.palette.text.primary}>
      
      <Box width={"90%"} m={"auto"} mt={8}>
        {weather ? (
          <>
            <WeatherHome weather={weather} setQuery={setQuery} setUnits={setUnits}/>
            <DailyForcast title={"3 hour step Forcast"} data={weather.hourly} />
            <DailyForcast title={"daily Forcast"} data={weather.daily} />
          </>
        ) : (
          <Stack spacing={3}>
            {/* For variant="text", adjust the height via font-size */}
            <Skeleton variant="text" sx={{ fontSize: "6rem" }} />
            {/* For other variants, adjust the size with `width` and `height` */}
            <Skeleton variant="rectangular" width={'100%'} height={160} />
            <Skeleton variant="rounded" width={'100%'} height={160} />
          </Stack>
        )}
      </Box>
    </Stack>
  );
};

export default Weather;
