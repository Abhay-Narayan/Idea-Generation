import mask from '../assets/mask.png'
import aimage from '../assets/aimage2.png'

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-purple-800 to-main flex h-screen items-center justify-center mx-auto w-full text-white relative overflow-hidden">
      <img src={mask} className='absolute -left-10 -top-10'  />
      <img src={mask} className='absolute -bottom-14 -right-10 rotate-180'  />
      <div className="flex flex-col justify-center w-[45%] gap-6">
        <h1 className="font-bold text-5xl leading-snug">Empower Your Ideas<br/> with AI-Driven Project Guidance </h1>
        <p className="text-lg font-light w-[90%]">Whether you&apos;re an aspiring developer or an experienced professional, our AI-powered platform helps you craft and shape your ideas with personalized insights, implementation tips, and business-focused summaries. Share your journey, engage with others, and watch your concepts come to life.</p>
        <div className="flex items-center gap-2 text-base justify-start" >
          <button className="btn p-2 border border-white rounded-md text-white shadow-lg hover:scale-105 transform transition duration-300" >Get started</button>
          <button className="btn p-2 bg-white text-main rounded-md shadow-lg hover:scale-105 transform transition duration-300" >Learn More</button>
        </div>
      </div> 
      <div className="w-[40%] flex items-center justify-end ">
        <img className="w-[450px] h-[450px] rounded-lg brightness-95 transform scale-x-[-1]" src={aimage} alt="" />
      </div>
     </div>
  )
}

export default Hero