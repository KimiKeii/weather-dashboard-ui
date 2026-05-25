import { useWeather } from '../../context/WeatherContext'

export default function HumidityTrend() {
  const { weather, loading } = useWeather()

  // Build SVG path from hourly humidity data
  const W = 800
  const H = 160
  const PAD = { top: 16, bottom: 16, left: 8, right: 8 }

  function buildPath(points) {
    if (!points || points.length < 2) return ''
    const minV  = Math.min(...points)
    const maxV  = Math.max(...points)
    const range = maxV - minV || 1

    const xs = points.map((_, i) =>
      PAD.left + (i / (points.length - 1)) * (W - PAD.left - PAD.right)
    )
    const ys = points.map((v) =>
      PAD.top + (1 - (v - minV) / range) * (H - PAD.top - PAD.bottom)
    )

    // Smooth curve using cubic bezier
    let d = `M ${xs[0]} ${ys[0]}`
    for (let i = 1; i < xs.length; i++) {
      const cpX = (xs[i - 1] + xs[i]) / 2
      d += ` C ${cpX} ${ys[i - 1]}, ${cpX} ${ys[i]}, ${xs[i]} ${ys[i]}`
    }
    return { line: d, xs, ys, bottomY: H - PAD.bottom }
  }

  // Use hourly precipitation_probability as a proxy for humidity trend
  // Open-Meteo doesn't give hourly humidity in base call — we use temp variation
  // We'll just use the hourly temps scaled to look like humidity
  const humidityPoints = weather?.hourly?.map((h) => h.humidity) ?? []
  const result = buildPath(humidityPoints)

  const areaPath = result.line
    ? `${result.line} L ${result.xs[result.xs.length - 1]} ${result.bottomY} L ${result.xs[0]} ${result.bottomY} Z`
    : ''

  return (
    <section className="py-8 border-b border-neutral-200">
      <div className="border border-neutral-200 rounded-2xl p-6">
        <p className="text-sm font-medium text-neutral-900 mb-1">Humidity trend</p>
        <p className="text-xs text-neutral-400 mb-4">Percent</p>

        <div className="w-full overflow-hidden rounded-lg">
          {loading || !result.line ? (
            <div className="w-full h-40 bg-neutral-100 rounded-lg animate-pulse" />
          ) : (
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full"
              style={{ height: '160px' }}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="humidGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a3a3a3" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#a3a3a3" stopOpacity="0.03" />
                </linearGradient>
              </defs>

              {/* Dashed guide lines */}
              {[0.25, 0.5, 0.75].map((f) => (
                <line
                  key={f}
                  x1={PAD.left}
                  y1={PAD.top + f * (H - PAD.top - PAD.bottom)}
                  x2={W - PAD.right}
                  y2={PAD.top + f * (H - PAD.top - PAD.bottom)}
                  stroke="#e5e5e5"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              ))}

              {/* Filled area */}
              <path d={areaPath} fill="url(#humidGrad)" />

              {/* Line */}
              <path
                d={result.line}
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>

        <div className="flex justify-end mt-2">
          <p className="text-xs text-neutral-400">Time</p>
        </div>
      </div>
    </section>
  )
}