import { Button } from "@/components/ui/button"
import { AirplaneIcon } from "./custom-icons"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Explore Your Path to Aircraft Ownership
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Discover financing and refinancing options for a wide range of aircraft, tailored to your needs. From fixed-wing aircraft to specialized drones, we've got you covered.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg">
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <AirplaneIcon className="h-24 w-24 text-blue-500 opacity-20" />
      </div>
    </section>
  )
}

