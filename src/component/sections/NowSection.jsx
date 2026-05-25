import { useWeather } from '../../hooks/useWeather'

function NowSection() {
  const { weather, loading } = useWeather()

  if (loading) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-pink-50 px-6 py-20 md:px-10 xl:px-20">
        <div className="relative grid min-h-screen w-full grid-cols-1 items-center gap-16 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="space-y-10">
            <div className="flex items-center gap-3">
              <div className="h-1 w-10 rounded-full bg-sky-400"></div>
              <div className="h-1 w-20 rounded-full bg-pink-400"></div>
            </div>
            <div>
              <div className="h-20 w-64 rounded-lg bg-gray-200 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!weather) return null

  const weatherData = [
    {
      id: 1,
      title: 'Temperature',
      value: `${weather.temperature}°C`,
      condition: weather.condition,
      description: `Current temperature with feels like ${weather.feelsLike}°C. ${weather.condition} conditions across the region.`,
      icon: weather.emoji,
      metrics: [
        { label: 'Feels Like', value: `${weather.feelsLike}°C` },
        { label: 'UV Index', value: weather.uvIndex.toFixed(1) },
        { label: 'Dew Point', value: `${weather.dewPoint}°C` },
        { label: 'Cloud Cover', value: `${weather.cloudCover}%` },
      ],
    },
    {
      id: 2,
      title: 'Wind Pressure',
      value: `${weather.windSpeed} km/h`,
      condition: 'Air Movement',
      description: `Wind speed at ${weather.windSpeed} km/h from direction ${weather.windDirection}°. Atmospheric pressure stable at ${weather.pressure} hPa.`,
      icon: '🌬️',
      metrics: [
        { label: 'Humidity', value: `${weather.humidity}%` },
        { label: 'Pressure', value: `${weather.pressure} hPa` },
        { label: 'Visibility', value: `${weather.visibility} km` },
        { label: 'Precipitation', value: `${weather.precipitation} mm` },
      ],
    },
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-pink-50 px-6 py-20 md:px-10 xl:px-20">
      {/* Atmospheric Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-sky-200 opacity-40 blur-3xl"></div>

        <div className="absolute right-0 top-20 h-[600px] w-[600px] rounded-full bg-pink-200 opacity-30 blur-3xl"></div>

        <div className="absolute bottom-0 left-1/3 h-[450px] w-[450px] rounded-full bg-blue-100 opacity-30 blur-3xl"></div>
      </div>

      {/* Main Layout */}
      <div className="relative grid min-h-screen w-full grid-cols-1 items-center gap-16 lg:grid-cols-[0.7fr_1.3fr]">
        {/* LEFT SIDE */}
        <div className="space-y-10">
          {/* Accent */}
          <div className="flex items-center gap-3">
            <div className="h-1 w-10 rounded-full bg-sky-400"></div>

            <div className="h-1 w-20 rounded-full bg-pink-400"></div>
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-6xl font-bold tracking-tight text-black md:text-7xl xl:text-8xl">
              Weather now
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-gray-600 md:text-xl">
              Real-time atmospheric conditions with immersive visual feedback,
              scalable weather metrics, and dynamic dashboard interactions.
            </p>
          </div>

          {/* Floating Orb */}
          <div className="relative hidden h-80 w-80 lg:block">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-300 via-white to-pink-200 opacity-80 blur-2xl"></div>

            <div className="absolute left-10 top-10 flex h-60 w-60 items-center justify-center rounded-full bg-white/40 text-9xl shadow-2xl backdrop-blur-2xl">
              ☀️
            </div>
          </div>
        </div>

        {/* RIGHT WEATHER PANEL */}
        <div className="relative flex items-center justify-center lg:justify-end">
          <div className="flex w-full max-w-3xl flex-col gap-8">
            {weatherData.map((card) => (
              <div
                key={card.id}
                className="
                  relative overflow-hidden rounded-[40px]
                  bg-white/80 p-8 md:p-10
                  shadow-2xl backdrop-blur-xl
                  transition-all duration-300
                  hover:-translate-y-2
                  hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)]
                "
              >
                {/* Card Glow */}
                <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-sky-100 opacity-40 blur-3xl"></div>

                {/* Content */}
                <div className="relative">
                  {/* TOP */}
                  <div className="mb-8 flex items-start justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
                        Live metric
                      </p>

                      <h2 className="mt-3 text-3xl font-bold text-black md:text-4xl">
                        {card.title}
                      </h2>
                    </div>

                    {/* Icon */}
                    <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-gray-100 text-5xl shadow-inner">
                      {card.icon}
                    </div>
                  </div>

                  {/* Main Metric */}
                  <div className="mb-6">
                    <span className="text-6xl font-bold tracking-tight text-black md:text-7xl">
                      {card.value}
                    </span>

                    <p className="mt-3 text-lg text-gray-500">
                      {card.condition}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="max-w-xl leading-relaxed text-gray-600">
                    {card.description}
                  </p>

                  {/* Metrics Grid */}
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    {card.metrics.map((metric, idx) => (
                      <div key={idx} className="rounded-2xl bg-gray-100 p-4">
                        <p className="text-sm text-gray-400">
                          {metric.label}
                        </p>

                        <h3 className="mt-2 text-2xl font-semibold">
                          {metric.value}
                        </h3>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default NowSection