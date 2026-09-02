'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS } from '@/lib/nav'
import { MODEL_METRICS } from '@/lib/model-data'
import { LogoMark, Wordmark } from '@/components/brand/logo'
import { cn } from '@/lib/utils'

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <LogoMark />
        <span className="flex flex-col leading-none">
          <Wordmark className="text-sidebar-foreground" />
          <span className="mt-1 text-[11px] font-medium tracking-wide text-sidebar-foreground/55">
            Home Intelligence
          </span>
        </span>
      </div>

      <nav className="flex-1 px-3 py-2" aria-label="Primary">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href)
            const Icon = item.icon
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    active
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                  )}
                >
                  <Icon
                    className={cn(
                      'size-[18px] shrink-0 transition-colors',
                      active
                        ? 'text-sidebar-primary-foreground'
                        : 'text-sidebar-foreground/55 group-hover:text-sidebar-accent-foreground',
                    )}
                  />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="mx-3 mb-4 rounded-xl border border-sidebar-border bg-sidebar-accent/40 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
          Active model
        </p>
        <p className="mt-1.5 font-display text-base font-bold text-sidebar-foreground">
          {MODEL_METRICS.algorithm}
        </p>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-sidebar-foreground/55">Validation R²</span>
          <span className="font-semibold text-sidebar-foreground">
            {(MODEL_METRICS.validationR2 * 100).toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  )
}
