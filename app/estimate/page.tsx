import { Container } from '@/components/shared/container'
import { PageHeader } from '@/components/shared/page-header'
import { EstimateForm } from '@/components/estimate/estimate-form'

export default function EstimatePage() {
  return (
    <Container className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Estimate"
        title="Estimate a property's value"
        description="Enter the structural and quality characteristics of a home to receive an ESTIVA market value estimate with a confidence range."
      />
      <EstimateForm />
    </Container>
  )
}
