import { useWeather } from '../../context/WeatherContext'

function uvLabel(uv) {
  if (uv <= 2) return 'Low'
  if (uv <= 5) return 'Moderate'
  if (uv <= 7) return 'High'
  if (uv <= 10) return 'Very High'
  return 'Extreme'
}

function visibilityLabel(km) {
  if (km >= 10) return 'Clear'
  if (km >= 5)  return 'Hazy'
  if (km >= 2)  return 'Foggy'
  return 'Very low'
}

function windDir(deg) {
  const dirs = ['N','NE','E','SE','S','SW','W','NW']
  return dirs[Math.round(deg / 45) % 8]
}

export default function AtmosphereDetails() {
  const { weather, loading } = useWeather()

  const stats = loading || !weather ? null : [
    {
      label: 'Humidity',
      value: `${weather.humidity}%`,
      sub: '+3%',
    },
    {
      label: 'Wind',
      value: `${weather.windSpeed} km/h`,
      sub: `→ ${windDir(weather.windDirection)}`,
    },
    {
      label: 'Visibility',
      value: `${weather.visibility} km`,
      sub: visibilityLabel(weather.visibility),
    },
    {
      label: 'UV Index',
      value: `${weather.uvIndex}`,
      sub: uvLabel(weather.uvIndex),
    },
    {
      label: 'Pressure',
      value: `${weather.pressure} hPa`,
      sub: '+1',
    },
    {
      label: 'Dew Point',
      value: `${weather.dewPoint}°C`,
      sub: '-1',
    },
  ]

  return (
    <section id="air" className="py-16 border-b border-neutral-200">
      <h2 className="text-3xl font-semibold text-center tracking-tight mb-2">
        Atmosphere details
      </h2>
      <p className="text-sm text-neutral-400 text-center mb-10">
        Micro-visualizations update with every weather shift
      </p>

      <div className="grid grid-cols-3 gap-4">
        {loading || !stats
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border border-neutral-200 rounded-xl p-5 animate-pulse">
                <div className="h-3 w-16 bg-neutral-100 rounded mb-3" />
                <div className="h-7 w-24 bg-neutral-100 rounded mb-2" />
                <div className="h-3 w-10 bg-neutral-100 rounded" />
              </div>
            ))
          : stats.map(({ label, value, sub }) => (
              <div key={label} className="border border-neutral-200 rounded-xl p-5">
                <p className="text-xs text-neutral-400 mb-1">{label}</p>
                <p className="text-2xl font-light tracking-tight text-neutral-900">{value}</p>
                <p className="text-xs text-neutral-400 mt-1">{sub}</p>
              </div>
            ))
        }
      </div>
    </section>
  )
}