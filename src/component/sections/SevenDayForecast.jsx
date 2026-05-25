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
    <section className="min-h-screen bg-gray-100 px-6 py-24 md:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-1 w-8 rounded-full bg-sky-400"></div>

            <div className="h-1 w-16 rounded-full bg-pink-400"></div>
          </div>

          <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
            7-day forecast
          </h1>

          <p className="mt-6 max-w-xl text-lg text-gray-500">
            Weekly weather predictions with modern floating cards and responsive
            dashboard layout.
          </p>
        </div>

        {/* Forecast Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {weeklyData.map((day) => (
            <div
              key={day.id}
              className="
                rounded-3xl
                bg-white
                p-6
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-2xl
              "
            >
              {/* Top */}
              <div className="mb-8 flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {day.day}
                  </h2>

                  <p className="mt-1 text-gray-500">
                    {day.condition}
                  </p>
                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-4xl">
                  {day.icon}
                </div>
              </div>

              {/* Temperature */}
              <div>
                <div className="flex items-end gap-3">
                  <span className="text-5xl font-bold">
                    {day.temp}
                  </span>

                  <span className="pb-1 text-lg text-gray-400">
                    {day.low}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full w-2/3 rounded-full bg-sky-400"></div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 flex items-center justify-between text-sm text-gray-500">
                <span>Humidity 72%</span>

                <span>Wind 11 km/h</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SevenDayForecast