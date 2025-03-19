import  { useState, useEffect } from "react";

export const Weather = () => {
  const [city, setCity] = useState("Gujarat");
  const [weatherData, setWeatherData] = useState(null);
  const [inputCity, setInputCity] = useState("");

  // Helper function to get the country name
  const getCountryName = (code) => {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code);
  };

  // Helper function to format date and time
  const getDateTime = (dt) => {
    const curDate = new Date(dt * 1000); // Convert seconds to milliseconds
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    return formatter.format(curDate);
  };

  // Fetch weather data
  const getWeatherData = async () => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=358c9878b2cd02e4e94efdc7bcd1a221&units=metric`;
    try {
      const res = await fetch(weatherUrl);
      const data = await res.json();

      const { main, name, weather, wind, sys, dt } = data;

      setWeatherData({
        cityName: `${name}, ${getCountryName(sys.country)}`,
        dateTime: getDateTime(dt),
        forecast: weather[0].main,
        icon: `http://openweathermap.org/img/wn/${weather[0].icon}@4x.png`,
        temperature: `${main.temp.toFixed()}°C`,
        minTemp: `Min: ${main.temp_min.toFixed()}°C`,
        maxTemp: `Max: ${main.temp_max.toFixed()}°C`,
        feelsLike: `${main.feels_like.toFixed()}°C`,
        humidity: `${main.humidity}%`,
        wind: `${wind.speed} m/s`,
        pressure: `${main.pressure} hPa`,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Handle city search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (inputCity.trim()) {
      setCity(inputCity);
      setInputCity("");
    }
  };

  useEffect(() => {
    getWeatherData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  return (
    <section className="container">
      {/* Input Field Search */}
      <div className="weather_header">
        <form className="weather_search" onSubmit={handleSearch}>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            className="city_name"
            placeholder="Search your city..."
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
          />
        </form>
      </div>

      {/* Weather Main Data */}
      {weatherData && (
        <>
          <div className="weather_body">
            <h1 className="weather_city">{weatherData.cityName}</h1>
            <p className="weather_date_time">{weatherData.dateTime}</p>
            <div className="weather_data">
              <p className="weather_forecast">{weatherData.forecast}</p>
              <div className="weather_icon">
                <img src={weatherData.icon} alt="Weather Icon" />
              </div>
            </div>
            <p className="weather_temperature">{weatherData.temperature}</p>
            <div className="weather_minmax">
              <p className="weather_min">{weatherData.minTemp}</p>
              <p className="weather_max">{weatherData.maxTemp}</p>
            </div>
          </div>

          {/* Weather Extra Data */}
          <section className="weather_info">
            <div className="weather_card">
              <i className="fa-solid fa-thermometer"></i>
              <div>
                <p>Feels Like</p>
                <p className="weather_feelsLike">{weatherData.feelsLike}</p>
              </div>
            </div>

            <div className="weather_card">
              <i className="fa-solid fa-droplet"></i>
              <div>
                <p>Humidity</p>
                <p className="weather_humidity">{weatherData.humidity}</p>
              </div>
            </div>

            <div className="weather_card">
              <i className="fa-solid fa-wind"></i>
              <div>
                <p>Wind</p>
                <p className="weather_wind">{weatherData.wind}</p>
              </div>
            </div>

            <div className="weather_card">
              <i className="fa-solid fa-gauge-high"></i>
              <div>
                <p>Pressure</p>
                <p className="weather_pressure">{weatherData.pressure}</p>
              </div>
            </div>
          </section>
        </>
      )}
    </section>
  );
};


