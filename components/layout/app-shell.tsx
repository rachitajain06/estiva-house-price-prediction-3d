'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { SidebarNav } from '@/components/layout/sidebar'
import { BrandLockup } from '@/components/brand/logo'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close the mobile drawer on route change.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[16rem_1fr]">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen lg:block">
        <SidebarNav />
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-sidebar px-4 py-3 text-sidebar-foreground lg:hidden">
        <Link href="/" aria-label="ESTIVA home">
          <BrandLockup subtitle={false} className="[&_span]:text-sidebar-foreground" />
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          {open ? <X /> : <Menu />}
        </Button>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          'fixed inset-0 z-40 lg:hidden',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        )}
      >
        <div
          className={cn(
            'absolute inset-0 bg-foreground/40 transition-opacity',
            open ? 'opacity-100' : 'opacity-0',
          )}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <div
          className={cn(
            'absolute inset-y-0 left-0 w-64 shadow-xl transition-transform duration-200',
            open ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <SidebarNav onNavigate={() => setOpen(false)} />
        </div>
      </div>

      <main className="min-w-0">{children}</main>
    </div>
  )
}
