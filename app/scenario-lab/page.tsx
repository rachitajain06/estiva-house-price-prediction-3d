import { Container } from '@/components/shared/container'
import { PageHeader } from '@/components/shared/page-header'
import { ScenarioLab } from '@/components/scenario/scenario-lab'

export default function ScenarioLabPage() {
  return (
    <Container className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Scenario Lab"
        title="Compare property scenarios"
        description="See how structural and quality changes move a property's estimated value by comparing compact, selected and premium variants."
      />
      <ScenarioLab />
    </Container>
  )
}
