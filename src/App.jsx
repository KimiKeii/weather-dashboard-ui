import { WeatherProvider } from './context/WeatherContext'
import Navbar from './component/layout/Navbar'
import Layout from './component/layout/Layout'
import HeroSection from './component/sections/HeroSection'
import NowSection from './component/sections/NowSection'
import HourlyForecast from './component/sections/HourlyForecast'
import AtmosphereDetails from './component/sections/AtmosphereDetails'
import HumidityTrend from './component/sections/HumidityTrend'
import SevenDayForecast from './component/sections/SevenDayForecast'
import LocationSearch from './component/sections/LocationSearch'
import WeatherIdentity from './component/sections/WeatherIdentity'

export default function App() {
  return (
    <WeatherProvider>
      <div className="min-h-screen bg-white text-neutral-900 antialiased">
        <Navbar />
        <Layout>
          <HeroSection />
          <NowSection />
          <HourlyForecast />
          <AtmosphereDetails />
          <HumidityTrend />
          <SevenDayForecast />
          <LocationSearch />
          <WeatherIdentity />
        </Layout>
      </div>
    </WeatherProvider>
  )
}