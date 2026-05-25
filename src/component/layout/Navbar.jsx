import { useState } from 'react'

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  return (
    <header className="sticky top-0 z-50 flex items-center gap-8 px-10 h-14 bg-white border-b border-neutral-200">

      {/* Brand */}
      <div className="flex items-center gap-2 font-medium text-sm tracking-tight flex-shrink-0">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-neutral-700">
          <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6 10.5c1-2 3-3.5 4-3.5s3 1.5 4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span>Weather</span>
      </div>

      {/* Nav links */}
      <nav className="flex items-center gap-7 ml-auto">
        <a href="#forecast" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">Forecast</a>
        <a href="#air"      className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">Air</a>
        <a href="#maps"     className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">Maps</a>
      </nav>

      {/* Search */}
      <div className="flex items-center ml-2">
        {searchOpen ? (
          <input
            type="text"
            placeholder="Search in site"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onBlur={() => { if (!searchValue) setSearchOpen(false) }}
            autoFocus
            className="w-44 px-3 py-1.5 text-sm border border-neutral-300 rounded-md outline-none focus:border-neutral-500 transition-colors"
          />
        ) : (
          <button
            onClick={() => setSearchOpen(true)}
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