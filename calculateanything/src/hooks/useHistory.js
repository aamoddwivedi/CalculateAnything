import { useLocalStorage } from './useLocalStorage'

// Stores lightweight calculation summaries only — never raw sensitive inputs.
export function useHistory() {
  const [history, setHistory] = useLocalStorage('ca_history', [])

  const addEntry = (calculatorId, calculatorName, summary) => {
    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      calculatorId,
      calculatorName,
      summary,
      timestamp: Date.now(),
    }
    setHistory((prev) => [entry, ...prev].slice(0, 50))
  }

  const removeEntry = (id) => setHistory((prev) => prev.filter((e) => e.id !== id))
  const clearHistory = () => setHistory([])

  return { history, addEntry, removeEntry, clearHistory }
}
