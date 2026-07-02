import React from 'react'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}

export function Container({ children, className = '', maxWidth = 'xl' }: ContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
  }

  return (
    <div className={`mx-auto px-5 sm:px-8 lg:px-10 ${maxWidthClasses[maxWidth]} ${className}`}>
      {children}
    </div>
  )
}

interface SectionProps {
  children: React.ReactNode
  className?: string
  background?: 'white' | 'gray' | 'primary' | 'gradient'
  spacing?: 'sm' | 'md' | 'lg' | 'xl' | 'hero'
}

export function Section({
  children,
  className = '',
  background = 'white',
  spacing = 'lg'
}: SectionProps) {
  // 静かな配色 — 和紙 / 亜麻 / 墨
  const backgroundClasses = {
    white: 'bg-washi texture-paper',
    gray: 'bg-gold-50 texture-paper',
    primary: 'bg-ink text-washi',
    gradient: 'bg-ink text-washi',
  }

  const spacingClasses = {
    sm: 'py-10 sm:py-14',
    md: 'py-14 sm:py-20',
    lg: 'py-20 sm:py-28',
    xl: 'py-24 sm:py-36',
    hero: 'pt-36 pb-20 sm:pt-44 sm:pb-28',
  }

  return (
    <section className={`${backgroundClasses[background]} ${spacingClasses[spacing]} ${className}`}>
      {children}
    </section>
  )
}

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  className?: string
  align?: 'left' | 'center' | 'right'
}

export function Heading({ level = 2, children, className = '', align = 'left' }: HeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

  const sizeClasses = {
    1: 'text-3xl sm:text-4xl lg:text-5xl',
    2: 'text-2xl sm:text-3xl lg:text-4xl',
    3: 'text-xl sm:text-2xl lg:text-3xl',
    4: 'text-lg sm:text-xl',
    5: 'text-base sm:text-lg',
    6: 'text-base',
  }

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <Tag className={`font-serif ${sizeClasses[level]} ${alignClasses[align]} ${className}`}>
      {children}
    </Tag>
  )
}

interface TextProps {
  children: React.ReactNode
  className?: string
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
  color?: 'gray' | 'dark' | 'light' | 'primary'
  weight?: 'normal' | 'medium' | 'bold'
}

export function Text({ children, className = '', size = 'base', color = 'gray', weight = 'normal' }: TextProps) {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  }

  const colorClasses = {
    gray: 'text-ink/70',
    dark: 'text-ink',
    light: 'text-ink/50',
    primary: 'text-gold-700',
  }

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    bold: 'font-bold',
  }

  return (
    <p className={`${sizeClasses[size]} ${colorClasses[color]} ${weightClasses[weight]} leading-loose ${className}`}>
      {children}
    </p>
  )
}

interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  shadow?: boolean
  hover?: boolean
}

export function Card({
  children,
  className = '',
  padding = 'md',
  shadow = false,
  hover = false
}: CardProps) {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8 md:p-10',
    xl: 'p-10 md:p-12',
  }

  return (
    <div
      className={`
        bg-white/70 border hairline
        ${paddingClasses[padding]}
        ${shadow ? 'shadow-sm' : ''}
        ${hover ? 'hover:bg-white transition-colors duration-700' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: 'bg-ink text-washi hover:bg-gold-800',
    secondary: 'bg-gold-600 text-washi hover:bg-gold-700',
    outline: 'border border-ink/40 text-ink hover:bg-ink hover:text-washi',
    ghost: 'text-ink/70 hover:bg-ink/5',
  }

  const sizeClasses = {
    sm: 'px-5 py-2 text-xs',
    md: 'px-7 py-3 text-sm',
    lg: 'px-9 py-4 text-sm',
  }

  return (
    <button
      className={`
        tracking-[0.15em] transition-all duration-500
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'gray'
  size?: 'sm' | 'md' | 'lg'
}

export function Badge({ children, variant = 'primary', size = 'md' }: BadgeProps) {
  const variantClasses = {
    primary: 'bg-mist-light/40 text-mist-dark',
    success: 'bg-pine-pale/30 text-pine-deep',
    warning: 'bg-gold-200/60 text-gold-800',
    error: 'bg-red-100 text-red-800',
    gray: 'bg-ink/5 text-ink/70',
  }

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm',
  }

  return (
    <span className={`inline-flex items-center tracking-wider ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {children}
    </span>
  )
}
