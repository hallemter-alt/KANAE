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
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${maxWidthClasses[maxWidth]} ${className}`}>
      {children}
    </div>
  )
}

interface SectionProps {
  children: React.ReactNode
  className?: string
  background?: 'white' | 'gray' | 'primary' | 'gradient'
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Section({ 
  children, 
  className = '', 
  background = 'white',
  spacing = 'lg'
}: SectionProps) {
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    primary: 'bg-blue-50',
    gradient: 'bg-gradient-to-br from-blue-50 to-purple-50',
  }

  const spacingClasses = {
    sm: 'py-8 sm:py-12',
    md: 'py-12 sm:py-16',
    lg: 'py-16 sm:py-24',
    xl: 'py-24 sm:py-32',
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
  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  const sizeClasses = {
    1: 'text-4xl sm:text-5xl lg:text-6xl font-black',
    2: 'text-3xl sm:text-4xl lg:text-5xl font-bold',
    3: 'text-2xl sm:text-3xl lg:text-4xl font-bold',
    4: 'text-xl sm:text-2xl lg:text-3xl font-bold',
    5: 'text-lg sm:text-xl lg:text-2xl font-medium',
    6: 'text-base sm:text-lg lg:text-xl font-medium',
  }

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <Tag className={`${sizeClasses[level]} ${alignClasses[align]} text-gray-900 ${className}`}>
      {children}
    </Tag>
  )
}

interface TextProps {
  children: React.ReactNode
  className?: string
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
  color?: 'gray' | 'dark' | 'light' | 'primary'
}

export function Text({ children, className = '', size = 'base', color = 'gray' }: TextProps) {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  }

  const colorClasses = {
    gray: 'text-gray-600',
    dark: 'text-gray-900',
    light: 'text-gray-400',
    primary: 'text-blue-600',
  }

  return (
    <p className={`${sizeClasses[size]} ${colorClasses[color]} leading-relaxed ${className}`}>
      {children}
    </p>
  )
}

interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  shadow?: boolean
  hover?: boolean
}

export function Card({ 
  children, 
  className = '', 
  padding = 'md', 
  shadow = true,
  hover = false 
}: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  }

  return (
    <div 
      className={`
        bg-white rounded-xl 
        ${paddingClasses[padding]}
        ${shadow ? 'shadow-lg' : ''}
        ${hover ? 'hover:shadow-xl transition-shadow duration-200' : ''}
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
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md',
    secondary: 'bg-purple-600 text-white hover:bg-purple-700 shadow-md',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    ghost: 'text-gray-700 hover:bg-gray-100',
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <button
      className={`
        font-medium rounded-lg transition-all duration-200
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
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    gray: 'bg-gray-100 text-gray-800',
  }

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  }

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {children}
    </span>
  )
}
