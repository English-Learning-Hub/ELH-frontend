import { cn } from "@/lib/utils"
import React from "react"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="skeleton"
    className={cn("bg-accent animate-pulse rounded-md", className)}
    {...props} />
))
Skeleton.displayName = "Skeleton"

export { Skeleton }


