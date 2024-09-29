import { cn } from "../lib/utils"

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-current opacity-40 ", className)}
      {...props}
    />
  )
}

export { Skeleton }
