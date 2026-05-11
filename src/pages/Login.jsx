import { Link } from 'react-router-dom'

function Login() {
  return (
    <section style={{ padding: '3rem 0' }}>
      <div className="container section-card">
        <h1 className="page-heading">Login</h1>
        <p style={{ marginBottom: '1.25rem', color: '#475569' }}>
          This is the login page placeholder for Creator Hub. The authentication form will be added in the next lessons.
        </p>
        <p>
          Don’t have an account? <Link to="/register">Register here</Link>.
        </p>
      </div>
    </section>
  )
}

export default Login
