import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={[
        'inline-flex cursor-pointer items-center justify-center rounded-lg bg-gradient-to-b from-accent to-accent-strong text-sm font-semibold text-accent-ink shadow-sm transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:cursor-not-allowed disabled:opacity-70 touch-manipulation',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}
