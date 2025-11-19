import { useEffect, useState } from 'react'
import './App.css'
import { kaiaClient } from './kaiaClient'

function App() {
  const [blockNumber, setBlockNumber] = useState<bigint | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBlockNumber() {
      try {
        const bn = await kaiaClient.getBlockNumber()
        setBlockNumber(bn)
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message)
        } else {
          setError('Failed to fetch Kaia block number')
        }
      }
    }

    fetchBlockNumber()
  }, [])

  return (
    <div className="App">
      <h1>Kaia + React + TypeScript + Vite + viem</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <p>
        Current Kaia block number:{' '}
        {blockNumber ? blockNumber.toString() : 'Loading...'}
      </p>
    </div>
  )
}

export default App
