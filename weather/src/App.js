import React, { useState } from "react";
import "./App.css";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import Forecast from "./components/forecast/forecast";

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [fiveDaysWeather, setFiveDaysWeather] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const [city, state] = searchData.label.split(", ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
    );
    const fiveDaysWeatherFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
    );

    Promise.all([currentWeatherFetch, fiveDaysWeatherFetch])
      .then(async (response) => {
        const currentResponse = await response[0].json();
        const fiveDaysResponse = await response[1].json();

        setCurrentWeather({ city: city, state: state, ...currentResponse });
        setFiveDaysWeather({ city: city, state: state, ...fiveDaysResponse });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {fiveDaysWeather && <Forecast data={fiveDaysWeather} />}
    </div>
  );
};

export default App;