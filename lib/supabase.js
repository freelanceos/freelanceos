import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Check if Supabase is configured
export const isSupabaseConfigured = supabaseUrl && supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co' && 
  supabaseAnonKey !== 'your_supabase_anon_key'

console.log('Supabase configuration:', {
  isConfigured: isSupabaseConfigured,
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseAnonKey,
  urlPrefix: supabaseUrl ? supabaseUrl.substring(0, 30) + '...' : 'none'
})

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export const supabaseAdmin = (isSupabaseConfigured && supabaseServiceKey && supabaseServiceKey !== 'your_supabase_service_role_key')
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

export async function createOrder(orderData) {
  if (!isSupabaseConfigured || !supabase) {
    console.log('Supabase not configured, using mock order')
    // Return mock data when Supabase not configured
    const mockOrder = {
      id: 'mock-order-' + Date.now(),
      name: orderData.name,
      email: orderData.email,
      phone: orderData.phone,
      payment_method: orderData.payment_method,
      amount_cents: orderData.amount_cents,
      currency: 'EGP',
      payment_status: 'pending',
      created_at: new Date().toISOString()
    }
    console.log('Created mock order:', mockOrder)
    return mockOrder
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([{
        name: orderData.name,
        email: orderData.email,
        phone: orderData.phone,
        payment_method: orderData.payment_method,
        amount_cents: orderData.amount_cents,
        currency: 'EGP',
        payment_status: 'pending'
      }])
      .select()
      .single()

    if (error) {
      console.error('Error creating order:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Supabase connection failed, using mock data:', error)
    // Fallback to mock data if Supabase fails
    return {
      id: 'mock-order-' + Date.now(),
      name: orderData.name,
      email: orderData.email,
      phone: orderData.phone,
      payment_method: orderData.payment_method,
      amount_cents: orderData.amount_cents,
      currency: 'EGP',
      payment_status: 'pending',
      created_at: new Date().toISOString()
    }
  }
}

export async function updateOrderPayment(orderId, paymentData) {
  if (!supabaseAdmin) {
    console.log('Supabase not configured - mock update for order:', orderId)
    return { id: orderId, ...paymentData }
  }

  const { data, error } = await supabaseAdmin
    .from('orders')
    .update({
      transaction_id: paymentData.transaction_id,
      paymob_transaction_id: paymentData.paymob_transaction_id,
      payment_status: paymentData.success ? 'completed' : 'failed',
      updated_at: new Date().toISOString()
    })
    .eq('id', orderId)
    .select()
    .single()

  if (error) {
    console.error('Error updating order:', error)
    throw error
  }

  return data
}