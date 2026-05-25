import { useState, useRef, useEffect } from 'react'
import { useWeather } from '../../context/WeatherContext'

// All searchable sections — label is what the user sees, href is the scroll target
const SECTIONS = [
  { label: 'Forecast',              href: '#forecast',  keywords: ['forecast', 'humidity', 'trend', 'hourly'] },
  { label: 'Air & Atmosphere',      href: '#air',       keywords: ['air', 'atmosphere', 'uv', 'wind', 'pressure', 'visibility', 'dew', 'humidity'] },
  { label: 'Maps & Weather Charts', href: '#maps',      keywords: ['maps', 'precipitation', 'conditions', 'charts', 'identity'] },
  { label: 'Current Weather',       href: '#hero',      keywords: ['current', 'now', 'today', 'temperature', 'sunny', 'rain', 'location'] },
]

const NAV_LINKS = [
  { label: 'Forecast', href: '#forecast' },
  { label: 'Air',      href: '#air'      },
  { label: 'Statistics', href: '#maps'     },
]

export default function Navbar() {
  const { location } = useWeather()
  const [searchOpen, setSearchOpen]   = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [results, setResults]         = useState([])
  const inputRef = useRef(null)

  // Filter sections as user types
  useEffect(() => {
    const q = searchValue.trim().toLowerCase()
    if (!q) { setResults([]); return }
    const matched = SECTIONS.filter(({ label, keywords }) =>
      label.toLowerCase().includes(q) ||
      keywords.some((k) => k.includes(q))
    )
    setResults(matched)
  }, [searchValue])

  function handleScroll(e, href) {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handleResultClick(href) {
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setSearchValue('')
    setResults([])
    setSearchOpen(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      setSearchValue('')
      setResults([])
      setSearchOpen(false)
    }
    if (e.key === 'Enter' && results.length > 0) {
      handleResultClick(results[0].href)
    }
  }

  function openSearch() {
    setSearchOpen(true)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  return (
    <header className="sticky top-0 z-50 flex items-center gap-8 px-10 h-14 bg-white border-b border-neutral-200">

      {/* Brand */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="flex items-center gap-2 font-medium text-sm tracking-tight flex-shrink-0 hover:opacity-70 transition-opacity"
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-neutral-700">
          <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6 10.5c1-2 3-3.5 4-3.5s3 1.5 4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span>Weather</span>
        {location?.name && (
          <span className="text-neutral-400 font-normal">— {location.name}</span>
        )}
      </button>

      {/* Nav links */}
      <nav className="flex items-center gap-7 ml-auto">
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            onClick={(e) => handleScroll(e, href)}
            className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            {label}
          </a>
        ))}
      </nav>

      {/* Search */}
      <div className="relative flex items-center ml-2">
        {searchOpen ? (
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search sections…"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => {
                // Delay so click on result registers first
                setTimeout(() => {
                  if (!searchValue) {
                    setSearchOpen(false)
                    setResults([])
                  }
                }, 150)
              }}
              className="w-52 px-3 py-1.5 text-sm border border-neutral-300 rounded-md outline-none focus:border-neutral-500 transition-colors"
            />

            {/* Dropdown results */}
            {results.length > 0 && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-white border border-neutral-200 rounded-lg shadow-md overflow-hidden z-50">
                {results.map(({ label, href }) => (
                  <button
                    key={href}
                    onMouseDown={() => handleResultClick(href)}
                    className="w-full text-left px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors flex items-center gap-2"
                  >
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="text-neutral-400 flex-shrink-0">
                      <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    {label}
                  </button>
                ))}
              </div>
            )}

            {/* No results */}
            {searchValue && results.length === 0 && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-white border border-neutral-200 rounded-lg shadow-md z-50">
                <p className="px-4 py-2.5 text-sm text-neutral-400">No sections found</p>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={openSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-md transition-colors"
          >
            <span>Search in site</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
    </header>
  )
}