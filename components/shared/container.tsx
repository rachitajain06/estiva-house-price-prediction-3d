import { cn } from '@/lib/utils'

export function Container({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 lg:py-10', className)}>
      {children}
    </div>
  )
}
