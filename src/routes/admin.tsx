import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { CalendarIntegration } from '../components/CalendarIntegration'

export const Route = createFileRoute('/admin')({
  component: AdminPage,
})

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Check if already authenticated (stored in sessionStorage)
  useEffect(() => {
    const authStatus = sessionStorage.getItem('admin_authenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Verify password with server
      const response = await fetch('http://localhost:3001/api/admin/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (data.valid) {
        setIsAuthenticated(true)
        sessionStorage.setItem('admin_authenticated', 'true')
        setError('')
      } else {
        setError('Invalid password')
      }
    } catch (err) {
      // Fallback to client-side check if server is unavailable
      const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'
      
      if (password === adminPassword) {
        setIsAuthenticated(true)
        sessionStorage.setItem('admin_authenticated', 'true')
        setError('')
      } else {
        setError('Invalid password')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPassword('')
    sessionStorage.removeItem('admin_authenticated')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              🔐 Admin Access
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter admin password to access calendar and SMS management
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : 'Sign In'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Default Password:</strong> admin123
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Set VITE_ADMIN_PASSWORD in .env to change this
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                🔧 Admin Dashboard
              </h1>
              <span className="ml-4 text-sm text-gray-500">
                Calendar & SMS Management
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/"
                className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
              >
                ← Back to Site
              </a>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Content */}
      <div className="py-8">
        <CalendarIntegration />
      </div>
    </div>
  )
}