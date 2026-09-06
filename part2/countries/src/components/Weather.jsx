import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital, lat, lon }) => {
  const [weather, setWeather] = useState(null)
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY

  useEffect(() => {
    if (!capital) return

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`

    axios
      .get(url)
      .then(response => {
        setWeather(response.data)
      })
      .catch(error => {
        console.error('Failed to load weather data:', error)
      })
  }, [capital, apiKey])

  if (!weather) {
    return <div>Loading weather...</div>
  }

  const iconCode = weather.weather[0]?.icon
  const iconUrl = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : null

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <div>Temperature {weather.main.temp} Celsius</div>
      {iconUrl && (
        <img 
          src={iconUrl} 
          alt={weather.weather[0]?.description || 'weather icon'} 
        />
      )}
      <div>Wind {weather.wind.speed} m/s</div>
    </div>
  )
}

export default Weather