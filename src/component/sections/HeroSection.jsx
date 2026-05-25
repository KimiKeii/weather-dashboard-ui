import { useState, useEffect, useRef } from 'react'
import { useWeather } from '../../hooks/useWeather'

const tabs = ['Today', 'Hourly', '7-Day']

function bezier(t, p0, p1, p2) {
  const mt = 1 - t
  return mt * mt * p0 + 2 * mt * t * p1 + t * t * p2
}

function getSunProgress(sunrise, sunset) {
  if (!sunrise || !sunset) return 0.5
  const now  = Date.now()
  const rise = new Date(sunrise).getTime()
  const set  = new Date(sunset).getTime()
  if (now <= rise) return 0
  if (now >= set)  return 1
  return (now - rise) / (set - rise)
}

function fmtTime(iso) {
  if (!iso) return '--:--'
  return iso.slice(11, 16)
}

export default function HeroSection() {
  const { weather, loading, error, changeCity } = useWeather()
  const [activeTab, setActiveTab] = useState('Today')
  const [cityInput, setCityInput] = useState('')
  const [showInput, setShowInput] = useState(false)

  // animatedT goes from 0 → realProgress over ANIM_DURATION ms on load/city change
  const [animatedT, setAnimatedT] = useState(0)
  const animRef    = useRef(null)
  const startRef   = useRef(null)
  const targetRef  = useRef(0)

  const ANIM_DURATION = 2000 // ms to travel from sunrise → current position

  useEffect(() => {
    if (!weather?.daily?.[0]) return

    const { sunrise, sunset } = weather.daily[0]
    const realProgress = getSunProgress(sunrise, sunset)
    targetRef.current  = realProgress

    // Cancel any previous animation
    if (animRef.current) cancelAnimationFrame(animRef.current)
    startRef.current = null
    setAnimatedT(0)

    function animate(timestamp) {
      if (!startRef.current) startRef.current = timestamp
      const elapsed  = timestamp - startRef.current
      const fraction = Math.min(elapsed / ANIM_DURATION, 1)

      // Ease out cubic: starts fast, slows to a stop at the real position
      const eased = 1 - Math.pow(1 - fraction, 3)
      const t     = eased * realProgress

      setAnimatedT(t)

      if (fraction < 1) {
        animRef.current = requestAnimationFrame(animate)
      }
    }

    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [weather?.daily?.[0]?.sunrise, weather?.daily?.[0]?.sunset])

  const sunX = bezier(animatedT, 20, 140, 260)
  const sunY = bezier(animatedT, 140, 5, 140)

  function handleChangeLocation(e) {
    e.preventDefault()
    if (cityInput.trim()) {
      changeCity(cityInput.trim())
      setCityInput('')
      setShowInput(false)
    }
  }

  const today   = weather?.daily?.[0]
  const sunrise = today?.sunrise
  const sunset  = today?.sunset

  return (
    <section className="bg-neutral-700 rounded-2xl my-6 px-10 py-12 flex items-center justify-between gap-10 min-h-[260px]">

      {/* ── Left ── */}
      <div className="flex flex-col gap-5 flex-1">
        <div>
          {loading ? (
            <div className="h-9 w-64 bg-neutral-600 rounded-lg animate-pulse" />
          ) : error ? (
            <p className="text-red-400 text-sm">{error}</p>
          ) : (
            <>
              <h1 className="text-3xl font-semibold text-white tracking-tight leading-snug">
                {weather.condition} in {weather.city} {weather.emoji}
              </h1>
              <p className="text-sm text-neutral-400 mt-1">
                Feels like {weather.feelsLike}°C · Humidity {weather.humidity}% · Wind {weather.windSpeed} km/h
              </p>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          {showInput ? (
            <form onSubmit={handleChangeLocation} className="flex items-center gap-2">
              <input
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                placeholder="Enter city name…"
                autoFocus
                className="px-3 py-2 text-sm rounded-md bg-neutral-600 text-white placeholder-neutral-400 border border-neutral-500 outline-none focus:border-white transition-colors"
              />
              <button type="submit" className="px-4 py-2 text-sm font-medium bg-white text-neutral-900 rounded-md hover:bg-neutral-100 transition-colors">
                Go
              </button>
              <button type="button" onClick={() => setShowInput(false)} className="px-3 py-2 text-sm text-neutral-400 hover:text-white transition-colors">
                Cancel
              </button>
            </form>
          ) : (
            <>
              <button onClick={() => setShowInput(true)} className="px-4 py-2 text-sm font-medium text-white border border-neutral-500 rounded-md hover:bg-neutral-600 transition-colors">
                Change location
              </button>
              <button className="px-4 py-2 text-sm font-medium bg-white text-neutral-900 rounded-md hover:bg-neutral-100 transition-colors">
                View details
              </button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-xs font-medium rounded-full transition-colors ${
                activeTab === tab
                  ? 'bg-white text-neutral-900'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Right: sun arc ── */}
      <div className="w-72 h-48 flex-shrink-0 relative">
        <svg viewBox="0 0 280 160" className="absolute inset-0 w-full h-full" overflow="visible">

          {/* Full arc — faint dashed guide */}
          <path
            d="M 20 140 Q 140 5 260 140"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />

          {/* Horizon line */}
          <line x1="10" y1="140" x2="270" y2="140" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />

          {/* Sunrise dot */}
          <circle cx="20" cy="140" r="3.5" fill="rgba(251,191,36,0.9)" />
          {/* Sunset dot */}
          <circle cx="260" cy="140" r="3.5" fill="rgba(251,191,36,0.35)" />

          {/* Travelled arc — amber, grows as sun moves */}
          {!loading && (
            <path
              d="M 20 140 Q 140 5 260 140"
              fill="none"
              stroke="rgba(251,191,36,0.6)"
              strokeWidth="2"
              strokeDasharray="400"
              strokeDashoffset={400 - 400 * animatedT}
            />
          )}

          {/* Glow behind sun */}
          {!loading && (
            <circle cx={sunX} cy={sunY} r="20" fill="rgba(251,191,36,0.1)" />
          )}

          {/* Sun emoji */}
          {loading ? (
            <circle cx="20" cy="140" r="12" fill="rgba(251,191,36,0.25)" />
          ) : (
            <text
              x={sunX}
              y={sunY}
              fontSize="26"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {weather?.emoji ?? '☀️'}
            </text>
          )}
        </svg>

        {/* Labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-1">
          <p className="text-xs text-white">Sunrise {fmtTime(sunrise)}</p>
          <p className="text-xs text-white">Sunset {fmtTime(sunset)}</p>
        </div>
      </div>

    </section>
  )
}