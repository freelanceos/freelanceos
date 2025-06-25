
import { parse } from 'cookie'

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    try {
        // Get admin token from cookies
        const cookies = parse(req.headers.cookie || '')
        const adminToken = cookies.admin_token

        if (!adminToken) {
            return res.status(401).json({
                success: false,
                message: 'غير مصرح للدخول'
            })
        }

        // Parse admin data from cookie
        let adminData
        try {
            adminData = JSON.parse(adminToken)
        } catch (e) {
            return res.status(401).json({
                success: false,
                message: 'بيانات الجلسة غير صالحة'
            })
        }

        // Return admin profile
        return res.status(200).json({
            success: true,
            admin: {
                id: adminData.id,
                email: adminData.email,
                role: adminData.role
            }
        })

    } catch (error) {
        console.error('Profile check error:', error)
        res.status(500).json({
            success: false,
            message: 'حدث خطأ في التحقق من الهوية'
        })
    }
}
