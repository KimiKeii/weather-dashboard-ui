import { useState, useEffect } from 'react'
import { fetchWeather, searchCity, interpretWeatherCode } from '../api/weatherApi'

const DEFAULT_CITY = { name: 'Manila', lat: 14.5995, lon: 120.9842 }

export function useWeather() {
  const [location, setLocation] = useState(DEFAULT_CITY)
  const [weather, setWeather]   = useState(null)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchWeather(location.lat, location.lon)
        if (!cancelled) setWeather(parse(data, location.name))
      } catch (e) {
        if (!cancelled) setError(e.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [location])

  async function changeCity(query) {
    try {
      const results = await searchCity(query)
      if (results.length > 0) {
        const { lat, lon, name } = results[0]
        setLocation({ name, lat, lon })
      }
    } catch (e) {
      setError(e.message)
    }
  }

  return { weather, loading, error, location, changeCity }
}

function parse(data, cityName) {
  const c = data.current
  const { label, emoji } = interpretWeatherCode(c.weather_code)

  return {
    city:        cityName,
    condition:   label,
    emoji,
    temperature:  Math.round(c.temperature_2m),
    feelsLike:    Math.round(c.apparent_temperature),
    humidity:     c.relative_humidity_2m,
    windSpeed:    Math.round(c.wind_speed_10m),
    windDirection: c.wind_direction_10m,
    pressure:     Math.round(c.surface_pressure),
    visibility:   (c.visibility / 1000).toFixed(1),
    uvIndex:      c.uv_index,
    precipitation: c.precipitation,
    dewPoint:     Math.round(c.dew_point_2m),
    cloudCover:   c.cloud_cover,

    hourly: data.hourly.time.slice(0, 24).map((time, i) => ({
      time,
      temp:   Math.round(data.hourly.temperature_2m[i]),
      code:   data.hourly.weather_code[i],
      precip: data.hourly.precipitation_probability[i],
      wind:   Math.round(data.hourly.wind_speed_10m[i]),
      ...interpretWeatherCode(data.hourly.weather_code[i]),
    })),

    daily: data.daily.time.map((date, i) => ({
      date,
      tempMax:  Math.round(data.daily.temperature_2m_max[i]),
      tempMin:  Math.round(data.daily.temperature_2m_min[i]),
      code:     data.daily.weather_code[i],
      precip:   data.daily.precipitation_probability_max[i],
      uvMax:    data.daily.uv_index_max[i],
      windMax:  Math.round(data.daily.wind_speed_10m_max[i]),
      sunrise:  data.daily.sunrise[i],   // ← "2025-05-25T05:36"
      sunset:   data.daily.sunset[i],    // ← "2025-05-25T18:24"
      ...interpretWeatherCode(data.daily.weather_code[i]),
    })),
  }
}