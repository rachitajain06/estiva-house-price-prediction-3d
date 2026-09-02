import Link from 'next/link'
import { Calculator, FlaskConical, BarChart3, ArrowUpRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const FEATURES = [
  {
    title: 'Estimate',
    href: '/estimate',
    icon: Calculator,
    description:
      'Enter a property’s structural and quality characteristics to receive an estimated market value with a confidence range.',
  },
  {
    title: 'Scenario Lab',
    href: '/scenario-lab',
    icon: FlaskConical,
    description:
      'Compare compact, selected and premium versions of a home side by side to see how features move value.',
  },
  {
    title: 'Insights',
    href: '/insights',
    icon: BarChart3,
    description:
      'Review model performance, feature importance and your recent prediction history in one analytics view.',
  },
]

export function FeatureCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {FEATURES.map((feature) => {
        const Icon = feature.icon
        return (
          <Link
            key={feature.href}
            href={feature.href}
            className="group rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <Card className="h-full transition-all group-hover:ring-primary/40 group-hover:shadow-md group-hover:shadow-primary/5">
              <CardContent className="flex h-full flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" />
                  </span>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold tracking-tight text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
