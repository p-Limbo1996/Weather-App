import React from "react";
import "./Weather.css";
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';

import humidity_icon from '../assets/humidity.png';
import wind_icon from '../assets/wind.png';

const Weather = () => {
  return (
    <div className="weather">
      <div className="search-bar">
        <input type="text" placeholder="Search for a city" />
        <img src={search_icon} alt="" />
      </div>

      <img src={clear_icon} alt="" className="weather-icon" />
      <p className="temperature">12 °c</p>
      <p className="location">londen</p>

      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="" className="icon" />
          <div>
          <p>90%</p>
          <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="" className="icon" />
          <div>
          <p>3.6 km/h  </p>
          <span>Humidity</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Weather;
  