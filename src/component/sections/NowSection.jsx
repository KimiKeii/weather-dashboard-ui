export default function NowSection() {
  return (
    <section className="min-h-screen w-full bg-[#f5f5f5] px-10 py-16">
      {/* Header */}
      <div className="mb-16 flex flex-col items-center gap-4">
        <span className="h-1 w-6 rounded-full bg-sky-400"></span>

        <h1 className="text-5xl font-bold text-black">Now</h1>

        <span className="h-1 w-6 rounded-full bg-pink-400"></span>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-8">
        {/* Temperature Card */}
        <div className="flex w-full max-w-[460px] gap-4 rounded-xl border border-gray-200 bg-white p-4">
          <div className="h-[90px] w-[90px] rounded bg-gray-200"></div>

          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-bold">Temperature</h2>

            <p className="text-sm text-gray-500">28°C • Sunny</p>

            <p className="text-base leading-relaxed text-gray-900">
              Warm gradient background with bright highlights and light
              glassmorphism.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="rounded bg-gray-100 px-2 py-1 text-xs">
                UV 6
              </span>

              <span className="rounded bg-gray-100 px-2 py-1 text-xs">
                Dew point 14°C
              </span>
            </div>

            <div className="flex gap-4 text-lg">
              <span>☀️</span>
              <span>🌬️</span>
              <span>💧</span>
            </div>
          </div>
        </div>

        {/* Wind Card */}
        <div className="flex w-full max-w-[460px] gap-4 rounded-xl border border-gray-200 bg-white p-4">
          <div className="h-[90px] w-[90px] rounded bg-gray-200"></div>

          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-bold">Wind & Pressure</h2>

            <p className="text-sm text-gray-500">10 km/h • 1013 hPa</p>

            <p className="text-base leading-relaxed text-gray-900">
              Directional micro-visualization with gentle glow shifts aligned to
              wind intensity.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="rounded bg-gray-100 px-2 py-1 text-xs">
                Gusts 16 km/h
              </span>

              <span className="rounded bg-gray-100 px-2 py-1 text-xs">
                Visibility 12 km
              </span>
            </div>

            <div className="flex gap-4 text-lg">
              <span>☀️</span>
              <span>🌬️</span>
              <span>💧</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}