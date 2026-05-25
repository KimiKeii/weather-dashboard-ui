import { useState } from 'react'

const tabs = ['Today', 'Hourly', '7-Day']

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState('Today')

  return (
    <section className="bg-neutral-700 rounded-2xl my-6 px-10 py-12 flex items-center justify-between gap-10 min-h-[260px]">

      {/* Left content */}
      <div className="flex flex-col gap-5 flex-1">

        {/* Headline */}
        <div>
          <h1 className="text-3xl font-semibold text-white tracking-tight leading-snug">
            Sunny in your area
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Feels like 28°C · Humidity 42% · Wind 16 km/h
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-white border border-neutral-500 rounded-md hover:bg-neutral-600 transition-colors">
            Change location
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-white text-neutral-900 rounded-md hover:bg-neutral-100 transition-colors">
            View details
          </button>
        </div>

        {/* Tab pills */}
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

      {/* Right — image placeholder */}
      <div className="w-64 h-44 rounded-xl bg-neutral-600 flex-shrink-0 flex items-center justify-center">
        <span className="text-neutral-500 text-xs">weather visual</span>
      </div>

    </section>
  )
}