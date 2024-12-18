'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const manufacturers = [
  { name: 'Boeing', logo: '//logotyp.us/file/boeing.svg' },
  { name: 'Airbus', logo: '//logotyp.us/file/airbus.svg' },
  { name: 'Embraer', logo: '//logotyp.us/file/embraer.svg' },
  { name: 'Bombardier', logo: '//logotyp.us/file/bombardier.svg' },
  { name: 'Gulfstream Aerospace', logo: '//logotyp.us/file/gulfstream.svg' },
  { name: 'Cessna (Textron Aviation)', logo: '//logotyp.us/file/cessna.svg' },
  { name: 'Dassault Aviation', logo: '//logotyp.us/file/dassault-aviation.svg' },
  { name: 'Beechcraft (Textron Aviation)', logo: '//logotyp.us/file/beechcraft.svg' },
  { name: 'Piper Aircraft', logo: '//logotyp.us/file/piper.svg' },
  { name: 'Sikorsky (Lockheed Martin)', logo: '//logotyp.us/file/lockheed-martin.svg' },
]

export function ManufacturerLogos() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isScrollable, setIsScrollable] = useState(false)

  useEffect(() => {
    const checkScrollable = () => {
      if (scrollRef.current) {
        setIsScrollable(scrollRef.current.scrollWidth > scrollRef.current.clientWidth)
      }
    }

    checkScrollable()
    window.addEventListener('resize', checkScrollable)
    return () => window.removeEventListener('resize', checkScrollable)
  }, [])

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">We work with the Manufacturers you love</h2>
        <div 
          ref={scrollRef}
          className={`flex flex-wrap justify-start ${isScrollable ? 'overflow-x-auto' : ''} -mx-4`}
        >
          {manufacturers.map((manufacturer, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex-shrink-0 px-4 mb-8 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 transition-opacity duration-300 hover:opacity-100 group">
                    <div className="h-24 flex items-center justify-center">
                      <Image
                        src={manufacturer.logo}
                        alt={`${manufacturer.name} logo`}
                        width={180}
                        height={90}
                        className="w-auto h-full max-h-24 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{manufacturer.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </section>
  )
}

