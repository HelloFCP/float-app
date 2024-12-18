import { FC } from 'react'
import { cn } from "@/lib/utils"
import { Orbitron } from 'next/font/google'

const orbitron = Orbitron({ subsets: ['latin'], weight: ['700'] })

interface FloatLogoProps {
  className?: string
}

export const FloatLogo: FC<FloatLogoProps> = ({ className }) => {
  return (
    <span className={cn(`${orbitron.className} font-bold text-2xl text-[#564cf9]`, className)}>
      Float
    </span>
  )
}

