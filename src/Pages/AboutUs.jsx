import AboutUsPoints from "../Components/AboutUsPoints"


const AboutUs = () => {
  return (
    <div className="min-h-screen md:h-screen w-full bg1 overflow-hidden py-5 lg:py-0">
      <div className="flex flex-col lg:flex-row contain px-2 md:px-3 lg:px-0 w-full h-full items-center gap-5 lg:gap-0">
      <div className="basis-1/2">
      <p className='px-7 md:px-10 rounded-2xl inline-block text-purple text-[1.2rem] md:text-[1.3rem] font-semibold bg-purple/30 text-left'>About Us</p>
      <h1 className="text-[1.2rem] md:text-[1.8rem] lg:text-[1.4rem] 2xl:text-[1.8rem] leading-tight font-bold mt-2">Keep track of all your company assets with ease. From laptops to paper, streamline management and enhance productivity.</h1>
      <div className="space-y-5 mt-10">
      <AboutUsPoints tag={"Streamlined Asset Tracking"} tittle={"Effortlessly monitor and manage both returnable and non-returnable assets, ensuring optimal utilization."} bg={"grad1"}/>
      <AboutUsPoints tag={"Enhanced Accountability"} tittle={"Empower HR managers to track asset usage, fostering a culture of responsibility and transparency within your organization."} bg={"grad2"}/>
      <AboutUsPoints tag={"Customized Solutions"} tittle={"Tailored to fit your specific needs, our system provides personalized asset management strategies for seamless integration into your workflow."} bg={"grad3"}/>
      </div>
      </div>
      <div className="basis-1/2 relative">
        <img src="/vector1.png" alt=""  className="absolute -top-14 moving-div z-10"/>
        <div className="p-0 lg:p-14 2xl:p-0">
        <img src="/pic5.jpg" alt=""  className="rounded-2xl relative mx-auto z-50 "/>
        </div>
        <img src="/vector2.png" alt=""  className="absolute right-6 -bottom-16 moving-div2 z-10"/>
      </div>
      </div>
    </div>
  )
}

export default AboutUs
