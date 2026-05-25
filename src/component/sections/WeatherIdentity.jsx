import { useWeather } from '../../context/WeatherContext'

// Color map per weather condition label
const CONDITION_COLORS = {
  'Clear sky':     '#FBBF24', // amber - sunny
  'Partly cloudy': '#93C5FD', // light blue - mixed
  'Overcast':      '#94A3B8', // slate - cloudy
  'Foggy':         '#CBD5E1', // light slate - fog
  'Drizzle':       '#67E8F9', // cyan - light rain
  'Rain':          '#3B82F6', // blue - rain
  'Snow':          '#BAE6FD', // ice blue - snow
  'Rain showers':  '#2563EB', // darker blue - heavy rain
  'Thunderstorm':  '#7C3AED', // purple - storm
  'Sunny':         '#F59E0B', // orange-amber - sunny
}

function getConditionColor(label) {
  return CONDITION_COLORS[label] || '#A3A3A3'
}

export default function WeatherIdentity() {
  const { weather, loading } = useWeather()

  const precipData = weather?.daily?.map((d) => ({
    day:   new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' }),
    value: d.precip ?? 0,
    label: d.label,
  })) ?? []

  const conditionCounts = weather?.daily?.reduce((acc, d) => {
    acc[d.label] = (acc[d.label] || 0) + 1
    return acc
  }, {}) ?? {}

  const conditionEntries = Object.entries(conditionCounts)
  const totalDays = conditionEntries.reduce((s, [, v]) => s + v, 0)

  const PIE_R  = 80
  const PIE_CX = 110
  const PIE_CY = 110

  function polarToXY(cx, cy, r, angleDeg) {
    const rad = ((angleDeg - 90) * Math.PI) / 180
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
  }

  function buildPieSlices() {
    let startAngle = 0
    return conditionEntries.map(([label, count]) => {
      const slice = (count / totalDays) * 360
      const end   = startAngle + slice
      const large = slice > 180 ? 1 : 0
      const s     = polarToXY(PIE_CX, PIE_CY, PIE_R, startAngle)
      const e     = polarToXY(PIE_CX, PIE_CY, PIE_R, end)
      const path  = `M ${PIE_CX} ${PIE_CY} L ${s.x} ${s.y} A ${PIE_R} ${PIE_R} 0 ${large} 1 ${e.x} ${e.y} Z`
      startAngle  = end
      return { path, color: getConditionColor(label), label, count }
    })
  }

  const pieSlices = totalDays > 0 ? buildPieSlices() : []
  const maxPrecip = Math.max(...precipData.map((d) => d.value), 1)
  const BAR_H     = 160

  return (
    <>
      <section id="maps" className="py-16 border-b border-neutral-200">
        <h2 className="text-3xl font-semibold text-center tracking-tight mb-2">
          Weather identity preview
        </h2>
        <p className="text-sm text-neutral-400 text-center mb-10">
          UI theme morphs in real-time (illustrative states)
        </p>

        <div className="grid grid-cols-2 gap-6">

          {/* Precipitation bar chart — bars colored by condition */}
          <div className="border border-neutral-200 rounded-2xl p-6">
            <p className="text-sm font-medium text-neutral-900 mb-1">Precipitation chance</p>
            <p className="text-xs text-neutral-400 mb-4">Percent</p>

            {loading ? (
              <div className="h-44 bg-neutral-100 rounded-lg animate-pulse" />
            ) : (
              <svg viewBox={`0 0 ${precipData.length * 60} ${BAR_H + 24}`} className="w-full">
                {precipData.map(({ day, value, label }, i) => {
                  const barH = Math.max((value / maxPrecip) * BAR_H, 4)
                  const x    = i * 60 + 10
                  const y    = BAR_H - barH
                  const color = getConditionColor(label)
                  return (
                    <g key={day}>
                      {/* Bar */}
                      <rect x={x} y={y} width="36" height={barH} rx="4" fill={color} opacity="0.85" />
                      {/* Percentage label on top */}
                      <text x={x + 18} y={y - 4} textAnchor="middle" fontSize="9" fill="#6b6b6b">
                        {value}%
                      </text>
                      {/* Day label below */}
                      <text x={x + 18} y={BAR_H + 16} textAnchor="middle" fontSize="11" fill="#a3a3a3">
                        {day}
                      </text>
                    </g>
                  )
                })}
              </svg>
            )}

            <div className="flex justify-end mt-1">
              <p className="text-xs text-neutral-400">Day</p>
            </div>
          </div>

          {/* Conditions pie chart — slices colored by condition */}
          <div className="border border-neutral-200 rounded-2xl p-6">
            <p className="text-sm font-medium text-neutral-900 mb-1">Conditions mix</p>
            <p className="text-xs text-neutral-400 mb-4">Share</p>

            {loading ? (
              <div className="h-44 bg-neutral-100 rounded-lg animate-pulse" />
            ) : (
              <div className="flex items-center gap-6">
                <svg viewBox="0 0 220 220" className="w-44 flex-shrink-0">
                  {pieSlices.map((s, i) => (
                    <path key={i} d={s.path} fill={s.color} opacity="0.9" />
                  ))}
                  {/* Donut hole */}
                  <circle cx={PIE_CX} cy={PIE_CY} r="36" fill="white" />
                </svg>

                {/* Legend */}
                <div className="flex flex-col gap-2">
                  {pieSlices.map((s, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ background: s.color }}
                      />
                      <span className="text-xs text-neutral-500">
                        {s.label} ({s.count}d)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end mt-1">
              <p className="text-xs text-neutral-400">Categories</p>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center">
        <p className="text-sm text-neutral-400">© YourWeather Studio</p>
      </footer>
    </>
  )
}