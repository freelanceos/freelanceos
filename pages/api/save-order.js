import { createOrder } from '../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  console.log('Save order request received:', req.body)

  try {
    const { name, email, phone } = req.body

    // Basic validation
    if (!name || !email || !phone) {
      console.log('Validation failed: missing required fields')
      return res.status(400).json({ 
        message: 'بيانات غير مكتملة',
        success: false 
      })
    }

    // Create order in Supabase (or mock)
    const order = await createOrder({
      name,
      email,
      phone
    })

    console.log('Order saved successfully:', order.id)

    res.status(200).json({
      success: true,
      order_id: order.id,
      message: 'Order saved successfully'
    })

  } catch (error) {
    console.error('Order saving error:', error)
    res.status(500).json({ 
      message: 'حدث خطأ في حفظ الطلب',
      success: false,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
}