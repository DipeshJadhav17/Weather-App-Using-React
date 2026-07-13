import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./searchBox.css";
import { useState } from "react";

export default function SearchBox({ updateInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  let getWeather = async () => {
    try {
      let response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`,
      );
      let data = await response.json();
      let weatherInfo = {
        city: data.name,
        temperature: data.main.temp,
        weather: data.weather[0].description,
        icon: data.weather[0].icon,
        temp_min: data.main.temp_min,
        temp_max: data.main.temp_max,
        feels_like: data.main.feels_like,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
      };
      console.log("Weather info:", weatherInfo);
      return weatherInfo;
    } catch (error) {
      throw error;
    }
  };

  let handleChange = (e) => {
    setCity(e.target.value);
  };

  let handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("Searching for weather in:", city);
      // console.log("API URL:", API_URL);
      let weatherInfo = await getWeather(); // Call the function to fetch weather data
      updateInfo(weatherInfo); // Update the weather info in the parent component
      setCity(""); // Clear the input field after submission
      setError(false); // Reset error state on successful fetch
    } catch (error) {
      setError(true);
    }
  };
  return (
    <div className="search-box">
      <form action="" onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
        />
        <br />
        <br />
        <Button variant="contained" type="submit">
          Search
        </Button>
        {error && (
          <p style={{ color: "red" }}>No such place exist in our database.</p>
        )}
      </form>
    </div>
  );
}
