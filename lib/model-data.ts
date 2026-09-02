import type { QualityCode } from '@/lib/api'

/** Headline validation metrics for the deployed model. */
export const MODEL_METRICS = {
  algorithm: 'XGBoost',
  r2: 0.912,
  rmse: 25978,
  mae: 15671,
  features: 260,
  trainingHomes: 1460,
  validationR2: 0.912,
} as const

/** Cross-validation comparison of candidate models. */
export interface ModelComparisonRow {
  model: string
  rmse: number
  mae: number
  r2: number
  isFinal?: boolean
}

export const MODEL_COMPARISON: ModelComparisonRow[] = [
  { model: 'Gradient Boosting', rmse: 26816.28, mae: 15609.55, r2: 0.9062 },
  { model: 'Random Forest', rmse: 34997.9, mae: 18671.84, r2: 0.8403 },
  { model: 'XGBoost', rmse: 25580.63, mae: 15395.81, r2: 0.9147, isFinal: true },
  { model: 'Tuned XGBoost', rmse: 26349.54, mae: 15872.01, r2: 0.9095 },
]

/** Top drivers of the model's predictions, ordered by importance. */
export interface FeatureImportance {
  rank: number
  feature: string
  weight: number
}

export const FEATURE_IMPORTANCE: FeatureImportance[] = [
  { rank: 1, feature: 'Overall Quality', weight: 100 },
  { rank: 2, feature: 'Exterior Quality', weight: 74 },
  { rank: 3, feature: 'Garage Capacity', weight: 61 },
  { rank: 4, feature: 'Exterior Quality — Fair', weight: 53 },
  { rank: 5, feature: 'Living Area', weight: 48 },
  { rank: 6, feature: 'Fireplaces', weight: 39 },
  { rank: 7, feature: 'Kitchen Quality', weight: 34 },
  { rank: 8, feature: 'Central Air', weight: 27 },
  { rank: 9, feature: 'Residential Zoning', weight: 22 },
  { rank: 10, feature: 'Garage Condition', weight: 18 },
]

export const QUALITY_OPTIONS: { value: QualityCode; label: string }[] = [
  { value: 'TA', label: 'TA — Typical / Average' },
  { value: 'Gd', label: 'Gd — Good' },
  { value: 'Ex', label: 'Ex — Excellent' },
  { value: 'Fa', label: 'Fa — Fair' },
  { value: 'Po', label: 'Po — Poor' },
]

export const TECHNOLOGY_STACK: { name: string; role: string }[] = [
  { name: 'Python', role: 'Core language' },
  { name: 'Pandas', role: 'Data wrangling' },
  { name: 'NumPy', role: 'Numerical computing' },
  { name: 'Scikit-learn', role: 'Preprocessing & baselines' },
  { name: 'XGBoost', role: 'Final regression model' },
  { name: 'Joblib', role: 'Model serialization' },
  { name: 'FastAPI', role: 'Prediction API' },
  { name: 'Next.js', role: 'Application framework' },
  { name: 'React', role: 'UI library' },
  { name: 'Tailwind CSS', role: 'Styling system' },
]

/** Utility: format a number as whole-dollar USD. */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatNumber(value: number, digits = 0): string {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value)
}
