import { Link } from 'react-router-dom'
import Button from '../components/common/Button'
import ConnectionTest from '../components/common/ConnectionTest'

function Home() {
  return (
    <section style={{ padding: '3rem 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gap: '2rem' }}>
          <div>
            <h1 className="page-heading">Creator Hub — Build your creator journey</h1>
            <p style={{ maxWidth: '640px', marginBottom: '1.5rem', color: '#475569' }}>
              Creator Hub helps creators register, manage profile data, and launch their platform with a clean React + Express foundation.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
              <Link to="/login">Login</Link>
            </div>
          </div>

          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            <div className="section-card">
              <h2 style={{ marginBottom: '0.75rem' }}>Creator Accounts</h2>
              <p>Create secure user accounts and manage creator profiles.</p>
            </div>
            <div className="section-card">
              <h2 style={{ marginBottom: '0.75rem' }}>React Routing</h2>
              <p>Navigate client-side with React Router without reloading the page.</p>
            </div>
            <div className="section-card">
              <h2 style={{ marginBottom: '0.75rem' }}>Backend Ready</h2>
              <p>Ready for full-stack integration with Express, MongoDB, and user data management.</p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <ConnectionTest />
        </div>
      </div>
    </section>
  )
}

export default Home
