import Features from "../components/Features"
import Hero from "../components/Hero"
import PopularHero from "../components/PopularHero"


const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <Features />
      <PopularHero />
    </div>
  )
}

export default Home