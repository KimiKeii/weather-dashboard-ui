const weatherData = [
  {
    id: 1,
    title: 'Temperature',
    value: '28°C',
    condition: 'Sunny',
    description:
      'Warm gradient background with bright highlights and smooth transitions.',
    icon: '☀️',
  },
  {
    id: 2,
    title: 'Wind',
    value: '10 km/h',
    condition: 'Soft breeze',
    description:
      'Directional atmospheric flow with responsive pressure visualization.',
    icon: '🌬️',
  },
]

function NowSection() {
  return (
    <section className="relative overflow-hidden bg-gray-100 px-6 py-24 md:px-16">
      {/* Background Glow */}
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-sky-200 opacity-40 blur-3xl"></div>

      <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-pink-200 opacity-30 blur-3xl"></div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-2">
        {/* LEFT CONTENT */}
        <div className="space-y-8">
          {/* Accent */}
          <div className="flex items-center gap-3">
            <div className="h-1 w-8 rounded-full bg-sky-400"></div>

            <div className="h-1 w-16 rounded-full bg-pink-400"></div>
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-6xl font-bold tracking-tight text-black md:text-7xl">
              Weather now
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-500">
              Real-time atmospheric conditions with fluid interactions, layered
              weather visualization, and responsive forecast transitions.
            </p>
          </div>

          {/* Floating Weather Bubble */}
          <div className="relative hidden h-72 w-72 lg:block">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-300 via-white to-pink-200 opacity-70 blur-2xl"></div>

            <div className="absolute left-10 top-10 flex h-52 w-52 items-center justify-center rounded-full bg-white/40 text-8xl shadow-2xl backdrop-blur-xl">
              ☀️
            </div>
          </div>
        </div>

        {/* RIGHT CARDS */}
        <div className="relative flex flex-col gap-8">
          {weatherData.map((card, index) => (
            <div
              key={card.id}
              className={`
                relative overflow-hidden rounded-[32px]
                bg-white p-8 shadow-xl transition-all duration-300
                hover:-translate-y-2 hover:shadow-2xl
                ${index === 1 ? 'lg:ml-20' : ''}
              `}
            >
              {/* Card Glow */}
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sky-100 opacity-40 blur-3xl"></div>

              <div className="relative flex items-start gap-6">
                {/* Icon */}
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gray-100 text-5xl">
                  {card.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="mb-4">
                    <h2 className="text-3xl font-bold text-black">
                      {card.title}
                    </h2>

                    <p className="mt-1 text-gray-500">
                      {card.condition}
                    </p>
                  </div>

                  <div className="mb-5">
                    <span className="text-6xl font-bold text-black">
                      {card.value}
                    </span>
                  </div>

                  <p className="max-w-md leading-relaxed text-gray-600">
                    {card.description}
                  </p>

                  {/* Footer */}
                  <div className="mt-6 flex gap-3">
                    <span className="rounded-full bg-gray-100 px-4 py-2 text-sm">
                      Humidity 72%
                    </span>

                    <span className="rounded-full bg-gray-100 px-4 py-2 text-sm">
                      UV 6
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NowSection