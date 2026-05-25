import { useWeather } from '../../context/WeatherContext'

function HourlyForecast() {
  const { weather, loading } = useWeather()

  // Get next 8 hours starting from current hour
  const now         = new Date()
  const currentHour = now.getHours()

  const hourlyData = weather?.hourly
    ?.filter((h) => {
      const hour = new Date(h.time).getHours()
      return new Date(h.time) >= now
    })
    ?.slice(0, 8)
    ?.map((h, i) => {
      const date = new Date(h.time)
      const hour = date.getHours()
      const mins = date.getMinutes().toString().padStart(2, '0')
      return {
        id:        i,
        time:      i === 0 ? 'Next hour' : `${hour}:${mins}`,
        temp:      `${h.temp}°C`,
        condition: h.label,
        icon:      h.emoji,
        precip:    h.precip,
        wind:      h.wind,
      }
    }) ?? []

  if (loading) {
    return (
      <section className="py-24 border-b border-neutral-200 px-6 md:px-0">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="h-12 w-64 bg-neutral-100 rounded-lg animate-pulse" />
            <div className="h-4 w-80 bg-neutral-100 rounded animate-pulse" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 bg-neutral-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 border-b border-neutral-200">
      <div className="grid items-center gap-20 lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-1 w-8 rounded-full bg-sky-400" />
            <div className="h-1 w-16 rounded-full bg-pink-400" />
          </div>

          <div>
            <h1 className="text-6xl font-bold tracking-tight text-black">
              Hourly forecast
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-neutral-500">
              Horizontal scroll cards with floating depth, modern glass effects,
              and smooth weather transitions.
            </p>
          </div>

          {/* Decorative blob with current weather emoji */}
          <div className="relative mt-10 hidden h-72 w-72 lg:block">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-300 via-blue-200 to-pink-200 opacity-70 blur-3xl" />
            <div className="absolute left-12 top-12 flex h-48 w-48 items-center justify-center rounded-full bg-white/40 text-7xl shadow-2xl backdrop-blur-xl">
              {weather?.emoji ?? '☀️'}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative overflow-hidden rounded-[32px] border border-white/30 bg-white/40 p-4 shadow-2xl backdrop-blur-xl">
          {/* Glow blobs */}
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sky-200 opacity-40 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-pink-200 opacity-40 blur-3xl" />

          {/* Forecast list */}
          <div className="relative space-y-3">
            {hourlyData.map((item) => (
              <div
                key={item.id}
                className="group flex items-center justify-between rounded-2xl border border-white/30 bg-white/50 px-5 py-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/80 hover:shadow-xl"
              >
                {/* Left — icon + time + temp */}
                <div className="flex items-center gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/60 text-3xl shadow-inner backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-black">{item.time}</h2>
                    <p className="mt-1 text-sm text-neutral-500">{item.temp}</p>
                  </div>
                </div>

                {/* Right — condition + precip */}
                <div className="text-right">
                  <p className="text-xl font-semibold text-neutral-800">{item.condition}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    💧 {item.precip}% · 💨 {item.wind} km/h
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HourlyForecast