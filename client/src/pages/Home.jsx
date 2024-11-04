import Features from "../components/Features"
import Hero from "../components/Hero"
import PopularHero from "../components/PopularHero"
import Testimonials from "../components/Testimonials"


const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <Features />
      <PopularHero />
      <Testimonials/>
    </div>
  )
}

export default Home