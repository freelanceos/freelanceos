
import { supabase } from '../../../../lib/supabase'
import { parse } from 'cookie'

export default async function handler(req, res) {
    if (req.method !== 'POST') {
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

        const { orderId, status } = req.body

        if (!orderId || !status) {
            return res.status(400).json({
                success: false,
                message: 'بيانات غير مكتملة'
            })
        }

        if (!supabase) {
            return res.status(500).json({
                success: false,
                message: 'قاعدة البيانات غير متاحة'
            })
        }

        // Update order status in ordersbook table
        const { data, error } = await supabase
            .from('ordersbook')
            .update({ payment: status })
            .eq('id', orderId)
            .select()
            .single()

        if (error) {
            console.error('Error updating order:', error)
            return res.status(500).json({
                success: false,
                message: 'حدث خطأ في تحديث الطلب'
            })
        }

        return res.status(200).json({
            success: true,
            order: data,
            message: 'تم تحديث حالة الطلب بنجاح'
        })

    } catch (error) {
        console.error('Update order API error:', error)
        res.status(500).json({
            success: false,
            message: 'حدث خطأ في الخادم'
        })
    }
}
