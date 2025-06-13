import React, { useEffect, useState } from 'react';
import './WeatherWidget.css';

interface WeatherData {
  temperature: number;
  weathercode: number;
}

function getWeatherEmoji(code: number) {
  if (code === 0) return '☀️';
  if ([1, 2, 3].includes(code)) return '⛅️';
  if ([45, 48].includes(code)) return '🌫️';
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return '🌦️';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return '❄️';
  if ([95, 96, 99].includes(code)) return '⛈️';
  return '❔';
}

export const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lat = 18.5204;
    const lon = 73.8567;
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
      .then((res) => res.json())
      .then((data) => {
        setWeather({
          temperature: data.current_weather.temperature,
          weathercode: data.current_weather.weathercode,
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="weather-widget">
      <div className="weather-city">Pune</div>
      {loading ? (
        <div className="weather-loading">Loading...</div>
      ) : weather ? (
        <>
          <div className="weather-emoji">{getWeatherEmoji(weather.weathercode)}</div>
          <div className="weather-temp">{Math.round(weather.temperature)}°C</div>
        </>
      ) : (
        <div className="weather-error">N/A</div>
      )}
    </div>
  );
}; 