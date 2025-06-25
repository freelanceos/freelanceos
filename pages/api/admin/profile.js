import { verifyAdminToken } from '../../../lib/adminAuth'

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    try {
        // Get token from cookies or Authorization header
        const token = req.cookies.admin_session || // Changed from admin_token
            (req.headers.authorization && req.headers.authorization.split(' ')[1])

        if (!token) {
            return res.status(401).json({
                message: 'No token provided',
                success: false
            })
        }

        const admin = await verifyAdminToken(token)

        res.status(200).json({
            success: true,
            admin: {
                id: admin.id,
                email: admin.email,
                role: admin.role,
                created_at: admin.created_at
            }
        })

    } catch (error) {
        console.error('Admin profile error:', error)
        res.status(401).json({
            message: 'Invalid or expired token',
            success: false
        })
    }
}
