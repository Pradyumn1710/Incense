"use client"
import { useState } from "react"
import Spline from "@splinetool/react-spline"
import { ArrowRight } from "lucide-react"
// import { Button } from "@/components/ui/button"
import { TypeAnimation } from "react-type-animation"

export default function HeroHeader() {
  const [isLoading, setIsLoading] = useState(true)
  const splineUrl = "https://prod.spline.design/0YRkKdvCBVUz0O5T/scene.splinecode"

  return (
    <section className="w-full bg-[#0a192f] text-white overflow-hidden pt-20 md:pt-16">
      <div className="container mx-auto px-4 py-12 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="space-y-8 relative z-20 mt-4 sm:mt-0">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight font-bold bg-gradient-to-r from-[#64ffda] via-purple-400 to-pink-400 bg-clip-text text-transparent relative z-10">
              BreatheSafe
            </h1>

            {/* Type Animation */}
            <TypeAnimation
              sequence={[
                "Monitor. Protect. Breathe Safe.",  
                1000,
                "Incense Without the Compromise.",  
                1000,
                "Smart Sensing for a Safer Space.",  
                1000
              ]}
              wrapper="p"
              speed={50}
              className="text-xl sm:text-2xl md:text-3xl text-blue-200 font-medium"
              repeat={Infinity}
            />

            {/* CTA Button */}
            {/* <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 rounded-md text-lg font-medium transition-all duration-300 flex items-center gap-2 h-auto">
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Button> */}
          </div>

          {/* Spline 3D Element */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <Spline 
              scene={splineUrl} 
              onLoad={() => setIsLoading(false)} 
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
