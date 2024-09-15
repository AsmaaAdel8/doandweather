import { CiSearch, CiTempHigh } from "react-icons/ci";
import { FaCircleHalfStroke } from "react-icons/fa6";
import { FaWind, FaMapMarkerAlt } from "react-icons/fa";
import { GiSunRadiations } from "react-icons/gi";
import { TbSunset2, TbEmphasis } from "react-icons/tb";
import { useState } from "react";
import {useTheme} from "@mui/material";

export default function WeatherHome({weather:{
  speed,
  details,
  humidity,
  temp,
  feels_like,
  temp_max,
  temp_min,
  sunrise,sunset,icon,name,country,formattedLocaltime
},setQuery,setUnits}) {
  const[city,setCity]=useState('');
  const theme = useTheme();
  const InputBg=theme.palette.background.default
  const handlesearch=()=>{
    if(city !==""){setQuery({q:city})}
  }
  const handleLocation=()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        const{latitude,longitude}=position.coords;
        setQuery({lat:latitude,lon:longitude})
      })
    }
  }
  const countery = [
    {
      id: 1,
      name: "london",
    },
    {
      id: 2,
      name: "India",
    },
    {
      id: 3,
      name: "Cairo",
    },
    {
      id: 4,
      name: "Gaza",
    },
  ];
  const weatherForc = [
    {
      id: 1,
      Icon: <CiTempHigh />,
      title: "Feals_Like",
      value:`${feels_like.toFixed()} °C`,
    },
    {
      id: 2,
      Icon: <FaCircleHalfStroke />,
      title: "Hiumadity",
      value:`${humidity.toFixed()}%`,
    },
    {
      id: 3,
      Icon: <FaWind />,
      title: "Wind Speed",
      value:`${speed.toFixed()} km/h`,
    },
  ];
  const weatherBar = [
    {
      id: 1,
      Icon: <CiTempHigh />,
      title: "Max-Temp",
      time:`${temp_max.toFixed()} °C`
    },
    {
      id: 2,
      Icon: <TbEmphasis />,
      title: "min-Temp",
      time:`${temp_min.toFixed()} °C`
    },
    {
      id: 3,
      Icon: <GiSunRadiations />,
      title: "SunRise",
      time:`${sunrise}`
    },
    {
      id: 4,
      Icon: <TbSunset2 />,
      title: "SunSet",
      time:`${sunset}`
    },
  ];
  return (
    <div className="m-auto">
      <div className="flex flex-row justify-center items-center ml-20 my-5">
        {countery.map((count) => {
          return (
            <button key={count.id} className="flex-1"
            onClick={()=>{setQuery({q:count.name})}}
            >
              {count.name}
            </button>
          );
        })}
      </div>
      <div className="flex flex-row justify-center items-center mt-2">
        <input
          type="text"
          value={city}
          onChange={(e)=>{setCity(e.currentTarget.value)}}
          placeholder="Search by city"
          className="m-auto py-1 my-2 text-center rounded-lg w-96"
          style={{backgroundColor:InputBg , border:"0.2px black solid"}}
        />
        <CiSearch onClick={handlesearch} size={35}/>
        <FaMapMarkerAlt className="mx-3"onClick={handleLocation} size={35}/>
        <div className=" flex flex-row">
          <p onClick={()=>{setUnits('metric')}} className="mx-2" style={{cursor:'pointer',fontSize:"20px",fontWeight:"bold"}}> °C </p>
          <p>|</p>
          <p className="mx-2" onClick={()=>{setUnits('imperial')}} style={{cursor:'pointer',fontSize:"20px",fontWeight:"bold"}}> °F </p>
        </div>
      </div>
      <h2 className="text-center">
        {/* Tusday,14 may 2024 || Local Time : 07:23 pm */}
        {formattedLocaltime}
      </h2>
       <h2 className="text-center mt-3 from-neutral-900">{`${name} , ${country}`}</h2>
       <h2 className="text-center font-medium">{`${details}`}</h2>
      <div className="flex flex-row justify-between items-center">
        <img src={icon} alt='weather-icon'/>
        <h1 className="main_temp">{`${temp.toFixed()}%`}</h1>
        <div className="flex flex-col">
          {weatherForc.map((x) => {
            return (
              <div
                key={x.id}
                className="flex flex-row justify-center items-center"
              >
                {x.Icon}
                <p>{x.title} | </p>
                <p> {x.value}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-row justify-between items-center my-4">
        {weatherBar.map((y) => {
          return (
            <div key={y.id} className="flex flex-row" style={{justifyContent:"spacebetween",alignItems:"center"}}>
              {y.Icon}
              <p>{y.time }</p>
              <h2> {y.title}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}
