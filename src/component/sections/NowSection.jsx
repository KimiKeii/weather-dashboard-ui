import { useWeather } from '../../context/WeatherContext'

function windDir(deg) {
  const dirs = ['N','NE','E','SE','S','SW','W','NW']
  return dirs[Math.round(deg / 45) % 8]
}

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

function NowSection() {
  const { weather, loading } = useWeather()

  const weatherData = weather ? [
    {
      id: 1,
      title: 'Temperature',
      value: `${weather.temperature}°C • ${weather.condition}`,
      description: 'Warm gradient background with bright highlights and light glassmorphism.',
      tags: [`UV ${weather.uvIndex} · ${uvLabel(weather.uvIndex)}`, `Dew point ${weather.dewPoint}°C`],
      icon: weather.emoji,
      gradient: 'from-orange-200 via-yellow-100 to-white',
      footer: ['☀️', '🌡️', '💧'],
    },
    {
      id: 2,
      title: 'Wind & Pressure',
      value: `${weather.windSpeed} km/h • ${weather.pressure} hPa`,
      description: 'Directional micro-visualization with gentle glow shifts aligned to wind intensity.',
      tags: [
        `Gusts ${weather.windSpeed} km/h · ${windDir(weather.windDirection)}`,
        `Visibility ${weather.visibility} km · ${visibilityLabel(weather.visibility)}`,
      ],
      icon: '🌬️',
      gradient: 'from-sky-200 via-cyan-100 to-white',
      footer: ['💨', '🌡️', '👁️'],
    },
  ] : []

  if (loading) {
    return (
      <section className="min-h-screen bg-[#f5f5f5] px-6 py-16 md:px-12">
        <div className="mb-16 flex flex-col items-center gap-4">
          <span className="h-1 w-6 rounded-full bg-sky-400" />
          <div className="h-12 w-24 bg-neutral-200 rounded-lg animate-pulse" />
          <span className="h-1 w-6 rounded-full bg-pink-400" />
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {[1, 2].map((i) => (
            <div key={i} className="h-52 bg-neutral-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="bg-[#f5f5f5] px-6 py-6 md:px-12">
      {/* Header */}
      <div className="mb-16 flex flex-col items-center gap-4">
        <span className="h-1 w-6 rounded-full bg-sky-400" />
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">Now</h1>
        <span className="h-1 w-6 rounded-full bg-pink-400" />
      </div>

      {/* Cards */}
      <div className="grid gap-8 lg:grid-cols-2">
        {weatherData.map((card) => (
          <div
            key={card.id}
            className={`group relative overflow-hidden rounded-2xl border border-white/40 bg-gradient-to-br ${card.gradient} p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
          >
            {/* Glow on hover */}
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/30 blur-3xl" />
            </div>

            <div className="relative flex gap-5">
              {/* Icon */}
              <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-white/40 text-4xl shadow-inner backdrop-blur-sm flex-shrink-0">
                {card.icon}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                    {card.title}
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">{card.value}</p>
                </div>

                <p className="max-w-md leading-relaxed text-gray-800">
                  {card.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {card.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-white/30 bg-white/50 px-3 py-1 text-xs font-medium backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer icons */}
                <div className="mt-2 flex items-center gap-4 text-xl">
                  {card.footer.map((icon, i) => (
                    <span key={i}>{icon}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default NowSection