import {
  LayoutDashboard,
  Calculator,
  FlaskConical,
  BarChart3,
  Info,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  description: string
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Overview',
    href: '/',
    icon: LayoutDashboard,
    description: 'How ESTIVA estimates property value',
  },
  {
    label: 'Estimate',
    href: '/estimate',
    icon: Calculator,
    description: 'Value a single property',
  },
  {
    label: 'Scenario Lab',
    href: '/scenario-lab',
    icon: FlaskConical,
    description: 'Compare property scenarios',
  },
  {
    label: 'Insights',
    href: '/insights',
    icon: BarChart3,
    description: 'Model analytics & history',
  },
  {
    label: 'About',
    href: '/about',
    icon: Info,
    description: 'Project & technology',
  },
]
