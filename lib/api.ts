/**
 * ESTIVA API service layer.
 *
 * This module isolates all backend communication. The React UI never talks to
 * the model directly — it calls these typed functions, which in turn call the
 * FastAPI backend that serves the trained XGBoost model.
 *
 * No prediction values are computed here. Every estimate returned by these
 * functions originates from the backend `/predict` and `/scenario` endpoints.
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ?? ''

/** Exterior / kitchen quality codes accepted by the model. */
export type QualityCode = 'TA' | 'Gd' | 'Ex' | 'Fa' | 'Po'

/** Shape of the payload sent to `POST /predict`. Mirrors the model features. */
export interface PredictionRequest {
  overall_qual: number
  year_built: number
  living_area: number
  basement_area: number
  first_floor: number
  fireplaces: number
  garage_cars: number
  full_bath: number
  half_bath: number
  exterior_quality: QualityCode
  kitchen_quality: QualityCode
}

/** Shape of the response returned by `POST /predict`. */
export interface PredictionResponse {
  estimated_price: number
  lower_estimate: number
  upper_estimate: number
}

/** A single scenario definition sent to `POST /scenario`. */
export interface ScenarioInput {
  label: string
  overall_qual: number
  living_area: number
  year_built: number
  garage_cars: number
  full_bath: number
  fireplaces: number
}

export interface ScenarioResult extends ScenarioInput {
  estimated_price: number
}

export interface ScenarioResponse {
  scenarios: ScenarioResult[]
}

export class ApiError extends Error {
  status?: number
  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function postJson<TResponse>(
  path: string,
  body: unknown,
  signal?: AbortSignal,
): Promise<TResponse> {
  let res: Response
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal,
    })
  } catch (err) {
    throw new ApiError(
      'Could not reach the ESTIVA prediction service. Please confirm the backend is running and try again.',
    )
  }

  if (!res.ok) {
    let detail = ''
    try {
      const data = await res.json()
      detail = data?.detail ?? data?.message ?? ''
    } catch {
      /* ignore parse failures */
    }
    throw new ApiError(
      detail || `The prediction service returned an error (${res.status}).`,
      res.status,
    )
  }

  return (await res.json()) as TResponse
}

/** Request a single property valuation from the model. */
export function predictPrice(
  payload: PredictionRequest,
  signal?: AbortSignal,
): Promise<PredictionResponse> {
  const backendPayload = {
    overall_qual: payload.overall_qual,
    year_built: payload.year_built,
    living_area: payload.living_area,
    basement_area: payload.basement_area,
    first_floor: payload.first_floor,
    fireplaces: payload.fireplaces,
    garage_cars: payload.garage_cars,
    full_bath: payload.full_bath,
    half_bath: payload.half_bath,
    exterior_quality: payload.exterior_quality,
    kitchen_quality: payload.kitchen_quality,
  }

  return postJson<PredictionResponse>(
    '/predict',
    backendPayload,
    signal,
  )
}

/** Request valuations for a batch of comparison scenarios. */
export function runScenarios(
  scenarios: ScenarioInput[],
  signal?: AbortSignal,
): Promise<ScenarioResponse> {
  return postJson<ScenarioResponse>('/scenario', { scenarios }, signal)
}
