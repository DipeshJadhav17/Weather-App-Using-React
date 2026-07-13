import SearchBox from "./searchBox";
import InfoBox from "./infoBox";
import { useState } from "react";

export default function WeatherBox() {
  let [weatherInfo, setWeatherInfo] = useState({
    city: "New York",
    feels_like: 30.5,
    temperature: 28.7,
    temp_min: 25.3,
    temp_max: 32.1,
    humidity: 70,
    weather: "Cloudy",
  });

  let updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h1>My Weather App</h1>
      <SearchBox updateInfo={updateInfo} />
      <InfoBox Info={weatherInfo} />
    </div>
  );
}
