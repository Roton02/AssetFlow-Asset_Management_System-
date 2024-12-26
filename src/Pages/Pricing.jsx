import { Link } from "react-router-dom"

const Pricing = () => {
  return (
    <div className='w-full bg1'>
<main className="max-w-6xl mx-auto pt-10 pb-36 px-8">
  
  <div className="max-w-xl mx-auto mb-14 text-center">
    <h1 className="text-4xl font-semibold mb-6 lg:text-5xl"><span className="text-purple">Flexible</span> Plans</h1>
    <p className="text-xl text-gray-500 font-medium">Choose a plan that works best for you and your team.</p>
  </div>
  
  <div className="flex flex-col justify-between items-center lg:flex-row lg:items-start">
    
    <div className="w-full flex-1 mt-8 p-8 order-2 bg-white shadow-xl rounded-3xl sm:w-96 lg:w-full lg:order-1 lg:rounded-r-none">
      <div className="mb-7 pb-7 flex items-center border-b border-gray-300">
        <img src="https://res.cloudinary.com/williamsondesign/abstract-1.jpg"  alt="" className="rounded-3xl w-20 h-20" />
        <div className="ml-5">
          <span className="block text-2xl font-semibold">Basic</span>
          <span><span className="font-medium text-gray-500 text-xl align-top">$&thinsp;</span><span className="text-3xl font-bold">5$ </span></span><span className="text-gray-500 font-medium">/ month</span>
        </div>
      </div>
      <ul className="mb-7 font-medium text-gray-500">
        <li className="flex text-lg mb-2">
          <img src="https://res.cloudinary.com/williamsondesign/check-grey.svg" />
          <span className="ml-3">Get started with <span className="text-black">messaging</span></span>
        </li>
        <li className="flex text-lg mb-2">
          <img src="https://res.cloudinary.com/williamsondesign/check-grey.svg" />
          <span className="ml-3">Flexible <span className="text-black">team meetings</span></span>
        </li>
        <li className="flex text-lg">
          <img src="https://res.cloudinary.com/williamsondesign/check-grey.svg" />
          <span className="ml-3"><span className="text-black">5</span> Team Members</span>
        </li>
      </ul>
      <Link to={"/joinasadmin"} className="flex justify-center hover:scale-105 transition-all items-center grad1 rounded-xl py-5 px-4 text-center text-white text-xl">
        Choose Plan
        <img src="https://res.cloudinary.com/williamsondesign/arrow-right.svg" className="ml-2" />
      </Link>
    </div>
    
    <div className="w-full flex-1 p-8 order-1 shadow-xl rounded-3xl bg-gray-900 text-gray-400 sm:w-96 lg:w-full lg:order-2 lg:mt-0">
      <div className="mb-8 pb-8 flex items-center border-b border-gray-600">
        <img src="https://res.cloudinary.com/williamsondesign/abstract-2.jpg"  alt="" className="rounded-3xl w-20 h-20" />
        <div className="ml-5">
          <span className="block text-3xl font-semibold text-white">Startup</span>
          <span><span className="font-medium text-xl align-top">$&thinsp;</span><span className="text-3xl font-bold text-white">8$ </span></span><span className="font-medium">/ month</span>
        </div>
      </div>
      <ul className="mb-10 font-medium text-xl">
        <li className="flex mb-6">
          <img src="https://res.cloudinary.com/williamsondesign/check-white.svg" />
          <span className="ml-3">All features in <span className="text-white">Basic</span></span>
        </li>
        <li className="flex mb-6">
          <img src="https://res.cloudinary.com/williamsondesign/check-white.svg" />
          <span className="ml-3">Flexible <span className="text-white">call scheduling</span></span>
        </li>
        <li className="flex">
          <img src="https://res.cloudinary.com/williamsondesign/check-white.svg" />
          <span className="ml-3"><span className="text-white">10</span> Team Members</span>
        </li>
      </ul>
      <Link to={"/joinasadmin"} className="flex hover:scale-105 transition-all justify-center items-center grad3 rounded-xl py-6 px-4 text-center text-white text-2xl">
        Choose Plan
        <img src="https://res.cloudinary.com/williamsondesign/arrow-right.svg" className="ml-2" />
      </Link>
    </div>
    
    <div className="w-full flex-1 mt-8 p-8 order-3 bg-white shadow-xl rounded-3xl sm:w-96 lg:w-full lg:order-3 lg:rounded-l-none">
      <div className="mb-7 pb-7 flex items-center border-b border-gray-300">
        <img src="https://res.cloudinary.com/williamsondesign/abstract-3.jpg"  alt="" className="rounded-3xl w-20 h-20" />
        <div className="ml-5">
          <span className="block text-2xl font-semibold">Enterprise</span>
          <span><span className="font-medium text-gray-500 text-xl align-top">$&thinsp;</span><span className="text-3xl font-bold">15$ </span></span><span className="text-gray-500 font-medium">/ month</span>
        </div>
      </div>
      <ul className="mb-7 font-medium text-gray-500">
        <li className="flex text-lg mb-2">
          <img src="https://res.cloudinary.com/williamsondesign/check-grey.svg" />
          <span className="ml-3">All features in <span className="text-black">Startup</span></span>
        </li>
        <li className="flex text-lg mb-2">
          <img src="https://res.cloudinary.com/williamsondesign/check-grey.svg" />
          <span className="ml-3">Growth <span className="text-black">oriented</span></span>
        </li>
        <li className="flex text-lg">
          <img src="https://res.cloudinary.com/williamsondesign/check-grey.svg" />
          <span className="ml-3"><span className="text-black">20</span> Team Members</span>
        </li>
      </ul>
      <Link to={"/joinasadmin"} className="flex hover:scale-105 transition-all justify-center items-center grad2 rounded-xl py-5 px-4 text-center text-white text-xl">
        Choose Plan
        <img src="https://res.cloudinary.com/williamsondesign/arrow-right.svg" className="ml-2" />
      </Link>
    </div>
    
  </div>
  
</main>
    </div>
  )
}

export default Pricing
