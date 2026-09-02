'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { PredictionRequest, PredictionResponse } from '@/lib/api'

export interface HistoryEntry {
  id: string
  createdAt: number
  estimatedValue: number
  overallQual: number
  livingArea: number
  yearBuilt: number
  garageCars: number
}

interface HistoryContextValue {
  entries: HistoryEntry[]
  addEntry: (input: PredictionRequest, result: PredictionResponse) => void
  clear: () => void
}

const HistoryContext = createContext<HistoryContextValue | null>(null)

export function PredictionHistoryProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [entries, setEntries] = useState<HistoryEntry[]>([])

  const addEntry = useCallback(
    (input: PredictionRequest, result: PredictionResponse) => {
      setEntries((prev) => [
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          createdAt: Date.now(),
          estimatedValue: result.estimated_price,
          overallQual: input.overall_qual,
          livingArea: input.living_area,
          yearBuilt: input.year_built,
          garageCars: input.garage_cars,
        },
        ...prev,
      ])
    },
    [],
  )

  const clear = useCallback(() => setEntries([]), [])

  const value = useMemo(
    () => ({ entries, addEntry, clear }),
    [entries, addEntry, clear],
  )

  return (
    <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
  )
}

export function usePredictionHistory() {
  const ctx = useContext(HistoryContext)
  if (!ctx) {
    throw new Error(
      'usePredictionHistory must be used within a PredictionHistoryProvider',
    )
  }
  return ctx
}
