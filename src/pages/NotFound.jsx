import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section style={{ padding: '3rem 0' }}>
      <div className="container section-card" style={{ textAlign: 'center' }}>
        <h1 className="page-heading">404 — Page Not Found</h1>
        <p style={{ marginBottom: '1.25rem', color: '#475569' }}>
          The page you are looking for does not exist. Use the navigation above to return to the app.
        </p>
        <Link to="/">Back to Home</Link>
      </div>
    </section>
  )
}

export default NotFound
