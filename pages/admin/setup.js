import { useState } from 'react'
import { useRouter } from 'next/router'

export default function AdminSetup() {
    const [email, setEmail] = useState('admin@example.com')
    const [password, setPassword] = useState('admin123')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [success, setSuccess] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        try {
            const response = await fetch('/api/admin/setup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (data.success) {
                setSuccess(true)
                setMessage(`Admin account created successfully! You can now login with email: ${data.credentials.email}`)
            } else {
                setMessage(data.message || 'Failed to create admin account')
            }
        } catch (error) {
            setMessage('Network error occurred')
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
                    <div className="text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Setup Complete!</h2>
                        <p className="text-gray-600 mb-6">{message}</p>
                        <button
                            onClick={() => router.push('/admin/login')}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                        >
                            Go to Admin Login
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Admin Setup</h2>
                    <p className="text-gray-600 mt-2">Create the first admin account</p>
                </div>

                {message && (
                    <div className={`mb-4 p-3 rounded-md ${success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                    >
                        {loading ? 'Creating...' : 'Create Admin Account'}
                    </button>
                </form>

                <div className="mt-6 p-4 bg-yellow-50 rounded-md">
                    <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> This setup page is only available in development mode.
                        If you're getting RLS policy errors, you may need to temporarily disable RLS on the admin_accounts table
                        or configure the service role key properly.
                    </p>
                </div>
            </div>
        </div>
    )
}
