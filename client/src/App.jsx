import Features from "./components/Features";
import Hero from "./components/Hero";
import PopularHero from "./components/PopularHero";
import LoginSignup from "./components/LoginSignup"

function App() {
  return (
    <div className="bg-main font-medium w-full ">
      <Hero />
      <Features />
      <PopularHero />
      <LoginSignup/>
    </div>
  );
}

export default App;
