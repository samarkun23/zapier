"use client"
import { cva, type VariantProps } from "class-variance-authority"
import React from "react"
import { cn } from "@/lib/fonts/utils"


export const buttonVarients = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap  font-medium",
    {
        variants: {
            variant: {
                primary: "bg-blue-600 text-white hover:bg-blue-700 rounded-md",
                secondary: "relative px-6 py-3 text-black bg-white border-1 rounded-md border-black rounded-md cursor-pointer shadow-[0_0_10px_2px_rgba(255,255,255,255)]",
                secondaryBlack: "bg-black text-white rounded-md",
                nav: "bg-none text-white border-none transition duration-300 hover:text-white/70 rounded-md",
                darkButton: "bg-none border border-green-300 rounded-2xl"
            },
            size: {
                default: 'h-9 px-4 py-2 text-xl',
                sm: 'h-7 px-2 text-sm',
                lg: 'h-10 rounded-md px-6 text-md',
                icon: 'size-8'
            }
        },
        defaultVariants: {
            variant: "primary"
        }
    }
)

type ButtonProps = React.ComponentProps<"button"> & VariantProps<typeof buttonVarients> & {
    children: React.ReactNode,
    onClick?: () => void,
    variant?: "primary" | "secondary" | "secondaryBlack" | "nav" | "darkButton",
}

function Button({
    children,
    onClick,
    variant,
    size = 'default',
    className,
    ...props
}: ButtonProps) {

    const classes = buttonVarients({ variant })
    console.log(classes);
    return (
        <button className={cn(buttonVarients({ variant, size }), className)} {...props} onClick={onClick} >
            {children}
        </button>
    )
}

export { Button }