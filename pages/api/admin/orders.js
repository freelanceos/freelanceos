
import { supabase } from '../../../lib/supabase'
import { parse } from 'cookie'

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    try {
        // Check admin authentication
        const cookies = parse(req.headers.cookie || '')
        const adminToken = cookies.admin_token

        if (!adminToken) {
            return res.status(401).json({
                success: false,
                message: 'غير مصرح للدخول'
            })
        }

        // Verify admin token
        let adminData
        try {
            adminData = JSON.parse(adminToken)
        } catch (e) {
            return res.status(401).json({
                success: false,
                message: 'بيانات الجلسة غير صالحة'
            })
        }

        if (!supabase) {
            return res.status(500).json({
                success: false,
                message: 'قاعدة البيانات غير متاحة'
            })
        }

        // Fetch orders from ordersbook table
        const { data: orders, error } = await supabase
            .from('ordersbook')
            .select('*')
            .order('timestamp', { ascending: false })

        if (error) {
            console.error('Error fetching orders:', error)
            return res.status(500).json({
                success: false,
                message: 'حدث خطأ في تحميل الطلبات'
            })
        }

        return res.status(200).json({
            success: true,
            orders: orders || []
        })

    } catch (error) {
        console.error('Orders API error:', error)
        res.status(500).json({
            success: false,
            message: 'حدث خطأ في الخادم'
        })
    }
}
