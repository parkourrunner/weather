import React, { useEffect, useState } from 'react'
import Search from '../search';

export default function Weather() {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  async function fetchWeatherData(param) {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=b1bd790f204ad199a0e026a4a7161764`
      );
      const data = await response.json();
      if (data) {
        setData(data);
        setIsLoading(false);
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error);

    }
  }
  function handleSearch() {
    fetchWeatherData(search);
  }
  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  useEffect(() => {
    fetchWeatherData("Minsk");
  }, []);
  if (isLoading) <div className="loading">Loading...</div>
  console.log(data)
  return (
    <div>
      <Search search={search} setSearch={setSearch} handleSearch={handleSearch} />
      <div>
          <div className="city-name">
            <h2>
              {data?.name}, <span>{data?.sys?.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{getCurrentDate()}</span>
          </div>
          <div className="temp">{data?.main?.temp}</div>
          <p className="description">
            {data && data.weather && data.weather[0]
              ? data.weather[0].description
              : ""}
          </p>
          <div className="weather-info">
            <div className="column">
              <div>
                <p className="wind">{data?.wind?.speed}</p>
                <p>Wind Speed</p>
              </div>
            </div>
            <div className="column">
              <div>
                <p className="humidity">{data?.main?.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
