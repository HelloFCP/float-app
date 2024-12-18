import { cn } from "@/lib/utils"

interface ComingSoonTagProps {
  className?: string
}

export function ComingSoonTag({ className }: ComingSoonTagProps) {
  return (
    <span className={cn(
      "inline-block text-xs font-medium bg-blue-100 text-blue-800 rounded-full px-2 py-0.5 ml-2",
      className
    )}>
      Coming Soon
    </span>
  )
}

