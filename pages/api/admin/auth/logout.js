import { serialize } from 'cookie'

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    try {
        // Clear the admin token cookie
        res.setHeader('Set-Cookie', serialize('admin_token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0, // Expire immediately
            path: '/'
        }))

        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        })

    } catch (error) {
        console.error('Admin logout error:', error)
        res.status(500).json({
            message: 'Logout failed',
            success: false
        })
    }
}
