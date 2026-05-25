const hourlyData = [
  {
    id: 1,
    time: 'Next hour',
    temp: '29°C',
    condition: 'Partly bright',
    icon: '⏰',
  },
  {
    id: 2,
    time: '11:00',
    temp: '29°C',
    condition: 'High sun',
    icon: '🌤️',
  },
  {
    id: 3,
    time: '12:00',
    temp: '30°C',
    condition: 'Peak brightness',
    icon: '☀️',
  },
  {
    id: 4,
    time: '13:00',
    temp: '29°C',
    condition: 'Soft clouds',
    icon: '⛅',
  },
]

function HourlyForecast() {
  return (
    <section className="min-h-screen bg-[#f5f5f5] px-6 py-24 md:px-16">
      <div className="mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="space-y-8">
          {/* Accent */}
          <div className="flex items-center gap-3">
            <div className="h-1 w-8 rounded-full bg-sky-400"></div>

            <div className="h-1 w-16 rounded-full bg-pink-400"></div>
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-6xl font-bold tracking-tight text-black">
              Hourly forecast
            </h1>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-gray-500">
              Horizontal scroll cards with floating depth, modern glass effects,
              and smooth weather transitions.
            </p>
          </div>

          {/* Decorative Blob */}
          <div className="relative mt-10 hidden h-72 w-72 lg:block">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-300 via-blue-200 to-pink-200 opacity-70 blur-3xl"></div>

            <div className="absolute left-12 top-12 flex h-48 w-48 items-center justify-center rounded-full bg-white/40 text-7xl shadow-2xl backdrop-blur-xl">
              ☀️
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative overflow-hidden rounded-[32px] border border-white/30 bg-white/40 p-4 shadow-2xl backdrop-blur-xl">
          {/* Glow Background */}
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sky-200 opacity-40 blur-3xl"></div>

          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-pink-200 opacity-40 blur-3xl"></div>

          {/* Forecast List */}
          <div className="relative space-y-3">
            {hourlyData.map((item) => (
              <div
                key={item.id}
                className="
                  group
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  border-white/30
                  bg-white/50
                  px-5
                  py-5
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white/80
                  hover:shadow-xl
                "
              >
                {/* LEFT */}
                <div className="flex items-center gap-5">
                  {/* ICON */}
                  <div
                    className="
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      bg-white/60
                      text-3xl
                      shadow-inner
                      backdrop-blur-md
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    "
                  >
                    {item.icon}
                  </div>

                  {/* TIME + TEMP */}
                  <div>
                    <h2 className="text-2xl font-semibold text-black">
                      {item.time}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {item.temp}
                    </p>
                  </div>
                </div>

                {/* RIGHT */}
                <div>
                  <p className="text-xl font-semibold text-gray-800">
                    {item.condition}
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