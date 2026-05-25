const weatherData = [
  {
    id: 1,
    title: 'Temperature',
    value: '28°C • Sunny',
    description:
      'Warm gradient background with bright highlights and light glassmorphism.',
    tags: ['UV 6', 'Dew point 14°C'],
    icon: '☀️',
    gradient: 'from-orange-200 via-yellow-100 to-white',
  },
  {
    id: 2,
    title: 'Wind & Pressure',
    value: '10 km/h • 1013 hPa',
    description:
      'Directional micro-visualization with gentle glow shifts aligned to wind intensity.',
    tags: ['Gusts 16 km/h', 'Visibility 12 km'],
    icon: '🌬️',
    gradient: 'from-sky-200 via-cyan-100 to-white',
  },
]

function NowSection() {
  return (
    <section className="min-h-screen bg-[#f5f5f5] px-6 py-16 md:px-12">
      {/* Header */}
      <div className="mb-16 flex flex-col items-center gap-4">
        <span className="h-1 w-6 rounded-full bg-sky-400" />

        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          Now
        </h1>

        <span className="h-1 w-6 rounded-full bg-pink-400" />
      </div>

      {/* Dynamic Cards */}
      <div className="grid gap-8 lg:grid-cols-2">
        {weatherData.map((card) => (
          <div
            key={card.id}
            className={`
              group relative overflow-hidden rounded-2xl border border-white/40
              bg-gradient-to-br ${card.gradient}
              p-5 shadow-sm backdrop-blur-md
              transition-all duration-300
              hover:-translate-y-1
              hover:shadow-xl
            `}
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/30 blur-3xl" />
            </div>

            <div className="relative flex gap-5">
              {/* Left Icon Box */}
              <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-white/40 text-4xl shadow-inner backdrop-blur-sm">
                {card.icon}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                    {card.title}
                  </h2>

                  <p className="mt-1 text-sm text-gray-600">
                    {card.value}
                  </p>
                </div>

                <p className="max-w-md leading-relaxed text-gray-800">
                  {card.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {card.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="
                        rounded-full
                        border border-white/30
                        bg-white/50
                        px-3 py-1
                        text-xs font-medium
                        backdrop-blur-sm
                      "
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-2 flex items-center gap-4 text-xl">
                  <span>☀️</span>
                  <span>🌡️</span>
                  <span>💧</span>
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