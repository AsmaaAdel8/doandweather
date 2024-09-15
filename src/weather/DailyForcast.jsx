import React from "react";

const DailyForcast = ({ title,data}) => {
  return (
    <div>
      <h2>{`${title}`}</h2>
      <hr className="bg-slate-500" />
      <div className="flex flex-row justify-between items-center">
        {data.map((x,i) => {
          return (
            <div className="flex flex-col" key={i}>
              <p>{x.title}</p>
              <img src={x.icon} alt="icon" />
              <p>{x.temp.toFixed()}%</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyForcast;
