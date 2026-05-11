import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="container" style={{ padding: '1rem 0' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link to="/" style={{ fontSize: '1.25rem', fontWeight: 700 }}>
            Creator Hub
          </Link>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
