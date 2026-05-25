const GEO_URL = 'https://nominatim.openstreetmap.org/search'
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast'

export async function searchCity(query) {
  const res = await fetch(
    `${GEO_URL}?q=${encodeURIComponent(query)}&format=json&limit=5`,
    { headers: { 'Accept-Language': 'en' } }
  )
  if (!res.ok) throw new Error('Location search failed')
  const data = await res.json()
  return data.map((place) => ({
    lat: parseFloat(place.lat),
    lon: parseFloat(place.lon),
    displayName: place.display_name,
    name: place.name,
  }))
}

export async function fetchWeather(lat, lon) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: [
      'temperature_2m',
      'apparent_temperature',
      'relative_humidity_2m',
      'wind_speed_10m',
      'wind_direction_10m',
      'weather_code',
      'surface_pressure',
      'visibility',
      'uv_index',
      'precipitation',
      'dew_point_2m',
      'cloud_cover',
    ].join(','),
    hourly: [
      'temperature_2m',
      'weather_code',
      'precipitation_probability',
      'wind_speed_10m',
    ].join(','),
    daily: [
      'temperature_2m_max',
      'temperature_2m_min',
      'weather_code',
      'precipitation_probability_max',
      'uv_index_max',
      'wind_speed_10m_max',
      'sunrise',      // ← added
      'sunset',       // ← added
    ].join(','),
    timezone: 'auto',
    forecast_days: 7,
  })

  const res = await fetch(`${WEATHER_URL}?${params}`)
  if (!res.ok) throw new Error('Weather fetch failed')
  return res.json()
}

export function interpretWeatherCode(code) {
  if (code === 0)    return { label: 'Clear sky',     emoji: '☀️' }
  if (code <= 2)     return { label: 'Partly cloudy', emoji: '⛅' }
  if (code === 3)    return { label: 'Overcast',      emoji: '☁️' }
  if (code <= 49)    return { label: 'Foggy',         emoji: '🌫️' }
  if (code <= 59)    return { label: 'Drizzle',       emoji: '🌦️' }
  if (code <= 69)    return { label: 'Rain',          emoji: '🌧️' }
  if (code <= 79)    return { label: 'Snow',          emoji: '❄️' }
  if (code <= 84)    return { label: 'Rain showers',  emoji: '🌧️' }
  if (code <= 94)    return { label: 'Thunderstorm',  emoji: '⛈️' }
  return                    { label: 'Sunny',         emoji: '☀️' }
}