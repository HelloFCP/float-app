'use client'

import { useState } from 'react'
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { TypeIcon as type, type LucideIcon } from 'lucide-react'

interface InsuranceCardProps {
  title: string
  icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>
  href: string
}

export function InsuranceCard({ title, icon: Icon, href }: InsuranceCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={href}>
      <Card 
        className={`transition-all duration-300 ease-in-out ${
          isHovered ? 'bg-[#564cf9] text-white' : 'bg-white text-black'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Icon className={`h-8 w-8 mb-2 ${isHovered ? 'text-white' : 'text-black'}`} />
          <span className="text-sm font-medium text-center">{title}</span>
        </CardContent>
      </Card>
    </Link>
  )
}

