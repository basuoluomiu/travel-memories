"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ButtonHTMLAttributes, forwardRef } from "react"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", children, ...props }, ref) => {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-2xl font-medium",
          "transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          "disabled:pointer-events-none disabled:opacity-50",
          {
            "glass shadow-lg text-foreground hover:shadow-xl": variant === "default",
            "border-2 border-white/20 bg-transparent hover:bg-white/10": variant === "outline",
            "hover:bg-white/10": variant === "ghost",
          },
          {
            "h-10 px-6 py-2 text-sm": size === "default",
            "h-8 px-4 text-xs": size === "sm",
            "h-12 px-8 text-base": size === "lg",
          },
          className
        )}
        {...(props as any)}
      >
        {children}
      </motion.button>
    )
  }
)
Button.displayName = "Button"

export { Button }
