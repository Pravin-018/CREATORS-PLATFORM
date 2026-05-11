import { Link } from 'react-router-dom'

function Register() {
  return (
    <section style={{ padding: '3rem 0' }}>
      <div className="container section-card">
        <h1 className="page-heading">Create Account</h1>
        <p style={{ marginBottom: '1.25rem', color: '#475569' }}>
          This is the registration placeholder for Creator Hub. In the next lesson, this page will accept creator details and submit them to the backend.
        </p>
        <p>
          Already registered? <Link to="/login">Login here</Link>.
        </p>
      </div>
    </section>
  )
}

export default Register
