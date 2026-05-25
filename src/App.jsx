import NowSection from './component/sections/NowSection'
import HourlyForecast from './component/sections/HourlyForecast'
import SevenDayForecast from './component/sections/SevenDayForecast'

function App() {
  return (
    <main className="overflow-hidden bg-gray-100">
      <NowSection />

      <HourlyForecast />

      <SevenDayForecast />
    </main>
  )
}

export default App