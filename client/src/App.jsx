import Features from "./components-temp/Features";
import Hero from "./components-temp/Hero";
import PopularHero from "./components-temp/PopularHero";
import LoginSignup from "./components-temp/LoginSignup"

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
