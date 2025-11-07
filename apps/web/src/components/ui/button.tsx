import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[28px] text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transition-all duration-200",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-b text-white shadow-[0px_10px_22px_rgba(35,21,97,0.14)] hover:shadow-[0px_14px_28px_rgba(35,21,97,0.18)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.995]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-elevation-2 hover:shadow-elevation-1",
        outline:
          "border border-[rgba(168,163,193,0.12)] bg-white text-deep-violet hover:bg-[rgba(168,163,193,0.04)] shadow-sm hover-elevate active-elevate-2",
        secondary: 
          "bg-white/20 text-white border border-white/10 hover:bg-white/30 shadow-sm",
        ghost: 
          "border border-transparent hover:bg-accent/10",
      },
      size: {
        default: "min-h-12 px-6 py-3",
        sm: "min-h-10 rounded-[20px] px-4 text-xs",
        lg: "min-h-14 rounded-[28px] px-8",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }