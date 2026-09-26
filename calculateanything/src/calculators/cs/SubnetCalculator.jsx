import { useState } from 'react'
import InputField from '../../components/InputField'
import Button from '../../components/Button'
import ResultCard from '../../components/ResultCard'
import ErrorBanner from '../../components/ErrorBanner'
import { useHistory } from '../../hooks/useHistory'

function isValidIPv4(ip) {
  const parts = ip.split('.')
  if (parts.length !== 4) return false
  return parts.every((p) => /^\d+$/.test(p) && Number(p) >= 0 && Number(p) <= 255)
}

function ipToInt(ip) {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + Number(octet), 0) >>> 0
}

function intToIp(int) {
  return [24, 16, 8, 0].map((shift) => (int >>> shift) & 255).join('.')
}

export default function SubnetCalculator() {
  const [ip, setIp] = useState('')
  const [cidr, setCidr] = useState('24')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const { addEntry } = useHistory()

  const calculate = () => {
    if (!ip.trim()) { setError('Enter an IPv4 address.'); setResult(null); return }
    if (!isValidIPv4(ip.trim())) { setError('That is not a valid IPv4 address (e.g. 192.168.1.10).'); setResult(null); return }
    const c = Number(cidr)
    if (isNaN(c) || c < 0 || c > 32) { setError('CIDR must be between 0 and 32.'); setResult(null); return }
    setError(null)

    const ipInt = ipToInt(ip.trim())
    const maskInt = c === 0 ? 0 : (0xffffffff << (32 - c)) >>> 0
    const networkInt = (ipInt & maskInt) >>> 0
    const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0
    const hostCount = c >= 31 ? 0 : Math.pow(2, 32 - c) - 2

    setResult({
      network: intToIp(networkInt),
      broadcast: intToIp(broadcastInt),
      firstHost: c >= 31 ? intToIp(networkInt) : intToIp(networkInt + 1),
      lastHost: c >= 31 ? intToIp(broadcastInt) : intToIp(broadcastInt - 1),
      mask: intToIp(maskInt),
      hostCount,
    })
    addEntry('subnet-calculator', 'IPv4 Subnet Calculator', `${ip}/${cidr} \u2192 network ${intToIp(networkInt)}`)
  }

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900">
        <div className="grid gap-4 sm:grid-cols-3">
          <InputField label="IP address" className="sm:col-span-2" value={ip} onChange={(e) => setIp(e.target.value)} placeholder="192.168.1.10" />
          <InputField label="CIDR" type="number" min="0" max="32" value={cidr} onChange={(e) => setCidr(e.target.value)} />
        </div>
        <ErrorBanner message={error} />
        <div className="mt-5"><Button onClick={calculate}>Calculate</Button></div>
      </div>
      {result && (
        <ResultCard
          mainLabel="Network address"
          mainValue={`${result.network}/${cidr}`}
          rows={[
            { label: 'Broadcast', value: result.broadcast },
            { label: 'Subnet mask', value: result.mask },
            { label: 'First usable', value: result.firstHost },
            { label: 'Last usable', value: result.lastHost },
            { label: 'Usable hosts', value: result.hostCount },
          ]}
        />
      )}
    </>
  )
}
