import NowSection from './component/sections/NowSection'
import HourlyForecast from './component/sections/HourlyForecast'
import SevenDayForecast from './component/sections/SevenDayForecast'

function App() {
  return (
    <>
      <NowSection />
      <HourlyForecast />
      <SevenDayForecast />
    </>
  )
}

export default App