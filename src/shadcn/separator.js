"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "../lib/utils"

const Separator = React.forwardRef(
  (
    { className, orientation = "horizontal", text, decorative = true, ...props },
    ref
  ) => (
    <div className="relative flex items-center">
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          "shrink-0 bg-border dark:bg-white",
          orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
          className
        )}
        {...props}
      />
      {text && (
        <span className="absolute px-2 text-sm whitespace-nowrap bg-white dark:bg-black left-1/2 -translate-x-1/2">
          {text}
        </span>
      )}
    </div>
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
