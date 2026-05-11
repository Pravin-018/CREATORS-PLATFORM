import { useState } from 'react'

function ConnectionTest() {
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    setStatus(null)

    try {
      const response = await fetch('/api/health')
      const data = await response.json()

      if (response.ok) {
        setStatus({ type: 'success', message: data.message })
      } else {
        setStatus({ type: 'error', message: data.message || 'Unexpected server response' })
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to connect to server' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="section-card">
      <h2 style={{ marginBottom: '0.75rem' }}>Backend Connection Test</h2>
      <p style={{ marginBottom: '1rem', color: '#475569' }}>
        Click the button to verify that the frontend and backend are connected through the Vite proxy.
      </p>
      <button className="primary" onClick={testConnection} disabled={loading}>
        {loading ? 'Testing...' : 'Test Connection'}
      </button>
      {status ? (
        <p style={{ marginTop: '1rem', color: status.type === 'success' ? '#16a34a' : '#dc2626' }}>
          {status.type === 'success' ? '✅' : '❌'} {status.message}
        </p>
      ) : null}
    </div>
  )
}

export default ConnectionTest
