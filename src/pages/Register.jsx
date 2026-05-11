import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [apiError, setApiError] = useState('')

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
    setApiError('')
    setSuccessMessage('')
  }

  const validateForm = () => {
    const nextErrors = {}
    const name = formData.name.trim()
    const email = formData.email.trim().toLowerCase()

    if (!name) {
      nextErrors.name = 'Name is required'
    } else if (name.length < 2) {
      nextErrors.name = 'Name must be at least 2 characters'
    } else if (name.length > 50) {
      nextErrors.name = 'Name must be at most 50 characters'
    }

    if (!email) {
      nextErrors.email = 'Email is required'
    } else if (!emailRegex.test(email)) {
      nextErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      nextErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters'
    }

    if (!formData.confirmPassword) {
      nextErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.confirmPassword !== formData.password) {
      nextErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setApiError('')
    setSuccessMessage('')

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setApiError(data.message || 'Registration failed. Please try again.')
      } else {
        setSuccessMessage('Your account was created successfully.')
        setFormData({ name: '', email: '', password: '', confirmPassword: '' })
        setErrors({})
        setTimeout(() => navigate('/login'), 2000)
      }
    } catch (error) {
      setApiError('Unable to connect to the server. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section style={{ padding: '3rem 0' }}>
      <div className="container section-card" style={{ maxWidth: '520px' }}>
        <h1 className="page-heading">Create Account</h1>
        <p style={{ marginBottom: '1.5rem', color: '#475569' }}>
          Sign up for Creator Hub to manage your creator profile, save progress, and access your dashboard.
        </p>

        {apiError ? (
          <div style={{ marginBottom: '1rem', color: '#dc2626' }}>{apiError}</div>
        ) : null}

        {successMessage ? (
          <div style={{ marginBottom: '1rem', color: '#16a34a' }}>{successMessage}</div>
        ) : null}

        <form onSubmit={handleSubmit} noValidate>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }} htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            style={{
              width: '100%',
              padding: '0.95rem 1rem',
              borderRadius: '0.75rem',
              border: errors.name ? '1px solid #dc2626' : '1px solid #d1d5db',
              marginBottom: '0.75rem',
            }}
          />
          {errors.name ? <p style={{ color: '#dc2626', marginBottom: '0.75rem' }}>{errors.name}</p> : null}

          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            style={{
              width: '100%',
              padding: '0.95rem 1rem',
              borderRadius: '0.75rem',
              border: errors.email ? '1px solid #dc2626' : '1px solid #d1d5db',
              marginBottom: '0.75rem',
            }}
          />
          {errors.email ? <p style={{ color: '#dc2626', marginBottom: '0.75rem' }}>{errors.email}</p> : null}

          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter a password"
            style={{
              width: '100%',
              padding: '0.95rem 1rem',
              borderRadius: '0.75rem',
              border: errors.password ? '1px solid #dc2626' : '1px solid #d1d5db',
              marginBottom: '0.75rem',
            }}
          />
          {errors.password ? <p style={{ color: '#dc2626', marginBottom: '0.75rem' }}>{errors.password}</p> : null}

          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }} htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Repeat your password"
            style={{
              width: '100%',
              padding: '0.95rem 1rem',
              borderRadius: '0.75rem',
              border: errors.confirmPassword ? '1px solid #dc2626' : '1px solid #d1d5db',
              marginBottom: '1rem',
            }}
          />
          {errors.confirmPassword ? <p style={{ color: '#dc2626', marginBottom: '0.75rem' }}>{errors.confirmPassword}</p> : null}

          <button className="primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p style={{ marginTop: '1.25rem', color: '#475569' }}>
          Already registered? <Link to="/login">Login here</Link>.
        </p>
      </div>
    </section>
  )
}

export default Register
