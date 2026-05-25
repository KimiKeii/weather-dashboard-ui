const weeklyData = [
  {
    id: 1,
    day: 'Monday',
    temp: '30°C',
    low: '24°C',
    condition: 'Sunny',
    icon: '☀️',
  },
  {
    id: 2,
    day: 'Tuesday',
    temp: '28°C',
    low: '23°C',
    condition: 'Cloudy',
    icon: '⛅',
  },
  {
    id: 3,
    day: 'Wednesday',
    temp: '27°C',
    low: '22°C',
    condition: 'Rain',
    icon: '🌧️',
  },
  {
    id: 4,
    day: 'Thursday',
    temp: '31°C',
    low: '25°C',
    condition: 'Clear',
    icon: '🌤️',
  },
  {
    id: 5,
    day: 'Friday',
    temp: '29°C',
    low: '24°C',
    condition: 'Windy',
    icon: '🌬️',
  },
  {
    id: 6,
    day: 'Saturday',
    temp: '32°C',
    low: '26°C',
    condition: 'Bright',
    icon: '☀️',
  },
  {
    id: 7,
    day: 'Sunday',
    temp: '26°C',
    low: '21°C',
    condition: 'Storm',
    icon: '⛈️',
  },
]

function SevenDayForecast() {
  return (
    <section className="min-h-screen bg-[#f5f5f5] px-6 py-24 md:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-1 w-8 rounded-full bg-sky-400"></div>

              <div className="h-1 w-16 rounded-full bg-pink-400"></div>
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-black md:text-6xl">
              7-day forecast
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-500">
              Weekly weather predictions with modern floating cards and smooth
              atmospheric gradients.
            </p>
          </div>

          {/* Decorative Temperature Bubble */}
          <div className="hidden lg:block">
            <div className="flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-sky-200 via-white to-pink-200 text-6xl shadow-2xl">
              🌤️
            </div>
          </div>
        </div>

        {/* Forecast Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {weeklyData.map((day) => (
            <div
              key={day.id}
              className="
                group
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-white/30
                bg-white/50
                p-6
                shadow-lg
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-2
                hover:bg-white/70
                hover:shadow-2xl
              "
            >
              {/* Glow */}
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-sky-100 opacity-50 blur-3xl"></div>

              {/* Content */}
              <div className="relative">
                {/* Top */}
                <div className="mb-8 flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-black">
                      {day.day}
                    </h2>

                    <p className="mt-1 text-gray-500">
                      {day.condition}
                    </p>
                  </div>

                  <div
                    className="
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      bg-white/60
                      text-4xl
                      shadow-inner
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    "
                  >
                    {day.icon}
                  </div>
                </div>

                {/* Temperature */}
                <div className="space-y-3">
                  <div className="flex items-end gap-3">
                    <span className="text-5xl font-bold text-black">
                      {day.temp}
                    </span>

                    <span className="pb-1 text-lg text-gray-400">
                      {day.low}
                    </span>
                  </div>

                  {/* Progress Line */}
                  <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                    <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-sky-400 to-pink-400"></div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-8 flex items-center justify-between text-sm text-gray-500">
                  <span>Humidity 72%</span>

                  <span>Wind 11 km/h</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SevenDayForecast