import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icom from "../assets/snow.png";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";
import logo from "../assets/logo.png";
import Swal from "sweetalert2";
import alert_notif from "../assets/alert.wav";
import AOS from "aos";
import "aos/dist/aos.css";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icom,
    "13n": snow_icom,
  };
  const inputRef = useRef();
  const search = async (city) => {
    // Fetch weather data from API
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();

      console.log(response);
      if (!response.ok) {
        Swal.fire({
          text: "City Name Not Found.",
          confirmButtonText: "Try Again",
          timerProgressBar: true,
          timer: 2000,
        });
        return;
      }
      const icon = allIcons[data.weather[0].icon] || clear_icon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        maxTemp: Math.floor(data.main.temp_max),
        minTemp: Math.floor(data.main.temp_min),
        location: data.name,
        icon: icon,
      });
    } catch (err) {
      setWeatherData(false);
      console.error("error fetching weather data");
    }
  };

  useEffect(() => {
    search("iran");
    AOS.init();
  }, []);

  const clickHandler = () => {
    if (inputRef.current.value == "") {
      Swal.fire({
        text: "Please enter a city name.",
        confirmButtonText: "Okay",
        timerProgressBar: true,
        timer: 2000,
      });

      return; // Exit the function if no city is entered
    }
    search(inputRef.current.value);
    inputRef.current.value = "";
  };
  return (
    <>
   
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search for a city" />
        <img src={search_icon} alt="" onClick={clickHandler} />
      </div>
      {weatherData ? (
        <>
        <div className="weather-body">

          <img
            src={weatherData.icon}
            alt=""
            className="weather-icon"
            div
            data-aos="fade-down"
            />
          <p className="temperature" data-aos="flip-right">
            {weatherData.temperature} °c{" "}
          </p>
          <p className="location" data-aos="fade-down">
            {weatherData.location}
          </p>
            </div>

          <div className="weather-data " div data-aos="fade-down">
            <div className="col">
              <img src={humidity_icon} alt="" className="icon" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className="col">
              <img src={wind_icon} alt="" className="icon" />
              <div>
                <p>{weatherData.windSpeed} km/h </p>
                <span>windSpeed</span>
              </div>
            </div>
          </div>
            <div className="logo">
      <img src={logo} alt="" />
    </div>
        </>
      ) : (
        <></>
      )}
    </div>
      </>
  );
};

export default Weather;
