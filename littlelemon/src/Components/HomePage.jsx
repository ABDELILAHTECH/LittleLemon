import HeroSection from "./HeroSection"
import MainLayout from "./MainLayout"
import Specials from "./Specials"
import CustomersSay from "./CustomersSay"
import AboutSection from "./AboutSection"
export default function HomePage() {
  return (
    <MainLayout>
       <HeroSection />
       <Specials />
       <CustomersSay />
       <AboutSection />
    </MainLayout>
  )
}

