import { Suspense } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { getCalculator } from '../data/calculatorRegistry'
import CalculatorLayout from '../layouts/CalculatorLayout'

export default function CalculatorPage() {
  const { calculatorId } = useParams()
  const calculator = getCalculator(calculatorId)

  if (!calculator) return <Navigate to="/" replace />
  const Component = calculator.component

  return (
    <CalculatorLayout calculator={calculator}>
      <Suspense fallback={<div className="py-10 text-center text-slate-400">Loading calculator…</div>}>
        <Component />
      </Suspense>
    </CalculatorLayout>
  )
}
