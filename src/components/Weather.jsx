import { useEffect, useRef, useState } from 'react';
import humidity_icon from '../assets/humidity.webp';
import search_icon from '../assets/search.png';
import broken_clouds_day from '../assets/weather_images/broken-clouds-day.jpg';
import broken_clouds_night from '../assets/weather_images/broken-clouds-night.jpg';
import clear_day from '../assets/weather_images/clear-day.jpg';
import clear_night from '../assets/weather_images/clear-night.jpg';
import few_clouds_day from '../assets/weather_images/few-clouds-day.jpg';
import few_clouds_night from '../assets/weather_images/few-clouds-night.jpg';
import rain_day from '../assets/weather_images/rain-day.jpg';
import rain_night from '../assets/weather_images/rain-night.jpg';
import scattered_clouds_day from '../assets/weather_images/scattered-clouds-day.jpg';
import scattered_clouds_night from '../assets/weather_images/scattered-clouds-night.jpg';
import shower_rain_day from '../assets/weather_images/shower-rain-day.jpg';
import shower_rain_night from '../assets/weather_images/shower-rain-night.jpg';
import snow_day from '../assets/weather_images/snow-day.jpg';
import snow_night from '../assets/weather_images/snow-night.jpg';
import thunderstorm_day from '../assets/weather_images/thunderstorm-day.jpg';
import thunderstorm_night from '../assets/weather_images/thunderstorm-night.jpg';
import wind_icon from '../assets/wind.jpg';
import './Weather.css';

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false)
  const allIcons = {
    "01d": clear_day,
    "01n": clear_night,
    "02d": few_clouds_day,
    "02n": few_clouds_night,
    "03d": scattered_clouds_day,
    "03n": scattered_clouds_night,
    "04d": broken_clouds_day,
    "04n": broken_clouds_night,
    "09d": shower_rain_day,
    "09n": shower_rain_night,
    "10d": rain_day,
    "10n": rain_night,
    "11d": thunderstorm_day,
    "11n": thunderstorm_night,
    "13d": snow_day,
    "13n": snow_night,
    
}; 
  const search = async (city) => {
    setLoading(true);
    if (city === " ") {
      alert("Enter City Name:");
      setLoading(false);
      return;
    }
    try {
      const url = "https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}&units=metric";
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) { // Changed from response.ok to !response.ok
          alert(data.message);
          setWeatherData(null); // Reset weatherData
          setLoading(false); // Reset loading state
          return;
        }
        const icon = allIcons[data.weather[0].icon] || clear_day; //get the icon based on the weather API data
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
        setLoading(false);
    } catch (error) {
      setWeatherData(null);
      setLoading(false);
      console.error("Error in fetching weather data", error);

    }
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputRef} type="text" placeholder="search" />
        <img src={search_icon} alt="search" onClick={() => search(inputRef.current.value)} />
      </div>
        {loading ? <p>Loading...</p>:(weatherData &&
        <>
        <img src={weatherData.icon} alt="Weather Icon" className='weather-icon' />
        <p className='temperature'>{weatherData.temperature}°C</p>
        <p className='location'>{weatherData.location}</p>
      <div className='weather-data'>
        <div className='col'>
            <img src={humidity_icon} alt="Humidity Icon" />
            <div>
              <p>{weatherData.humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>

        <div className="col" >
          <img src={wind_icon} alt="Wind Icon" />
            <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </>)}
    </div>
  );
};

export default Weather;
