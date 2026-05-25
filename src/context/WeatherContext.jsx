import { createContext, useContext, useState, useEffect } from 'react'
import { fetchWeather, searchCity, interpretWeatherCode } from '../api/weatherApi'

const WeatherContext = createContext(null)

const FALLBACK_CITY = { name: 'Manila', lat: 14.5995, lon: 120.9842 }

async function reverseGeocode(lat, lon) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
    { headers: { 'Accept-Language': 'en' } }
  )
  const data = await res.json()
  // Try city → town → village → county as fallback
  const name =
    data.address?.city ||
    data.address?.town ||
    data.address?.village ||
    data.address?.county ||
    'Your Location'
  return { name, lat, lon }
}

export function WeatherProvider({ children }) {
  const [location, setLocation] = useState(null)      // null = still detecting
  const [weather, setWeather]   = useState(null)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [locating, setLocating] = useState(true)      // true while getting GPS

  // Step 1 — get device location on mount
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation(FALLBACK_CITY)
      setLocating(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude: lat, longitude: lon } = pos.coords
          const loc = await reverseGeocode(lat, lon)
          setLocation(loc)
        } catch {
          setLocation(FALLBACK_CITY)
        } finally {
          setLocating(false)
        }
      },
      () => {
        // User denied or error — fall back to Manila
        setLocation(FALLBACK_CITY)
        setLocating(false)
      },
      { timeout: 8000 }
    )
  }, [])

  // Step 2 — fetch weather whenever location changes
  useEffect(() => {
    if (!location) return
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

  return (
    <WeatherContext.Provider value={{ weather, loading, error, location, locating, changeCity }}>
      {children}
    </WeatherContext.Provider>
  )
}

export function useWeather() {
  const ctx = useContext(WeatherContext)
  if (!ctx) throw new Error('useWeather must be used inside WeatherProvider')
  return ctx
}

function parse(data, cityName) {
  const c = data.current
  const { label, emoji } = interpretWeatherCode(c.weather_code)

  return {
    city:          cityName,
    condition:     label,
    emoji,
    temperature:   Math.round(c.temperature_2m),
    feelsLike:     Math.round(c.apparent_temperature),
    humidity:      c.relative_humidity_2m,
    windSpeed:     Math.round(c.wind_speed_10m),
    windDirection: c.wind_direction_10m,
    pressure:      Math.round(c.surface_pressure),
    visibility:    (c.visibility / 1000).toFixed(1),
    uvIndex:       c.uv_index,
    precipitation: c.precipitation,
    dewPoint:      Math.round(c.dew_point_2m),
    cloudCover:    c.cloud_cover,

    hourly: data.hourly.time.slice(0, 24).map((time, i) => ({
      time,
      temp:     Math.round(data.hourly.temperature_2m[i]),
      humidity: data.hourly.relative_humidity_2m[i],
      code:     data.hourly.weather_code[i],
      precip:   data.hourly.precipitation_probability[i],
      wind:     Math.round(data.hourly.wind_speed_10m[i]),
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
      sunrise:  data.daily.sunrise[i],
      sunset:   data.daily.sunset[i],
      ...interpretWeatherCode(data.daily.weather_code[i]),
    })),
  }
}