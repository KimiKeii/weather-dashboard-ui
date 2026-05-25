import { useWeather } from '../../context/WeatherContext'

function SevenDayForecast() {
  const { weather, loading } = useWeather()

  const weeklyData = weather?.daily?.map((d) => {
    const date = new Date(d.date)
    return {
      day:       date.toLocaleDateString('en-US', { weekday: 'long' }),
      date:      date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      temp:      `${d.tempMax}°C`,
      low:       `${d.tempMin}°C`,
      condition: d.label,
      icon:      d.emoji,
      humidity:  d.precip,       // precip probability as humidity proxy
      wind:      d.windMax,
      uvMax:     d.uvMax,
    }
  }) ?? []

  // Progress bar width: temp range relative to max across the week
  const allMaxTemps = weeklyData.map((d) => parseInt(d.temp))
  const overallMax  = Math.max(...allMaxTemps, 1)
  const overallMin  = Math.min(...allMaxTemps, 0)

  function tempProgress(temp) {
    const val = parseInt(temp)
    return Math.round(((val - overallMin) / (overallMax - overallMin)) * 100)
  }

  if (loading) {
    return (
      <section className="py-16 border-b border-neutral-200">
        <div className="mb-16">
          <div className="h-10 w-48 bg-neutral-100 rounded-lg animate-pulse mb-4" />
          <div className="h-4 w-72 bg-neutral-100 rounded animate-pulse" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="rounded-3xl bg-neutral-100 animate-pulse h-52" />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section id="forecast" className="py-16 border-b border-neutral-200">
      {/* Header */}
      <div className="mb-16">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-1 w-8 rounded-full bg-sky-400" />
          <div className="h-1 w-16 rounded-full bg-pink-400" />
        </div>
        <h1 className="text-5xl font-bold tracking-tight">7-day forecast</h1>
        <p className="mt-6 max-w-xl text-lg text-neutral-500">
          Weekly weather predictions with modern floating cards and responsive dashboard layout.
        </p>
      </div>

      {/* Forecast Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {weeklyData.map((day, i) => (
          <div
            key={i}
            className="rounded-3xl bg-white border border-neutral-200 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Top */}
            <div className="mb-8 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold">{day.day}</h2>
                <p className="mt-0.5 text-sm text-neutral-400">{day.date}</p>
                <p className="mt-1 text-neutral-500">{day.condition}</p>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 text-4xl flex-shrink-0">
                {day.icon}
              </div>
            </div>

            {/* Temperature */}
            <div>
              <div className="flex items-end gap-3">
                <span className="text-5xl font-bold">{day.temp}</span>
                <span className="pb-1 text-lg text-neutral-400">{day.low}</span>
              </div>

              {/* Progress bar — relative warmth across the week */}
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-neutral-200">
                <div
                  className="h-full rounded-full bg-sky-400 transition-all duration-700"
                  style={{ width: `${tempProgress(day.temp)}%` }}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 flex items-center justify-between text-sm text-neutral-500">
              <span>Precip {day.humidity}%</span>
              <span>Wind {day.wind} km/h</span>
              <span>UV {day.uvMax}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SevenDayForecast