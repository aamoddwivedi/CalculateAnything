import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="num text-6xl font-bold text-amber-400">404</p>
      <h1 className="mt-3 text-xl font-semibold">That calculator doesn't exist.</h1>
      <Link to="/" className="focus-ring mt-6 inline-block rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-semibold text-ink-950 hover:bg-amber-500">
        Back to home
      </Link>
    </div>
  )
}
