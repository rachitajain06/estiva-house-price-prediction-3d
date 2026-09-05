import { Container } from '@/components/shared/container'
import { TECHNOLOGY_STACK } from '@/lib/model-data'

export default function AboutPage() {
  return (
    <Container>
      <div className="flex flex-col gap-10">

        {/* Page Header */}
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
            ABOUT
          </p>

          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            About ESTIVA
          </h1>

          <p className="mt-2 text-base leading-7 text-muted-foreground">
            Learn how ESTIVA combines machine learning and modern web
            technology to turn property characteristics into data-driven
            house price estimates.
          </p>
        </div>

        {/* What is ESTIVA */}
        <section className="rounded-2xl border bg-card p-7 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-sm font-semibold">
              01
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-foreground">
                What is ESTIVA?
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
                ESTIVA is an intelligent house price prediction application
                designed to estimate the potential market value of a property.
                It uses a trained XGBoost regression model to analyze important
                property characteristics and generate a data-driven estimate.
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section>
          <div className="mb-5">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              THE PROCESS
            </p>

            <h2 className="mt-2 font-display text-2xl font-semibold text-foreground">
              How ESTIVA works
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              From property details to an ML-powered estimate.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">

            <div className="rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              <span className="text-xs font-semibold text-muted-foreground">
                01
              </span>

              <h3 className="mt-4 font-display text-lg font-semibold">
                Enter property details
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Add important characteristics such as overall quality, living
                area, construction year, garage capacity and bathrooms.
              </p>
            </div>

            <div className="rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              <span className="text-xs font-semibold text-muted-foreground">
                02
              </span>

              <h3 className="mt-4 font-display text-lg font-semibold">
                Model analyzes the home
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                The FastAPI backend processes the inputs and sends them to the
                trained XGBoost regression model.
              </p>
            </div>

            <div className="rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              <span className="text-xs font-semibold text-muted-foreground">
                03
              </span>

              <h3 className="mt-4 font-display text-lg font-semibold">
                Explore the estimate
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Get an estimated market value, prediction range and scenario
                comparisons to understand how property changes can affect
                value.
              </p>
            </div>

          </div>
        </section>

        {/* Technology */}
        <section>
          <div className="mb-5">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              BUILT WITH
            </p>

            <h2 className="mt-2 font-display text-2xl font-semibold text-foreground">
              Technology Stack
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Technologies used across the prediction pipeline and web
              application.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TECHNOLOGY_STACK.map((technology) => (
              <div
                key={technology.name}
                className="group rounded-2xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <p className="font-display font-semibold text-foreground">
                    {technology.name}
                  </p>

                  <span className="text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                    ESTIVA
                  </span>
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  {technology.role}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture */}
        <section className="rounded-2xl border bg-muted/40 p-7">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            ARCHITECTURE
          </p>

          <h2 className="mt-2 font-display text-2xl font-semibold">
            From interface to prediction
          </h2>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
            <div className="rounded-xl border bg-card px-5 py-4 shadow-sm">
              <p className="font-medium">ESTIVA UI</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Next.js + React
              </p>
            </div>

            <span className="text-muted-foreground">→</span>

            <div className="rounded-xl border bg-card px-5 py-4 shadow-sm">
              <p className="font-medium">Prediction API</p>
              <p className="mt-1 text-xs text-muted-foreground">
                FastAPI
              </p>
            </div>

            <span className="text-muted-foreground">→</span>

            <div className="rounded-xl border bg-card px-5 py-4 shadow-sm">
              <p className="font-medium">ML Model</p>
              <p className="mt-1 text-xs text-muted-foreground">
                XGBoost
              </p>
            </div>
          </div>
        </section>

        {/* Important Note */}
        <section className="rounded-2xl border bg-card p-7 shadow-sm">
          <h2 className="font-display text-xl font-semibold">
            Important Note
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
            ESTIVA provides a machine-learning-based estimate for informational
            purposes. The prediction and displayed range are statistical
            estimates and should not be treated as a formal property appraisal.
          </p>
        </section>

      </div>
    </Container>
  )
}